<?php
namespace App\Doctrine\Walkers;

use Doctrine\ORM\Query\SqlWalker;

class MysqlPaginationWalker extends SqlWalker
{
    /**
    * Walks down a SelectClause AST node, thereby generating the appropriate SQL.
    *
    * @param $selectClause
    * @return string The SQL.
    */
    public function walkSelectClause($selectClause)
    {
        $sql = parent::walkSelectClause($selectClause);

        if ($this->getQuery()->getHint('mysqlWalker.sqlCalcFoundRows') === true) {
            if ($selectClause->isDistinct) {
                $sql = str_replace('SELECT DISTINCT', 'SELECT DISTINCT SQL_CALC_FOUND_ROWS', $sql);
                $sql = str_replace('(SELECT DISTINCT SQL_CALC_FOUND_ROWS', '(SELECT DISTINCT ', $sql);
            } else {
                $sql = str_replace('SELECT', 'SELECT SQL_CALC_FOUND_ROWS', $sql);
                $sql = str_replace('(SELECT SQL_CALC_FOUND_ROWS', '(SELECT', $sql);
            }
        }

        return $sql;
    }
}
