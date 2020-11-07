<?php
namespace App\Controller;

use App\Repository\RelResourceResourceRepository;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\DTO\Resource\ProjectDTO;
use App\DTO\User\ProjectUserDTO;
use App\Entity\RelProjectUser;
use App\Entity\Resource;
use App\Entity\User\User;
use JMS\Serializer\SerializationContext;
use App\Entity\Project;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Repository\ProjectRepository;
use App\Repository\RelProjectUserRepository;
use App\Repository\UserRepository;
use App\Response\Json\ErrorResponse;
use App\Service\VitoopSecurity;

/**
 * @Route("api/project/{projectID}")
 * @ParamConverter("project", class="App\Entity\Project", options={"id" = "projectID"})
 */
class ProjectApiController extends ApiController
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var RelProjectUserRepository
     */
    private $relProjectUserRepository;

    /**
     * @var ProjectRepository
     */
    private $projectRepository;

    /**
     * ProjectApiController constructor.
     * @param ValidatorInterface $validator
     * @param UserRepository $userRepository
     * @param RelProjectUserRepository $relProjectUserRepository
     * @param ProjectRepository $projectRepository
     */
    public function __construct(
        ValidatorInterface $validator,
        UserRepository $userRepository,
        RelProjectUserRepository $relProjectUserRepository,
        ProjectRepository $projectRepository
    ) {
        $this->validator = $validator;
        $this->userRepository = $userRepository;
        $this->relProjectUserRepository = $relProjectUserRepository;
        $this->projectRepository = $projectRepository;
    }

    /**
     * @Route("", name="get_project_api", methods={"GET"})
     *
     * @return array
     */
    public function getProject(Project $project)
    {
        $this->checkAccess($project);

        return $this->getApiResponse([
            'project' => $project->getDTO(),
            'isOwner' => $project->getProjectData()->availableForDelete($this->getUser())
        ]);
    }

    /**
     * @Route("", name="delete_project_api", methods={"DELETE"})
     *
     * @return array
     */
    public function deleteProjectAction(Project $project, RelResourceResourceRepository $relResourceResourceRepository)
    {
        $this->checkAccess($project);
        $rels = $relResourceResourceRepository->findBy(array('resource1' => $project));
        foreach ($rels as $rel) {
            $relResourceResourceRepository->remove($rel);
        }
        $rels = $relResourceResourceRepository->findBy(array('resource2' => $project));
        foreach ($rels as $rel) {
            $relResourceResourceRepository->remove($rel);
        }
        $this->projectRepository->remove($project);

        return $this->getApiResponse(['success' => true]);
    }

    /**
     * @Route("", name="save_project_api", methods={"POST"})
     *
     * @return array
     */
    public function saveProject(Project $project, Request $request)
    {
        $this->checkAccess($project);

        /**
         * @var ProjectDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, ProjectDTO::class);
        $project->updateFromDTO($dto);
        $this->projectRepository->save($project);

        return new JsonResponse(['status' => 'success', 'message' => 'Project saved!']);
    }

    /**
     * @Route("/user", name="add_user_to_project", methods={"POST"})
     *
     * @return array
     */
    public function addUserToProject(VitoopSecurity $vitoopSecurity, Project $project, Request $request)
    {
        $currentUser = $vitoopSecurity->getUser();
        $this->checkAccess($project);

        $userDto = $this->getDTOFromRequest($request, ProjectUserDTO::class);
        $errors = $this->validator->validate($userDto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $user = $this->userRepository->find($userDto->id);
        if (null === $user) {
            return $this->getApiResponse(['status' => 'error', 'message' => 'User is not found'], 400);
        }
        if ($user->getUsername() == $currentUser->getUsername()) {
            return $this->getApiResponse(['status' => 'error', 'message' => 'User is equal to current'],400);
        }
        if ($project->getProjectData()->inRelUsers($user)) {
            return $this->getApiResponse(['status' => 'error', 'message' => 'User is already added'], 400);
        }

        $projectUser = RelProjectUser::create($project->getProjectData(), $user, true);
        $this->relProjectUserRepository->save($projectUser);

        return $this->getApiResponse(['status' => 'success', 'rel' => $projectUser->getDTO(), 'message' => 'User added!']);
    }

    /**
     * @Route("/user/{userID}", name="remove_user_from_project", methods={"DELETE"})
     * @ParamConverter("user", class="App\Entity\User\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function removeUserFromProject(
        VitoopSecurity $vitoopSecurity,
        Project $project,
        User $user,
        SerializerInterface $serializer,
        RelProjectUserRepository $relProjectUserRepository
    ) {
        $currentUser = $vitoopSecurity->getUser();
        $this->checkAccess($project);

        $response = null;

        if (is_null($user)) {
            $response = array('status' => 'error', 'message' => 'User is not found');
        } elseif ($user->getUsername() == $currentUser->getUsername()) {
            $response = array('status' => 'error', 'message' => 'User is equal to current');
        } else {
                $rel = $relProjectUserRepository->getRel($user, $project);
                if (is_null($rel)) {
                    $response = array('status' => 'error', 'message' => 'User is already deleted');
                } else {
                    $response = array('status' => 'success', 'rel' => clone $rel, 'message' => 'User removed!');
                    $relProjectUserRepository->remove($rel);
                }
        }
        $serializerContext = SerializationContext::create()->setGroups(array('get_project'));
        $response = $serializer->serialize($response, 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/resource/{resourceID}", name="remove_resource_from_project", methods={"DELETE"})
     * @ParamConverter("resource", class="App\Entity\Resource", options={"id" = "resourceID"})
     *
     * @return array
     */
    public function removeResourceFromProject(Project $project, Resource $resource, RelResourceResourceRepository $relResourceResourceRepository)
    {
        $this->checkAccess($project);

        $rel = $relResourceResourceRepository->findOneBy(array(
            'resource1' => $project,
            'resource2' => $resource
        ));

        if (!is_null($rel)) {
            $relResourceResourceRepository->remove($rel);
            $response = array('status' => 'success', 'message' => 'Resource unlinked!');
        } else {
            $response = array('status' => 'error', 'message' => 'Resource is not found');
        }

        return $this->getApiResponse($response);
    }

    private function checkAccess(Project $project)
    {
        if (!$project->getProjectData()->availableForWriting($this->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }
}
