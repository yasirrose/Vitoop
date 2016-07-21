<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

class SearchColumns
{
    public $sortableColumn = null;
    public $sortableOrder = null;

    public $searchable = array();
    private $skippedColumns = ['coef'];

    public function __construct($columns = array(), $order = array())
    {
        foreach ($columns as $column) {
            if (in_array($column['data'], $this->skippedColumns)) {
                continue;
            }
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
