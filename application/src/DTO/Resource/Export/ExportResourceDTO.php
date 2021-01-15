<?php

namespace App\DTO\Resource\Export;

use App\DTO\Resource\ResourceDTO;

class ExportResourceDTO extends ResourceDTO
{
    public $resourceType;

    public $tags;

    public $ratings;

    public $remark;

    public $remarksPrivate;

    public $comments;

    /**
     * @param ResourceDTO $resourceDTO
     * @return ExportResourceDTO
     */
    public static function createFromResourceDTO(ResourceDTO $resourceDTO): ExportResourceDTO
    {
        $dto = new ExportResourceDTO();
        foreach (get_object_vars($resourceDTO) as $property => $value) {
            $dto->$property = $value;
        }

        return $dto;
    }

}