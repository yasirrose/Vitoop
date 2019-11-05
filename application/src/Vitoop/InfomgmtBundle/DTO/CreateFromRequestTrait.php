<?php

namespace Vitoop\InfomgmtBundle\DTO;

use Symfony\Component\HttpFoundation\Request;

trait CreateFromRequestTrait
{
    /**
     * @param Request $request
     * @return static
     */
    public static function createFromRequest(Request $request)
    {
        $requestData = \json_decode($request->getContent(), true);
        if (empty($requestData)) {
            $requestData = [];
        }
        $dto = new static();
        foreach (get_object_vars($dto) as $property => $value) {
            if (\array_key_exists($property, $requestData)) {
                $dto->$property = $requestData[$property];
            }
        }

        return $dto;
    }
}