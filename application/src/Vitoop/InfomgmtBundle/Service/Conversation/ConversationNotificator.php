<?php

namespace Vitoop\InfomgmtBundle\Service\Conversation;

use Vitoop\InfomgmtBundle\Entity\ConversationMessage;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Service\EmailSender;

/**
 * Class ConversationNotificator
 * @package Vitoop\InfomgmtBundle\Service\Conversation
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
