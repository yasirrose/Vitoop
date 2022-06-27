<?php

namespace App\Controller;

use App\DTO\Links\SendLinksDTO;
use App\DTO\Resource\RemarkDTO;
use App\Entity\Remark;
use App\Entity\Resource;
use App\Entity\User\User;
use App\Repository\ResourceRepository;
use App\Service\EmailSender;
use App\Service\Factories\CommentFactory;
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
            /** @var User $user */
            $user = $this->getUser();
            /** @var Resource[] $resourceData */
            $resourceData = $resourceRepository->findSendLinkViewsByResourceIds($dto->getResourceIds());

            $comments = $dto->getComments();

            foreach ($resourceData as $resource) {
                if (empty($comments[$resource->getId()])) {
                    continue;
                }
                $comment = &$comments[$resource->getId()];
                $remarkDto = new RemarkDTO(
                    null,
                    $comment['text'],
                    $request->getClientIp(),
                    false,
                    $user->getId(),
                    $user->getUsername(),
                    new \DateTime()
                );
                $remark = Remark::create($resource, $user, $remarkDto);
                $comment['remark'] = $remark;
            }

            if ($dto->dataTransfer) {
                $file = $exporter->export($resourceData);
                $emailSender->sendLinksWithDataTransfer($dto, $resourceData, $user, $file);
            } else {
                $emailSender->sendLinks($dto, $resourceData, $user);
            }

            foreach ($resourceData as $resource) {
                if (empty($comments[$resource->getId()])) {
                    continue;
                }
                $comment = &$comments[$resource->getId()];
                if (!$comment['save']) {
                    $resource->getRemarks()->removeElement($comment['remark']);
                    $user->getRemarks()->removeElement($comment['remark']);
                    $entityManager->remove($comment['remark']);
                } else {
                    $newComment = CommentFactory::fromCommentRemark($comment);
                    $entityManager->persist($newComment);
                    $entityManager->persist($resource);
                    $entityManager->persist($user);
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
