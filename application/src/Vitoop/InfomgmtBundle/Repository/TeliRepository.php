<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * TeliRepository
 */
class TeliRepository extends ResourceRepository
{
    public function getResources(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')->select('r.author, r.url');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb->getQuery()->getResult();
    }
}