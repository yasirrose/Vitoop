<?php

namespace App\Controller\V1;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Controller\ApiController;
use App\DTO\Resource\DividerDTO;
use App\DTO\Resource\ProjectAssignment;
use App\DTO\Resource\SearchResource;
use App\Entity\Project;
use App\Entity\ProjectRelsDivider;
use App\Repository\ProjectRelsDividerRepository;
use App\Repository\RelResourceResourceRepository;
use App\Repository\ResourceRepository;
use App\Response\Json\ErrorResponse;
use App\Service\ProjectDividerChanger;
use App\Service\RelResource\RelResourceLinker;
use App\Service\ResourceManager;

/**
 * @Route("projects")
 */
class ProjectController extends ApiController
{
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var RelResourceLinker
     */
    private $relResourceLinker;

    /**
     * @var RelResourceResourceRepository
     */
    private $relResourceRepository;

    /**
     * ProjectController constructor.
     * @param ResourceRepository $resourceRepository
     * @param ValidatorInterface $validator
     * @param RelResourceLinker $relResourceLinker
     * @param RelResourceResourceRepository $relResourceRepository
     */
    public function __construct(
        ResourceRepository $resourceRepository,
        ValidatorInterface $validator,
        RelResourceLinker $relResourceLinker,
        RelResourceResourceRepository $relResourceRepository
    ) {
        $this->resourceRepository = $resourceRepository;
        $this->validator = $validator;
        $this->relResourceLinker = $relResourceLinker;
        $this->relResourceRepository = $relResourceRepository;
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getProjectById(Project $project)
    {
        if (!$project->getProjectData()->availableForReading($this->getUser())) {
            return $this->getApiResponse(new ErrorResponse(['Not available project'], 403));
        }

        $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($project);

        return $this->getApiResponse([
            'project' => $project->getDTO(),
            'resourceInfo' => $resourceInfo,
            'isOwner' => $project->getProjectData()->availableForDelete($this->getUser())
        ]);
    }

    /**
     * @Route("/{id}/resources", methods={"GET"})
     */
    public function getAllRelatedResources(Project $project, Request $request)
    {
        $search = SearchResource::createFromRequest($request, $this->getUser(), $project->getId());
        $resources = $this->resourceRepository->getAllTypeResourcesWithDividers($search);
        $total = $this->resourceRepository->getResourcesTotal($search);

        return $this->getApiResponse([
            'recordsTotal' => $total,
            'recordsFiltered' => $total,
            'data' => $resources,
            'resourceInfo' => $this->resourceRepository->getCountByTags($search)
        ]);
    }

    /**
     * @Route("/{id}/{resType}", methods={"GET"}, requirements={"id": "\d+", "resType": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function getRelatedResources(Project $project, $resType, ResourceManager $resourceManager, Request $request)
    {
        $search = SearchResource::createFromRequest($request, $this->getUser(), $project->getId());

        $resourceRepository = $resourceManager->getRepository($resType);
        $resources = $this->resourceRepository->getResourcesWithDividers($search , $resType);
        $total = $resourceRepository->getResourcesTotal($search);

        if ('prj' === $resType) {
            foreach ($resources as &$resource) {
                if (null === $resource['id']) {
                    continue;
                }
                $project = $resourceRepository->find($resource['id']);
                $resource['canRead'] = $project->getProjectData()->availableForReading($this->getUser());
            }
        }

        if ('conversation' === $resType) {
            foreach ($resources as &$resource) {
                if (null === $resource['id']) {
                    continue;
                }
                $conversation = $resourceRepository->find($resource['id']);
                $resource['canRead'] = $conversation->getConversationData()->availableForReading($this->getUser());
            }
        }
        return $this->getApiResponse([
            'recordsTotal' => $total,
            'recordsFiltered' => $total,
            'data' => $resources,
            'resourceInfo' => $this->resourceRepository->getCountByTags($search)
        ]);
    }

    /**
     * @Route("/{id}/assignments", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getAssignments(Project $project)
    {
        return $this->getApiResponse(
            $this->relResourceRepository->getAllAssignmentsDTO($project->getId(), $this->getUser()->getId())
        );
    }

    /**
     * @Route("/{id}/assignments", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function createAssigment(Project $project, Request $request)
    {
        /**
         * @var ProjectAssignment $dto
         */
        $dto = $this->getDTOFromRequest($request, ProjectAssignment::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $resources = $this->resourceRepository->findBy(['id' => $dto->resourceIds]);
        $assignments = [];
        foreach ($resources as $resource) {
            try {
                $relResource = $this->relResourceLinker->linkProjectToResource($project, $resource);
                $this->relResourceRepository->save();
                $assignments[] = $relResource->getDTO();
            } catch (\Exception $exception) {
                //skip if exists without error
            }
        }

        return $this->getApiResponse($assignments, 201);
    }

    /**
     * @Route("/{id}/dividers", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getDividers(Project $project, ProjectRelsDividerRepository $dividerRepository)
    {
        if (!$project->getProjectData()->availableForReading($this->getUser())) {
            throw new AccessDeniedHttpException();
        }
        $dividers = $dividerRepository->findProjectDividerDTO($project->getProjectData()->getId());

        $divResult = [];
        /**
         * @var DividerDTO $divider
         */
        foreach ($dividers as $divider) {
            $divResult[(string)$divider->coefficient] = $divider;
        }

        return $this->getApiResponse($divResult);
    }

    /**
     * @Route("/{id}/dividers", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addDivider(Project $project, ProjectRelsDividerRepository $dividerRepository, Request $request)
    {
        if (!$project->getProjectData()->availableForWriting($this->getUser())) {
            throw new AccessDeniedHttpException();
        }

        /**
         * @var DividerDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, DividerDTO::class);
        $dto->projectDataId = $project->getProjectData()->getId();
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $divider = ProjectRelsDivider::create($project->getProjectData(), $dto);
        $dividerRepository->save($divider);

        return $this->getApiResponse($divider, 201);
    }

    /**
     * @ParamConverter("divider", options={"id" = "dividerId"})
     * @Route("/{id}/dividers/{dividerId}", methods={"PUT"}, requirements={"id": "\d+", "dividerId": "\d+"})
     */
    public function editDivider(
        Project $project,
        ProjectRelsDivider $divider,
        ProjectRelsDividerRepository $dividerRepository,
        ProjectDividerChanger $projectDividerChanger,
        Request $request
    ) {
        $user = $this->getUser();
        if (!$project->getProjectData()->availableForWriting($user)) {
            throw new AccessDeniedHttpException();
        }

        /**
         * @var DividerDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, DividerDTO::class);
        $dto->projectDataId = $project->getProjectData()->getId();
        $projectDividerChanger->removeDividerWithoutRelatedRecords(
            $project->getId(),
            $dto->projectDataId,
            $dto->coefficient
        );
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $oldCoeff = $divider->getCoefficient();
        $divider->updateFromDTO($dto);
        $dividerRepository->save($divider);
        $projectDividerChanger->changeRelatedCoefficients(
            $project->getId(),
            $oldCoeff,
            $dto->coefficient
        );

        return $this->getApiResponse($divider, 200);
    }
}
