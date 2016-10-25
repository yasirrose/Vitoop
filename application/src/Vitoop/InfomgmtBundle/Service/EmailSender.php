<?php

namespace Vitoop\InfomgmtBundle\Service;

use Swift_Mailer;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Vitoop\InfomgmtBundle\Entity\Invitation;

class EmailSender
{
    /**
     * @var Swift_Mailer 
     */
    private $mailer;

    /**
     *
     * @var TwigEngine 
     */
    private $templater;

    public function __construct(Swift_Mailer $mailer, TwigEngine $templater)
    {
        $this->mailer = $mailer;
        $this->templater = $templater;
    }

    public function sendInvite(Invitation $invitation)
    {
        $message = $this->createMessage(
            $invitation->getSubject(),
            $invitation->getEmail(),
            $invitation->getMail()
        );

        return $this->mailer->send($message);
    }

    private function createMessage($subject, $emailTo, $body)
    {
        return \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom(array('einladung@vitoop.org' => 'David Rogalski'))
            ->setTo($emailTo)
            ->setBody($body, 'text/html');
    }
}
