<?php

namespace App\DTO\Resource\Export;

class ExportPrivateRemarkDTO
{
    public $id;

    public $resourceId;

    public $user;

    public $text;

    public $createdAt;

    /**
     * ExportPrivateRemarkDTO constructor.
     * @param $id
     * @param $resourceId
     * @param $user
     * @param $text
     * @param $createdAt
     */
    public function __construct($id, $resourceId, $user, $text, $createdAt)
    {
        $this->id = $id;
        $this->resourceId = $resourceId;
        $this->user = $user;
        $this->text = $text;
        $this->createdAt = $createdAt;
    }
}
