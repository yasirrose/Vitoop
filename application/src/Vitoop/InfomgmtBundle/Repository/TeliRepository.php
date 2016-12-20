<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * TeliRepository
 */
class TeliRepository extends ResourceRepository
{
    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.author, r.url, r.isDownloaded');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }

    public function getHTMLForDownloading($count, $missing)
    {
        $query = $this->createQueryBuilder('r')
            ->orderBy('r.created_at', 'ASC')
            ->setMaxResults($count);
        if (!$missing) {
            $query->where('r.isDownloaded = 0');
        } else {
            $query
                ->where('r.isDownloaded != 1')
                ->andWhere('r.isDownloaded != 0');
        }

        return $query
            ->getQuery()
            ->getResult();
    }
}