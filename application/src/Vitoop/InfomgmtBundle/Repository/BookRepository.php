<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * BookRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class BookRepository extends ResourceRepository
{
    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')->select('r.author, r.tnop');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }
}