<?php

namespace App\Entity\Resource;

class ResourceFactory
{
    /**
     * @param $type
     * @return mixed
     */
    public static function create($type)
    {
        $class = ResourceType::getClassByResourceType($type);
        if (empty($class)) {
            throw new \DomainException('Incorrect resource type');
        }
        return new $class;
    }
}
