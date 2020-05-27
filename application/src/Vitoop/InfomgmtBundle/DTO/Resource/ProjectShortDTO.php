<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

class ProjectShortDTO
{
    public $id;

    public $name;

    /**
     * ProjectShortDTO constructor.
     * @param $id
     * @param $name
     */
    public function __construct($id, $name)
    {
        $this->id = $id;
        $this->name = $name;
    }
}
