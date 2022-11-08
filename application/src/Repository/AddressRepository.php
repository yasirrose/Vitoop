<?php

namespace App\Repository;

use App\DTO\Resource\SearchResource;
use App\Entity\Address;

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

    protected function getDividerQuery()
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.zip, base.city, base.street, base.code, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead
              FROM (
               %s
               UNION ALL
               SELECT null as zip, null as city, null as street, null as code, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, prd.id, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
              AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join address adr on adr.id = rrr.id_resource2
                          left JOIN flag fadr ON adr.id = fadr.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND fadr.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}