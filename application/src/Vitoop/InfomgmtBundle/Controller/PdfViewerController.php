<?php

namespace Vitoop\InfomgmtBundle\Controller;

use Doctrine\ORM\ORMException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\PdfAnnotation;

/**
 * @Route("views/")
 */
class PdfViewerController extends ApiController
{
    /**
     * @Route("{id}")
     */
    public function viewerAction(Pdf $pdf)
    {
        $dataCollector = $this->get('vitoop.resource_data_collector');
        $dataCollector->init($pdf);
        $pdfParams = [
            'resource' => $pdf,
            'tagForm' => $dataCollector->getTag(),
            'remarkForm' => $dataCollector->getRemark(),
            'privateRemarkForm' => $dataCollector->getRemarkPrivate(),
            'commentForm' => $dataCollector->getComment(),
            'projectForm' => $dataCollector->getProject(),
            'lexiconForm' => $dataCollector->getLexicon(),
        ];

        return $this->render('@VitoopInfomgmt/View/resource.edit.html.twig', $pdfParams);
    }

    /**
     * @Route("{id}/annotations", methods={"GET"})
     */
    public function annotationsAction(Pdf $pdf)
    {
        try {
            return $this->getApiResponse(
                $this->get('vitoop.repository.pdf_annotation')->getAnnotationsByPdfAndUser(
                    $pdf,
                    $this->get("vitoop.vitoop_security")->getUser(),
                    true
                )
            );
        } catch (ORMException $exception) {
            return $this->getApiResponse([]);
        }
    }

    /**
     * @Route("{id}/annotations", methods={"POST"})
     */
    public function saveAnnotationAction(Pdf $pdf, Request $request)
    {
        $annotationData = $this->getDTOFromRequest($request) ?? [];
        $user = $this->get("vitoop.vitoop_security")->getUser();

        $annotation = $this->get('vitoop.repository.pdf_annotation')->findOneByPdfAndUser($pdf, $user);
        if (!$annotation) {
            $annotation = new PdfAnnotation($pdf, $user, []);
        }
        $annotation->updateAnnotation($annotationData);
        $this->get('vitoop.repository.pdf_annotation')->add($annotation);
        $this->getDoctrine()->getManager()->flush();

        return $this->getApiResponse($annotation->getAnnotations());
    }
}
