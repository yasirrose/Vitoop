<?php

namespace App\Service\Queue\Processor;

use Enqueue\Client\TopicSubscriberInterface;
use Enqueue\Util\JSON;
use Interop\Queue\Context;
use Interop\Queue\Message;
use Interop\Queue\Processor;
use App\Repository\ConversationMessageRepository;
use App\Service\Conversation\ConversationNotificator;
use App\Service\Queue\DelayEventNotificator;

/**
 * Class DelayEventProcessor
 * @package App\Service\Queue\Processor
 */
class DelayEventProcessor implements Processor, TopicSubscriberInterface
{
    /**
     * @var ConversationNotificator $conversationNotificator
     */
    private $conversationNotificator;

    /**
     * @var ConversationMessageRepository
     */
    private $messageRepository;

    /**
     * DelayEventProcessor constructor.
     * @param ConversationNotificator $conversationNotificator
     * @param ConversationMessageRepository $messageRepository
     */
    public function __construct(
        ConversationNotificator $conversationNotificator,
        ConversationMessageRepository $messageRepository
    ) {
        $this->conversationNotificator = $conversationNotificator;
        $this->messageRepository = $messageRepository;
    }

    /**
     * @inheritDoc
     */
    public function process(Message $message, Context $context)
    {
        $decodedMessage = JSON::decode($message->getBody());
        $messageId = $decodedMessage['id'];
        $message = $this->messageRepository->find($messageId);
        if ($message) {
            $this->conversationNotificator->notify($message);
        }

        return self::ACK;
    }

    /**
     * @inheritDoc
     */
    public static function getSubscribedTopics()
    {
        return [DelayEventNotificator::DELAY_EVENT_TOPIC];
    }
}
