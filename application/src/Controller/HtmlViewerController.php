<?php

namespace App\Controller;

use App\Entity\Resource;
use App\Entity\UrlCheck\UrlCheckInterface;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("html-views/")
 */
class HtmlViewerController extends ApiController
{
    /**
     * @Route("{id}")
     */
    public function viewerAction(Resource $resource)
    {
        $url = '';
        if ($resource instanceof UrlCheckInterface) {
            $url = $resource->getUrl();
        }

        return $this->getApiResponse([
            'url' => $url
        ]);
    }
}
