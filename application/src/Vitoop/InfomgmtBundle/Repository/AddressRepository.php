<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * AddressRepository
 */
class AddressRepository extends ResourceRepository
{
    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.zip, r.city, r.street, r.country');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }
}