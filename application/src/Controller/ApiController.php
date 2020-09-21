<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\DTO\GetDTOInterface;
use App\DTO\CreateFromRequestInterface;

class ApiController extends AbstractController
{
    /**
     * @param $data
     * @param int $status
     * @param bool $alreadyJson
     * @return JsonResponse
     */
    public function getApiResponse($data, $status = 200, $alreadyJson = false)
    {
        if ($data instanceof GetDTOInterface) {
           $data = $data->getDTO(); 
        }

        return new JsonResponse($data, $status, [], $alreadyJson);
    }

    public function getDTOFromRequest(Request $request, $type = null)
    {
        if ($type) {
            $interfaces = class_implements($type);
            if ($interfaces && \in_array(CreateFromRequestInterface::class, $interfaces, true)) {
                return $type::createFromRequest($request);
            }
        }

        return \json_decode($request->getContent());
    }
}
