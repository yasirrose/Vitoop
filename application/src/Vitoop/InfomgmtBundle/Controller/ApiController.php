<?php

namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiController extends Controller
{
    public function getApiResponse($data, $status = 200)
    {
        return new JsonResponse($data, $status);
    }

    public function getDTOFromRequest($type = null)
    {
        return json_decode($this->getRequest()->getContent());
    }
}
