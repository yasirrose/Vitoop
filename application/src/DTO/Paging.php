<?php

namespace App\DTO;

class Paging
{
    const DEFAULT_LIMIT = 7;

    public $offset;

    public $limit;

    public function __construct($offset, $limit)
    {
        $this->offset = $offset;
        $this->limit = $limit < 1 ? self::DEFAULT_LIMIT : $limit;
    }
}
