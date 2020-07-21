<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;
use Vitoop\InfomgmtBundle\Entity\Resource\ResourceType;

class CreateResourceDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @var string
     * @Assert\NotBlank()
     * @Assert\Choice(callback="getResourceTypes")
     */
    public $resourceType;

    /**
     * @var ResourceDTO
     * @Assert\NotBlank()
     * @Assert\NotNull()
     * @Assert\Valid()
     * @Assert\Type("Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO")
     */
    public $resource;

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        $dto = new CreateResourceDTO();
        $dto->resourceType = $requestData['resource_type'] ?? null;
        $dto->resource = ResourceDTO::createFromArrayAndType($requestData['resource'] ?? [], $dto->resourceType);

        return $dto;
    }

    public static function createFromRequestAndType(Request $request, $type)
    {
        $requestData = self::getRequestData($request);
        $dto = new CreateResourceDTO();
        $dto->resourceType = $type;
        $dto->resource = ResourceDTO::createFromArrayAndType($requestData['resource'] ?? [], $dto->resourceType);

        return $dto;
    }

    public static function getResourceTypes()
    {
        return array_keys(ResourceType::RESOURCE_TYPES);
    }

}