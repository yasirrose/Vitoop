<?php

namespace App\Controller;

use App\DTO\Links\SendLinksDTO;
use App\Repository\ResourceRepository;
use App\Service\EmailSender;
use App\Service\Resource\ResourceExporter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Form\Type\SendLinksType;

class UserLinkController extends AbstractController
{
    /**
     * @Route("/user-links")
     */
    public function userLinksAction(
        Request $request,
        ResourceRepository $resourceRepository,
        EmailSender $emailSender,
        SessionInterface $session,
        ResourceExporter $exporter
    ) {
        $form = $this->createForm(SendLinksType::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            /**
             * @var SendLinksDTO $dto
             */
            $dto = $form->getData();
            $resourceData = $resourceRepository->findSendLinkViewsByResourceIds($dto->getResourceIds());

            if ($dto->dataTransfer) {
                $file = $exporter->export($resourceData);
                $emailSender->sendLinksWithDataTransfer($dto, $resourceData, $this->getUser(), $file);
            } else {
                $emailSender->sendLinks($dto, $resourceData, $this->getUser());
            }

            $session->getFlashBag()->add(
                'success',
                'The mail was sent successfully'
            );
        }

        return $this->render('User/sendLinks.html.twig', ['linksForm' => $form->createView()]);
    }
}
