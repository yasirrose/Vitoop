<?php

namespace App\DTO\Resource\Export;

class ExportResourceTagDTO
{
    public $id;

    public $resourceId;

    public $user;

    public $tag;

    public $deletedByUser;

    /**
     * ExportResourceTagDTO constructor.
     * @param $id
     * @param $resourceId
     * @param $user
     * @param $tag
     * @param $deletedByUser
     */
    public function __construct($id, $resourceId, $user, $tag, $deletedByUser)
    {
        $this->id = $id;
        $this->resourceId = $resourceId;
        $this->user = $user;
        $this->tag = $tag;
        $this->deletedByUser = $deletedByUser;
    }
}