<?php

namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;

class ApiController extends Controller
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
            if ($interfaces && in_array(CreateFromRequestInterface::class, $interfaces)) {
                return $type::createFromRequest($request);
            }
        }

        return json_decode($request->getContent());
    }
}
