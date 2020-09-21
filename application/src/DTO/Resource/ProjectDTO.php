<?php

namespace App\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use App\DTO\CreateFromRequestInterface;

/**
 * Class ProjectDTO
 * @package App\DTO\Resource
 */
class ProjectDTO extends ProjectShortDTO implements CreateFromRequestInterface
{
    public $projectData;

    public $userId;

    public static function createFromRequest(Request $request)
    {
        $requestData = \json_decode($request->getContent(), true);
        if (empty($requestData)) {
            $requestData = [];
        }
        $dto = new ProjectDTO($requestData['id'] ?? null, $requestData['name'] ?? null);
        $dto->projectData = ProjectDataDTO::createFromArray($requestData['project_data'] ?? []);
        $dto->userId = $requestData['user'] ? $requestData['user']['id'] : null;

        return $dto;
    }
}
