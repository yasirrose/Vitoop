<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\Repository\ProjectRepository;

/**
 * @Route("my-projects")
 */
class MyProjectController extends ApiController
{
    /**
     * @var ProjectRepository
     */
    private $projectRepository;

    /**
     * MyProjectController constructor.
     * @param ProjectRepository $projectRepository
     */
    public function __construct(ProjectRepository $projectRepository)
    {
        $this->projectRepository = $projectRepository;
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function getMyProjects()
    {
        if (!$this->getUser()) {
            return [];
        }

        return $this->getApiResponse($this->projectRepository->getMyProjectsShortDTO($this->getUser()));
    }
}
