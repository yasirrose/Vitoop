<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\Paging;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchColumns;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
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
     * ProjectController constructor.
     * @param ResourceRepository $resourceRepository
     */
    public function __construct(ResourceRepository $resourceRepository)
    {
        $this->resourceRepository = $resourceRepository;
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
}
