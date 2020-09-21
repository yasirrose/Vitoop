<?php

namespace App\Service\Conversation;

use App\Entity\ConversationMessage;
use App\Entity\User\User;
use App\Service\EmailSender;

/**
 * Class ConversationNotificator
 * @package App\Service\Conversation
 */
class ConversationNotificator
{
    /**
     * @var EmailSender
     */
    private $emailSender;

    /**
     * ConversationNotificator constructor.
     * @param EmailSender $emailSender
     */
    public function __construct(EmailSender $emailSender)
    {
        $this->emailSender = $emailSender;
    }

    /**
     * @param ConversationMessage $message
     */
    public function notify(ConversationMessage $message)
    {
        /**
         * @var User $user
         */
        foreach ($message->getConversationData()->getConversationNotifications() as $user) {
            if ($user !== $message->getUser()) {
                $this->emailSender->sendConversationMessageNotification($user->getEmail(), $message);
            }
        }
    }
}
