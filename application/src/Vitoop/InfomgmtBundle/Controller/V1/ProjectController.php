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
        if (!$project->getProjectData()->availableForWriting($this->getUser())) {
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
     * @Route("/{id}/{resType}", methods={"GET"}, requirements={"id": "\d+", "resType": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function getRelatedResources(Project $project, $resType, ResourceManager $resourceManager, Request $request)
    {
        $search = new SearchResource(
            new Paging(
                $request->query->get('start', 0),
                $request->query->get('length', 10)
            ),
            new SearchColumns(
                $request->query->get('columns', array()),
                $request->query->get('order', array())
            ),
            $this->getUser(),
            $request->query->has('flagged'),
            $project->getId(),
            $request->query->get('taglist', array()),
            $request->query->get('taglist_i', array()),
            $request->query->get('taglist_h', array()),
            $request->query->get('tagcnt', 0),
            $request->query->get('search', null),
            $request->query->get('isUserHook', null),
            $request->query->get('isUserRead', null),
            $request->query->get('resourceId', null),
            $request->query->get('dateFrom', null),
            $request->query->get('dateTo', null),
            $request->query->get('art', null)
        );

        $resources = $resourceManager->getRepository($resType)->getResourcesWithDividers($search);
        $total = $resourceManager->getRepository($resType)->getResourcesTotal($search);

        return $this->getApiResponse([
            'total' => $total,
            'data' => $resources,
            'resourceInfo' => $this->resourceRepository->getCountByTags($search)
        ]);
    }
}
