<?php

namespace Vitoop\InfomgmtBundle\DTO;

class Paging
{
    public $offset;

    public $limit;

    public function __construct($offset, $limit)
    {
        $this->offset = $offset;
        $this->limit = $limit;
    }
}
