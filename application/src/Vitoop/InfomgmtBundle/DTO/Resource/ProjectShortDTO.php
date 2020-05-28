<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

class ProjectShortDTO
{
    public $id;

    public $name;

    /**
     * ProjectShortDTO constructor.
     * @param int|null $id
     * @param string|null $name
     */
    public function __construct($id = null, $name = null)
    {
        $this->id = $id;
        $this->name = $name;
    }
}
