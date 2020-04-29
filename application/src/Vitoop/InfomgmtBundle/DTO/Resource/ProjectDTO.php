<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;

/**
 * Class ProjectDTO
 * @package Vitoop\InfomgmtBundle\DTO\Resource
 */
class ProjectDTO implements CreateFromRequestInterface
{
    public $id;

    public $name;

    public $projectData;

    public $userId;

    public static function createFromRequest(Request $request)
    {
        $requestData = \json_decode($request->getContent(), true);
        if (empty($requestData)) {
            $requestData = [];
        }
        $dto = new ProjectDTO();
        $dto->projectData = ProjectDataDTO::createFromArray($requestData['project_data'] ?? []);
        $dto->id = $requestData['id'] ?? null;
        $dto->name = $requestData['name'] ?? null;
        $dto->userId = $requestData['user'] ? $requestData['user']['id'] : null;

        return $dto;
    }
}
