<?php

namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Vitoop\InfomgmtBundle\Entity\Pdf;

/**
 * @Route("views/")
 */
class PdfViewerController extends Controller
{
    /**
     * @Route("{id}")
     * @Template("@VitoopInfomgmt/View/resource.html.twig")
     */
    public function viewerAction(Pdf $pdf)
    {
        $dataCollector = $this->get('vitoop.resource_data_collector');
        $dataCollector->init($pdf);
        
        return [
            'resource' => $pdf,
            'tagForm' => $dataCollector->getTag(),
            'remarkForm' => $dataCollector->getRemark(),
            'privateRemarkForm' => $dataCollector->getRemarkPrivate(),
            'commentForm' => $dataCollector->getComment(),
            'projectForm' => $dataCollector->getProject(),
            'lexiconForm' => $dataCollector->getLexicon(),
        ];
    }
}
