<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * LinkRepository
 */
class LinkRepository extends ResourceRepository
{
    public function getResources(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.is_hp, r.url');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb->getQuery()->getResult();
    }
}