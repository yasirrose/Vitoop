<?php

namespace App\Controller;

use App\DTO\Links\SendLinksDTO;
use App\Entity\Remark;
use App\Entity\Resource;
use App\Repository\ResourceRepository;
use App\Service\EmailSender;
use App\Service\Resource\ResourceExporter;
use Doctrine\ORM\EntityManagerInterface;
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
        ResourceExporter $exporter,
        EntityManagerInterface $entityManager
    ) {
        $form = $this->createForm(SendLinksType::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            /**
             * @var SendLinksDTO $dto
             */
            $dto = $form->getData();
            /** @var Resource[] $resourceData */
            $resourceData = $resourceRepository->findSendLinkViewsByResourceIds($dto->getResourceIds());

            $comments = $dto->getComments();

            foreach ($resourceData as $resource) {
                if (empty($comments[$resource->getId()])) {
                    continue;
                }
                $comment = &$comments[$resource->getId()];
                /*if (empty(trim($comment['text']))) {
                    continue;
                }*/
                $remark = new Remark();
                $remark->setUser($this->getUser());
                $remark->setText($comment['text']);
                $remark->setIp($request->getClientIp());
                $remark->setResource($resource);
                $comment['remark'] = $remark;
            }

            if ($dto->dataTransfer) {
                $file = $exporter->export($resourceData);
                $emailSender->sendLinksWithDataTransfer($dto, $resourceData, $this->getUser(), $file);
            } else {
                $emailSender->sendLinks($dto, $resourceData, $this->getUser());
            }

            foreach ($resourceData as $resource) {
                if (empty($comments[$resource->getId()])) {
                    continue;
                }
                $comment = &$comments[$resource->getId()];
                if (!$comment['save']) {
                    $resource->getRemarks()->removeElement($comment['remark']);
                    $this->getUser()->getRemarks()->removeElement($comment['remark']);
                    $entityManager->remove($comment['remark']);
                }
            }

            $entityManager->flush();

            $session->getFlashBag()->add(
                'success',
                'The mail was sent successfully'
            );
        }

        return $this->render('User/sendLinks.html.twig', ['linksForm' => $form->createView()]);
    }
}
