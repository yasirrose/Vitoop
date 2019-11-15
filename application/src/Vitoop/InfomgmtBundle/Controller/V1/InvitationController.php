<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\Invitation\NewInvitationDTO;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Repository\InvitationRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\EmailSender;
use Vitoop\InfomgmtBundle\Service\SettingsService;

/**
 * @Route("invitations")
 */
class InvitationController extends ApiController
{
    /**
     * @var SettingsService
     */
    private $settingsService;

    /**
     * @var InvitationRepository
     */
    private $invitationRepository;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var EmailSender
     */
    private $mailSender;

    /**
     * InvitationController constructor.
     * @param SettingsService $settingsService
     * @param InvitationRepository $invitationRepository
     * @param ValidatorInterface $validator
     * @param EmailSender $mailSender
     */
    public function __construct(
        SettingsService $settingsService,
        InvitationRepository $invitationRepository,
        ValidatorInterface $validator,
        EmailSender $mailSender
    ) {
        $this->settingsService = $settingsService;
        $this->invitationRepository = $invitationRepository;
        $this->validator = $validator;
        $this->mailSender = $mailSender;
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function createInvitationAction(Request $request)
    {
        if (false === $this->settingsService->getInvitation()->getValue()) {
            return $this->getApiResponse(new ErrorResponse(['Sending invitation is not allowed']), 403);
        }

        /**
         * @var NewInvitationDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, NewInvitationDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $invitation = $this->invitationRepository->findOneBy(['email' => $dto->email]);
        if (null === $invitation) {
            $invitation = new Invitation($dto->email);
        }
        $link = $this->generateUrl(
            '_register',
            ['secret' => $invitation->getSecret()],
            UrlGeneratorInterface::ABSOLUTE_URL
        );
        $mailBody = $this->renderView(
            'email/invitation.html.twig',
            [
                'link' => $link,
                'until' => $invitation->getUntil()
            ]
        );
        $invitation->setMail($mailBody);
        $this->invitationRepository->save($invitation);

        $this->mailSender->sendInvite($invitation);

        return $this->getApiResponse($invitation, 201);
    }
}