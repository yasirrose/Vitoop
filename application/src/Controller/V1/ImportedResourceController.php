<?php

namespace App\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\ApiController;

/**
 * @Route("imported-resources")
 */
class ImportedResourceController extends ApiController
{
    /**
     * @Route("", methods={"POST"})
     */
    public function import(Request $request)
    {
        return $this->getApiResponse(['status' => 'ok']);
    }
}
