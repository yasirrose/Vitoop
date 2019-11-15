<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;

/**
 * TeliRepository
 */
class TeliRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Teli::class;
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.author, r.url, r.isDownloaded, r.releaseDate.date as releaseDate');
        $this->prepareListQueryBuilder($qb, $search);

        if ($search->dateFrom) {
            $qb
                ->andWhere('r.releaseDate.order >= :dateFrom')
                ->setParameter('dateFrom', PublishedDate::generateOrderValue(PublishedDate::convertStringGreedy($search->dateFrom)));
        }
        if ($search->dateTo) {
            $qb
                ->andWhere('r.releaseDate.order <= :dateTo')
                ->setParameter('dateTo', PublishedDate::generateOrderValue(PublishedDate::createFromString($search->dateTo)));
        }

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