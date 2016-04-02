<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * LinkRepository
 */
class LinkRepository extends ResourceRepository
{
    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.is_hp, r.url');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }
}