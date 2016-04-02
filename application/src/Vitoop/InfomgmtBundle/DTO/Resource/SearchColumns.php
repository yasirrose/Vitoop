<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

class SearchColumns
{
    public $sortableColumn = null;
    public $sortableOrder = null;

    public $searchable = array();

    public function __construct($columns = array(), $order = array())
    {
        foreach ($columns as $column) {
            if ('true' === $column['searchable']) {
                $this->searchable[] = $column['data'];
            }
        }
        if (!$order) {
            return;
        }
        $order = reset($order);
        if (false !== $order['column']) {
            $this->sortableColumn = $columns[$order['column']]['data'];
            $this->sortableOrder = $order['dir'];
        }
    }
}
