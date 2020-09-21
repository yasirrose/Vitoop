<?php

namespace App\Service\Queue;

use Enqueue\Client\ProducerInterface;
use App\DTO\QueueMessage\QueueMessageInterface;

class DelayEventNotificator
{
    const DELAY_EVENT_TOPIC = 'delay_event_topic';

    /**
     * @var ProducerInterface
     */
    private $producer;

    /**
     * DelayEventNotificator constructor.
     * @param ProducerInterface $producer
     */
    public function __construct(ProducerInterface $producer)
    {
        $this->producer = $producer;
    }

    public function notify(QueueMessageInterface $message)
    {
        $this->producer->sendEvent(self::DELAY_EVENT_TOPIC, $message->toArray());
    }
}