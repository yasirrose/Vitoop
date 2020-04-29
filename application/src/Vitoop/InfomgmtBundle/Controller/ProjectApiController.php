<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\DTO\Resource\ProjectDTO;
use Vitoop\InfomgmtBundle\DTO\User\ProjectUserDTO;
use Vitoop\InfomgmtBundle\Entity\RelProjectUser;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Vitoop\InfomgmtBundle\Entity\Project;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Vitoop\InfomgmtBundle\Repository\ProjectRepository;
use Vitoop\InfomgmtBundle\Repository\RelProjectUserRepository;
use Vitoop\InfomgmtBundle\Repository\UserRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

/**
 * @Route("api/project/{projectID}")
 * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
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
    public function deleteProjectAction(Project $project)
    {
        $this->checkAccess($project);
 
        $em = $this->getDoctrine()->getManager();
        $rels = $em->getRepository('VitoopInfomgmtBundle:RelResourceResource')->findBy(array('resource1' => $project));
        foreach ($rels as $rel) {
            $em->remove($rel);
        }
        $rels = $em->getRepository('VitoopInfomgmtBundle:RelResourceResource')->findBy(array('resource2' => $project));
        foreach ($rels as $rel) {
            $em->remove($rel);
        }
        $em->remove($project);
        $em->flush();

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
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function removeUserFromProject(VitoopSecurity $vitoopSecurity, Project $project, User $user)
    {
        $currentUser = $vitoopSecurity->getUser();
        $this->checkAccess($project);

        $response = null;
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        if (is_null($user)) {
            $response = array('status' => 'error', 'message' => 'User is not found');
        } elseif ($user->getUsername() == $currentUser->getUsername()) {
            $response = array('status' => 'error', 'message' => 'User is equal to current');
        } else {
                $rel = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:RelProjectUser')->getRel($user, $project);
                if (is_null($rel)) {
                    $response = array('status' => 'error', 'message' => 'User is already deleted');
                } else {
                    $response = array('status' => 'success', 'rel' => clone $rel, 'message' => 'User removed!');
                    $em->remove($rel);
                    $em->flush();
                }
        }
        $serializerContext = SerializationContext::create()
            ->setGroups(array('get_project'));
        $response = $serializer->serialize($response, 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/resource/{resourceID}", name="remove_resource_from_project", methods={"DELETE"})
     * @ParamConverter("resource", class="Vitoop\InfomgmtBundle\Entity\Resource", options={"id" = "resourceID"})
     *
     * @return array
     */
    public function removeResourceFromProject(Project $project, Resource $resource)
    {
        $this->checkAccess($project);
        
        $em = $this->getDoctrine()->getManager();
        $rel = $em->getRepository('VitoopInfomgmtBundle:RelResourceResource')->findOneBy(array(
            'resource1' => $project,
            'resource2' => $resource
        ));

        if (!is_null($rel)) {
            $em->remove($rel);
            $em->flush();
            $response = array('status' => 'success', 'message' => 'Resource unlinked!');
        } else {
            $response = array('status' => 'error', 'message' => 'Resource is not found');
        }

        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize($response, 'json');

        return new Response($response);
    }

    private function checkAccess(Project $project)
    {
        if (!$project->getProjectData()->availableForWriting($this->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }
}
