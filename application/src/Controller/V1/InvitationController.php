<?php

namespace App\Controller\V1;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Controller\ApiController;
use App\DTO\Invitation\NewInvitationDTO;
use App\Entity\Invitation;
use App\Repository\InvitationRepository;
use App\Response\Json\ErrorResponse;
use App\Service\EmailSender;
use App\Service\SettingsService;

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

    /**
     * @Route("/{secret}", methods={"GET"})
     */
    public function getInvitationInfo($secret)
    {
        /**
         * @var Invitation $invitation
         */
        $invitation = $this->invitationRepository->findOneBy([
            'secret' => $secret
        ]);
        if (!$invitation || !$invitation->isActual()) {
           throw $this->createNotFoundException();
        }

        return $this->getApiResponse($invitation);
    }
}