<?php

namespace App\DTO\Resource\Export;

class ExportRemarkDTO
{
    public $id;

    public $resourceId;

    public $user;

    public $text;

    public $locked;

    public $ip;

    public $createdAt;

    /**
     * ExportRemarkDTO constructor.
     * @param $id
     * @param $resourceId
     * @param $user
     * @param $text
     * @param $locked
     * @param $ip
     */
    public function __construct($id, $resourceId, $user, $text, $locked, $ip, $createdAt)
    {
        $this->id = $id;
        $this->resourceId = $resourceId;
        $this->user = $user;
        $this->text = $text;
        $this->locked = $locked;
        $this->ip = $ip;
        $this->createdAt = $createdAt;
    }
}
