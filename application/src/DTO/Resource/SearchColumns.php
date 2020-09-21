<?php

namespace App\DTO\Resource;

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
                $this->searchable[] = $this->getSearchableColumnnName($column['data']);
            }
        }
        if (!$order) {
            return;
        }
        $order = reset($order);
        if (false !== $order['column']) {
            $this->sortableColumn = $this->getColumnName($columns[$order['column']]['data']);
            $this->sortableOrder = $order['dir'];
        }
    }

    /**
     * @param $columnName
     * @return string
     */
    private function getColumnName($columnName) : string
    {
        if (in_array($columnName,['pdfDate', 'releaseDate'])) {
            return $columnName.'.order';
        }

        return $columnName;
    }

    /**
     * @param $columnName
     * @return string
     */
    private function getSearchableColumnnName($columnName) : string
    {
        if (in_array($columnName,['pdfDate', 'releaseDate'])) {
            return $columnName.'.date';
        }

        return $columnName;
    }
}
