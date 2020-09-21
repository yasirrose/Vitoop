<?php

namespace App\Controller;

use Doctrine\ORM\ORMException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Pdf;
use App\Entity\PdfAnnotation;
use App\Repository\PdfAnnotationRepository;
use App\Service\ResourceDataCollector;
use App\Service\VitoopSecurity;

/**
 * @Route("views/")
 */
class PdfViewerController extends ApiController
{
    /**
     * @Route("{id}")
     */
    public function viewerAction(ResourceDataCollector $dataCollector, Pdf $pdf)
    {
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

        return $this->render('View/resource.edit.html.twig', $pdfParams);
    }

    /**
     * @Route("{id}/annotations", methods={"GET"})
     */
    public function annotationsAction(
        PdfAnnotationRepository $annotationRepository,
        VitoopSecurity $vitoopSecurity,
        Pdf $pdf
    ) {
        try {
            return $this->getApiResponse(
                $annotationRepository->getAnnotationsByPdfAndUser($pdf, $vitoopSecurity->getUser(), true)
            );
        } catch (ORMException $exception) {
            return $this->getApiResponse([]);
        }
    }

    /**
     * @Route("{id}/annotations", methods={"POST"})
     */
    public function saveAnnotationAction(
        PdfAnnotationRepository $annotationRepository,
        VitoopSecurity $vitoopSecurity,
        Pdf $pdf,
        Request $request
    ) {
        $annotationData = $this->getDTOFromRequest($request) ?? [];
        $user = $vitoopSecurity->getUser();

        $annotation = $annotationRepository->findOneByPdfAndUser($pdf, $user);
        if (!$annotation) {
            $annotation = new PdfAnnotation($pdf, $user, []);
        }
        $annotation->updateAnnotation($annotationData);
        $annotationRepository->add($annotation);
        $annotationRepository->save();

        return $this->getApiResponse($annotation->getAnnotations());
    }
}
