<?php

namespace App\Pagination;

use Doctrine\ORM\Query\AST\InstanceOfExpression;

use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\AdapterInterface;
use Pagerfanta\Adapter\DoctrineORMAdapter;

use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Query;
use Doctrine\ORM\NoResultException;

class ResourceListAdapter extends DoctrineORMAdapterDecorator
{
    private $merge_query;

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

    /**
     * {@inheritdoc}
     */
    public function getSlice($offset, $length)
    {

        $slice = $this->adapter->getSlice($offset, $length);

        If ($this->merge_query instanceof QueryBuilder) {
            // Transform the resultset:
            // 1. copy the key 'avgmark' to the Entity-Object stored in index 0
            // 2. copy the Entity-Object stored in index 0 to an id-indexed array (arr_1) without re-sorting it, so objects
            // can easily accessed by id
            // 3. storing the ids ina an array arr_id for later restrict the query to these ids from the resultset.
            // 4. Assign $slice to the transformed arr_1 which is id-indexed an the 'avgmark' property set in the objects
            $arr_1 = array();
            $arr_ids = array();
            foreach ($slice as $val) {
                $val[0]->setAvgmark($val['avgmark']);
                $arr_1[$val[0]->getId()] = $val[0];
                $arr_ids[] = $val[0]->getId();
            }
            $slice = $arr_1;

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