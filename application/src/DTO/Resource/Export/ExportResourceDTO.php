<?php

namespace App\DTO\Resource\Export;

use App\DTO\Resource\ResourceDTO;
use App\Entity\ValueObject\PublishedDate;

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
            if ($value instanceof \DateTime) {
                $dto->$property = $value->format(\DateTime::ISO8601);
            } elseif ($value instanceof PublishedDate) {
                $dto->$property = $value->getDate();
            } else {
                $dto->$property = $value;
            }
        }

        return $dto;
    }

}