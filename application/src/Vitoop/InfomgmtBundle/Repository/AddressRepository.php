<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\Entity\Address;

/**
 * AddressRepository
 */
class AddressRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Address::class;
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.zip, r.city, r.street, co.code')
            ->join('r.country', 'co');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }
}