<?php
namespace App\Controller;

use App\Repository\InvitationRepository;
use App\Service\EmailSender;
use JMS\Serializer\SerializerInterface;
use JMS\Serializer\SerializationContext;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Invitation;
use App\Form\Type\InvitationNewType;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use App\Service\SettingsService;

/**
 * @Route("/invitation")
 */
class InvitationController extends ApiController
{
    /**
     * @var InvitationRepository
     */
    private $invitationRepository;

    /**
     * @var EmailSender
     */
    private $emailSender;

    /**
     * InvitationController constructor.
     * @param InvitationRepository $invitationRepository
     * @param EmailSender $emailSender
     */
    public function __construct(InvitationRepository $invitationRepository, EmailSender $emailSender)
    {
        $this->invitationRepository = $invitationRepository;
        $this->emailSender = $emailSender;
    }

    /**
     * @Route("/toggle", name="invitation_toggle", methods={"PUT"})
     *
     * @return array
     */
    public function onAction(SettingsService $settings, SerializerInterface $serializer)
    {
        $invitation = $settings->toggleInvitation();
        $serializerContext = SerializationContext::create();
        $response = $serializer->serialize(array('success' => true, 'invitation' => $invitation), 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @deprecated
     * @Route("/new", name="new_invitation", methods={"GET", "POST"})
     *
     * @return array
     */
    public function newAction(SettingsService $settings, Request $request)
    {
        if ($settings->getInvitation()->getValue() == false) {
            return $this->redirect($this->generateUrl('_base_url'));
        }
        $link = '';
        $info = '';
    
        $invitation = new Invitation();
        $form = $this->createForm(InvitationNewType::class, $invitation, array(
            'action' => $this->generateUrl('new_invitation'),
            'method' => 'POST'
        ));

        if ('POST' === $request->getMethod()) {
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $existing_invitation = $this->invitationRepository->findOneByEmail($invitation->getEmail());
                if ($existing_invitation) {
                    $invitation = $existing_invitation;
                }
                $invitation->updateUntil();

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

                $this->emailSender->sendInvite($invitation);
                
                $info = 'Es wurde eine Einladungsmail an die eingetragene Adresse geschickt.';
            }
        }

        return $this->render(
            'User/invitation_for_user.html.twig',
            [
                'fv' => $form->createView(),
                'link' => $link,
                'info' => $info
            ]
        );
    }
}
