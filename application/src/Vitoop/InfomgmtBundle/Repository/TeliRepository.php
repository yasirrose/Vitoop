<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Paging;
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
        if (null === $search->columns->sortableColumn) {
            $qb
                ->addOrderBy('r.created_at', 'DESC');
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

    protected function getDividerQuery()
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.author, base.url, base.isDownloaded, base.releaseDate, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead
              FROM (
               %s
               UNION ALL
               SELECT null as author, null as url, null as isDownloaded, null as releaseDdate, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
              AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join teli t on t.id = rrr.id_resource2
                          left JOIN flag ft ON t.id = ft.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND ft.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}