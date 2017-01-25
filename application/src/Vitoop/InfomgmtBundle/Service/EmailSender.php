<?php

namespace Vitoop\InfomgmtBundle\Service;

use Swift_Mailer;
use Symfony\Bundle\TwigBundle\TwigEngine;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Entity\User;

class EmailSender
{
    /**
     * @var Swift_Mailer 
     */
    private $mailer;

    /**
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

    public function sendRegisterNotification(User $user)
    {
        $message = $this->createMessage('New user', 'info@vitoop.org', '');
        
        return $this->mailer->send($message);
    }

    public function sendUserForgotPassword(User $user)
    {
        $message = $this->createMessage(
            'Forgot Password',
            $user->getEmail(),
            $this->templater->render(
                'email/forgot.html.twig',
                [
                    'token' => $user->getResetPasswordToken(),
                    'username' => $user->getUsername()
                ]
            )
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
