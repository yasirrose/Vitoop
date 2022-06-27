<?php

namespace App\Service;

use Swift_Mailer;
use Twig\Environment;
use App\DTO\Links\SendLinksDTO;
use App\Entity\ConversationMessage;
use App\Entity\Flag;
use App\Entity\Invitation;
use App\Entity\Resource;
use App\Entity\User\User;

class EmailSender
{
    /**
     * @var Swift_Mailer
     */
    private $mailer;

    /**
     * @var Environment
     */
    private $templater;

    /**
     * @var string
     */
    private $host;

    public function __construct(Swift_Mailer $mailer, Environment $templater, $host)
    {
        $this->mailer = $mailer;
        $this->templater = $templater;
        $this->host = $host;
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
    public function sendLinks(SendLinksDTO $dto, array $resources, User $user, $zipFile = null)
    {
        $message = $this->createMessage(
            $dto->emailSubject,
            $dto->email,
            $this->templater->render(
                'email/sendLinks.html.twig',
                [
                    'body'  => $dto->textBody,
                    'comments' => $dto->getComments(),
                    'resources' => $resources
                ]
            )
        );

        $message->setFrom($user->getEmail());
        if ($zipFile) {
            $attachment = new \Swift_Attachment($zipFile, 'vitoop_export.json', 'application/json');
            $message->attach($attachment);
        }

        return $this->mailer->send($message);
    }

    public function sendLinksWithDataTransfer(SendLinksDTO $dto, array $resources, User $user, bool $zipFile)
    {
        return $this->sendLinks(
            $dto,
            $resources,
            $user,
            $zipFile
        );
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

    public function sendConversationMessageNotification(
        string $email,
        ConversationMessage $conversationMessage
    ) {
        $conversationData = $conversationMessage->getConversationData();
        $message = $this->createMessage(
            'vitoop: '. $conversationData->getConversation()->getName(),
            $email,
            $this->templater->render(
                'email/conversationNotification.html.twig',
                [
                    'host' => $this->host,
                    'message' => $conversationMessage
                ]
            )
        );

        return $this->mailer->send($message);
    }

    public function sendChangeFlagNotification(Resource $resource, $flagType, Flag $flag)
    {
        $message = $this->createMessage(
            $flagType . ': '. $resource->getName(),
            'info@vitoop.org',
            $this->templater->render(
                'email/flagNotification.html.twig',
                [
                    'message' => $flag->getInfo()
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
        return (new \Swift_Message($subject))
            ->setFrom(['noreply@vitoop.org' => 'vitoop'])
            ->setTo($emailTo)
            ->setBody($body, 'text/html');
    }
}
