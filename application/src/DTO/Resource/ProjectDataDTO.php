<?php

namespace App\DTO\Resource;

class ProjectDataDTO
{
    public $id;

    public $sheet;

    public $isAllRecords;

    public $isForRelatedUsers;

    public $isPrivate;

    public $relUsers;

    public static function createFromArray(array $requestData)
    {
        $dto = new ProjectDataDTO();
        foreach (get_object_vars($dto) as $property => $value) {
            $requestKey = self::toUnderscore($property);
            if (\array_key_exists($requestKey, $requestData)) {
                $dto->$property = $requestData[$requestKey];
            }
        }

        return $dto;
    }

    public static function toUnderscore($camelCase)
    {
        return ltrim(strtolower(preg_replace('/[A-Z]([A-Z](?![a-z]))*/', '_$0', $camelCase)), '_');
    }
}
