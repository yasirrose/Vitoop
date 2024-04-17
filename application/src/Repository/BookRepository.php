<?php

namespace App\Repository;

use App\DTO\Resource\SearchResource;
use App\Entity\Book;

/**
 * BookRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class BookRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Book::class;
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')->select('r.author, r.tnop');
        $this->prepareListQueryBuilder($qb, $search);

        if ($search->art) {
            $qb
                ->andWhere('r.kind = :art')
                ->setParameter('art', $search->art);
        }


        return $qb;
    }

    protected function getDividerQuery(): string
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.author, base.tnop, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead, base.color
              FROM (
               %s
               UNION ALL
               SELECT null as author, null as tnop, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, null as color, null as city1, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
                AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join book b on b.id = rrr.id_resource2
                          left JOIN flag fbook ON b.id = fbook.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND fbook.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}