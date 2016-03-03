<?php

namespace Vitoop\InfomgmtBundle\Pagination;

use Doctrine\ORM\Query\AST\InstanceOfExpression;

use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\AdapterInterface;
use Pagerfanta\Adapter\DoctrineORMAdapter;

use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query;
use Doctrine\ORM\NoResultException;

class ResourceListWithTagCountAdapter extends DoctrineORMAdapterDecorator
{
    private $merge_query;

    private $avgmark_query;

    /**
     * Sets the Additonal Query adding 'fields' in the original result and don't
     * change the number of results.
     * The result is an array of objects/entities which have the scalar parts of the query set as properties in the
     * entity. And as a bonus the array is indexed by the ids.
     *
     * @param \Doctrine\ORM\QueryBuilder $qb
     *           A Doctrine ORM query builder.
     */

    public function setMergeQuery(QueryBuilder $merge_query)
    {
        $this->merge_query = $merge_query;
    }

    public function setAvgmarkQuery(QueryBuilder $avgmark_query)
    {
        $this->avgmark_query = $avgmark_query;
    }

    /**
     * {@inheritdoc}
     */
    public function getSlice($offset, $length)
    {

        $slice = $this->adapter->getSlice($offset, $length);
        $arr_1 = array();
        $arr_ids = array();
        foreach ($slice as $val) {
            $arr_1[$val[0]->getId()] = $val[0];
            $arr_ids[] = $val[0]->getId();
        }
        $slice = $arr_1;
        if (!empty($arr_ids)) {
            // AVG(mark)...
            $alias = $this->avgmark_query->getRootAliases();
            $alias = $alias[0];
            $this->avgmark_query->andWhere($this->avgmark_query->expr()
                                                               ->in($alias, ':ids'))
                                ->setParameter('ids', $arr_ids);

            $avgmark_result = $this->avgmark_query->getQuery()
                                                  ->getArrayResult();
            // var_dump($arr_ids);
            // var_dump($avgmark_result);
            // die();
            foreach ($avgmark_result as $val) {
                $slice[$val['id']]->setAvgmark($val['avgmark']);
            }
        }
        //
        If ($this->merge_query instanceof QueryBuilder) {

            // Execute the merge-query and merge the resultset into the existing one
            // Skip if there is no resultset (i.e. empty id-array)
            // Skipping evades an error in old doctrine version see www.doctrine-project.org/jira/browse/DDC-1977
            if (!empty($arr_ids)) {
                $alias = $this->merge_query->getRootAliases();
                $alias = $alias[0];
                $this->merge_query->andWhere($this->merge_query->expr()
                                                               ->in($alias, ':ids'))
                                  ->setParameter('ids', $arr_ids);

                $merge_result = $this->merge_query->getQuery()
                                                  ->getResult();
                foreach ($merge_result as $val) {
                    $slice[$val['id']]->setRes12count($val['res12count']);
                }
            }
        } else {
            throw new \Exception('ResourceListAdapter is used without $merge_query!');
        }

        return new \ArrayIterator($slice);
    }
}