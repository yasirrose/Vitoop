<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\Routing\Annotation\Route;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;

/**
 * @Route("projects")
 */
class ProjectController extends ApiController
{
    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getProjectById(Project $project)
    {
        if (!$project->getProjectData()->availableForWriting($this->getUser())) {
            return $this->getApiResponse(new ErrorResponse(['Not available project'], 403));
        }

        return $this->getApiResponse([
            'project' => $project->getDTO(),
            'isOwner' => $project->getProjectData()->availableForDelete($this->getUser())
        ]);
    }
}
