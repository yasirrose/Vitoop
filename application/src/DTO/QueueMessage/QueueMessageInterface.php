<?php

namespace App\DTO\QueueMessage;

/**
 * Interface QueueMessageInterface
 * @package App\DTO\QueueMessage
 */
interface QueueMessageInterface
{
    /**
     * @return array
     */
    public function toArray(): array;
}
