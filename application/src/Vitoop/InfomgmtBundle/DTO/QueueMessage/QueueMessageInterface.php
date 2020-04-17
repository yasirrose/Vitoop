<?php

namespace Vitoop\InfomgmtBundle\DTO\QueueMessage;

/**
 * Interface QueueMessageInterface
 * @package Vitoop\InfomgmtBundle\DTO\QueueMessage
 */
interface QueueMessageInterface
{
    /**
     * @return array
     */
    public function toArray(): array;
}
