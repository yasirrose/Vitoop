<?php

namespace App\Controller;

use App\Entity\Resource;
use App\Entity\UrlCheck\UrlCheckInterface;
use App\Service\ResourceDataCollector;
use App\Service\UrlGetter;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("html-views/")
 */
class HtmlViewerController extends ApiController
{
    /**
     * @Route("{id}", methods={"GET"})
     */
    public function viewerAction(Resource $resource, ResourceDataCollector $dataCollector, UrlGetter $urlGetter)
    {
        $dataCollector->init($resource);

        return $this->render('HtmlView/resource.html.twig', [
            'resource' => $resource,
            'tagForm' => $dataCollector->getTag(),
            'remarkForm' => $dataCollector->getRemark(),
            'privateRemarkForm' => $dataCollector->getRemarkPrivate(),
            'commentForm' => $dataCollector->getComment(),
            'projectForm' => $dataCollector->getProject(),
            'lexiconForm' => $dataCollector->getLexicon(),
            'htmlcontent' => $urlGetter->getBinaryContentFromUrl($urlGetter->getLocalUrl($resource)),
        ]);
    }
}
