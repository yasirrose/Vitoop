<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Form\Type\InvitationNewType;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

/**
 * @Route("/invitation")
 */
class InvitationController extends ApiController
{
    /**
     * @Route("/toggle", name="invitation_toggle")
     * @Method({"PUT"})
     *
     * @return array
     */
    public function onAction()
    {
        $invitation = $this->get('vitoop.settings')->toggleInvitation();
        $serializer = $this->get('jms_serializer');
        $serializerContext = SerializationContext::create();
        $response = $serializer->serialize(array('success' => true, 'invitation' => $invitation), 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/new", name="new_invitation")
     * @Method({"GET", "POST"})
     * @Template("VitoopInfomgmtBundle:User:invitation_for_user.html.twig")
     *
     * @return array
     */
    public function newAction(Request $request)
    {
        if ($this->get('vitoop.settings')->getInvitation()->getValue() == false) {
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
            if ($form->isValid()) {
                $existing_invitation = $this->get('vitoop.repository.invitation')
                    ->findOneByEmail($invitation->getEmail());
                if ($existing_invitation) {
                    $invitation = $existing_invitation;
                    $invitation->updateUntil();
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

                $this->get('vitoop.repository.invitation')->add($invitation);
                $this->get('doctrine.orm.entity_manager')->flush();

                $this->get('vitoop.email_sender')->sendInvite($invitation);
                
                $info = 'Dir wurde ein Einladungslink geschickt mit dem Du Dich registrieren kannst.';
            }
        }

        return [
            'fv' => $form->createView(),
            'link' => $link,
            'info' => $info
        ];
    }
}
