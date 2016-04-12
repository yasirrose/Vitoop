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
        $mail = <<<'EOT'
Hallo!

Hiermit bist Du herzlich zu vitoop eingeladen.

Du kannst Dich registrieren unter: {LINK}
(Beachte bitte, dass dieser Link nur gilt bis zum {UNTIL})

.. ich w?nsche Dir viel Spa? beim St?bern, Zusammenstellen und Eintragen von neuen Datens?tzen.

Gru?
David Rogalski
EOT;

        $invitation = new Invitation();
        $form = $this->createForm(InvitationNewType::class, $invitation, array(
            'action' => $this->generateUrl('new_invitation'),
            'method' => 'POST'
        ));

        if ('POST' === $request->getMethod()) {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $existing_invitation = $this->getDoctrine()
                    ->getManager()
                    ->getRepository('VitoopInfomgmtBundle:Invitation')
                    ->findOneBy(array('email' => $invitation->getEmail()));
                if (is_null($existing_invitation)) {
                    $invitation->setSubject('Einladung zum Informationsportal VitooP');
                } else {
                    $invitation = $existing_invitation;
                }
                $until = new \DateTime();
                $until = $until->add(new \DateInterval('P3D'));
                $invitation->setUntil($until);

                $link = $this->generateUrl('_register', array('secret' => $invitation->getSecret()), UrlGeneratorInterface::ABSOLUTE_URL);

                $mail = str_replace('{LINK}', $link, $mail);
                $mail = str_replace('{UNTIL}', sprintf('%s um %s Uhr', $until->format('d.m.Y'), $until->format('H:i:s')), $mail);
                $invitation->setMail($mail);


                $em->merge($invitation);
                $em->flush();

                $message = \Swift_Message::newInstance()
                    ->setSubject($invitation->getSubject())
                    ->setFrom(array('einladung@vitoop.org' => 'David Rogalski'))
                    ->setTo($invitation->getEmail())
                    ->setBody($mail);
                $this->get('mailer')->send($message);
                $info = 'Dir wurde ein Einladungslink geschickt mit dem Du Dich registrieren kannst.';
            }
        }
        $fv = $form->createView();

        return array('fv' => $fv, 'link' => $link, 'info' => $info);
    }
}
