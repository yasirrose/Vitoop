<?php

namespace Vitoop\InfomgmtBundle\Service;

use Swift_Mailer;
use Symfony\Component\Templating\EngineInterface;
use Vitoop\InfomgmtBundle\DTO\Links\SendLinksDTO;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Entity\User;

class EmailSender
{
    /**
     * @var Swift_Mailer 
     */
    private $mailer;

    /**
     * @var EngineInterface
     */
    private $templater;

    public function __construct(Swift_Mailer $mailer, EngineInterface $templater)
    {
        $this->mailer = $mailer;
        $this->templater = $templater;
    }

    /**
     * @param Invitation $invitation
     * @return int
     */
    public function sendInvite(Invitation $invitation) :int
    {
        $message = $this->createMessage(
            $invitation->getSubject(),
            $invitation->getEmail(),
            $invitation->getMail()
        );

        return $this->mailer->send($message);
    }

    /**
     * @param User $user
     * @return int
     */
    public function sendRegisterNotification(User $user) :int
    {
        $message = $this->createMessage('New user', 'info@vitoop.org', '');
        
        return $this->mailer->send($message);
    }

    /**
     * @param User $user
     * @return int
     */
    public function sendUserForgotPassword(User $user) :int
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

    /**
     * @param SendLinksDTO $dto
     * @param array $resources
     * @return int
     */
    public function sendLinks(SendLinksDTO $dto, array $resources, User $user)
    {
        $message = $this->createMessage(
            $dto->emailSubject,
            $dto->email,
            $this->templater->render(
                'email/sendLinks.html.twig',
                [
                    'body'  => $dto->textBody,
                    'resources' => $resources
                ]
            )
        );
        $message->setFrom($user->getEmail());

        return $this->mailer->send($message);
    }

    public function sendDownloadFolderStatus(string $email, $folderSize, $message)
    {
        $message = $this->createMessage(
            'Vitoop needs help',
            $email,
            $this->templater->render(
                'email/downloadFolder.html.twig',
                [
                    'size'  => $folderSize,
                    'message' => $message
                ]
            )
        );

        return $this->mailer->send($message);
    }

    /**
     * @param $subject
     * @param $emailTo
     * @param $body
     * @return \Swift_Message
     */
    private function createMessage($subject, $emailTo, $body)
    {
        return \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom(['einladung@vitoop.org' => 'David Rogalski'])
            ->setTo($emailTo)
            ->setBody($body, 'text/html');
    }
}
