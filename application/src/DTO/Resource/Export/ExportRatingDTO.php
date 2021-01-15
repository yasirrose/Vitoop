<?php

namespace App\DTO\Resource\Export;

class ExportRatingDTO
{
    public $id;

    public $resourceId;

    public $mark;

    public $user;

    /**
     * ExportRatingDTO constructor.
     * @param $id
     * @param $resourceId
     * @param $mark
     * @param $user
     */
    public function __construct($id, $resourceId, $mark, $user)
    {
        $this->id = $id;
        $this->resourceId = $resourceId;
        $this->mark = $mark;
        $this->user = $user;
    }
}