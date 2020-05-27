<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\Resource\ProjectAssignment;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Repository\RelResourceResourceRepository;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\RelResource\RelResourceLinker;
use Vitoop\InfomgmtBundle\Service\ResourceManager;

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
     * @Route("/{id}/{resType}", methods={"GET"}, requirements={"id": "\d+", "resType": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function getRelatedResources(Project $project, $resType, ResourceManager $resourceManager, Request $request)
    {
        $search = SearchResource::createFromRequest($request, $this->getUser(), $project->getId());

        $resourceRepository = $resourceManager->getRepository($resType);
        $resources = $resourceRepository->getResourcesWithDividers($search);
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
        try {
            $assignments = [];
            foreach ($resources as $resource) {
                $relResource = $this->relResourceLinker->linkProjectToResource($project, $resource);
                $this->relResourceRepository->save();
                $assignments[] = $relResource->getDTO();
            }
        } catch (\Exception $exception) {
            return $this->getApiResponse(new ErrorResponse([$exception->getMessage()]), 400);
        }

        return $this->getApiResponse($assignments, 201);
    }
}
