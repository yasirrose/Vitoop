<?php

namespace Vitoop\InfomgmtBundle\DTO\QueueMessage;

class ConversationMessageNotification implements QueueMessageInterface
{
    /**
     * @var int
     */
    private $messageId;

    /**
     * ConversationMessage constructor.
     * @param int $messageId
     */
    public function __construct($messageId)
    {
        $this->messageId = $messageId;
    }

    /**
     * @return int
     */
    public function getMessageId(): int
    {
        return $this->messageId;
    }

    /**
     * @inheritDoc
     */
    public function toArray(): array
    {
        return [
            'id' => $this->messageId
        ];
    }
}
