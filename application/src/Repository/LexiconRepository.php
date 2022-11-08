<?php

namespace App\Repository;

use App\DTO\Resource\SearchResource;
use App\Entity\Lexicon;

/**
 * LexiconRepository
 */
class LexiconRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Lexicon::class;
    }

    public function getLexiconWithWikiRedirects($id)
    {
        $result = $this->getEntityManager()
                       ->createQuery('SELECT l, wr
                                   FROM ' . $this->getEntityName() . ' l
                                   LEFT JOIN l.wiki_redirects wr
                                   WHERE l.id=:arg_id')
                       ->setParameter('arg_id', $id)
                       ->getResult();

        return array_shift($result);
    }

    public function getLexiconByWikiPageId($wiki_page_id)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT l FROM ' . $this->getEntityName() . ' l WHERE l.wiki_page_id=:arg_wpid')
                    ->setParameter('arg_wpid', $wiki_page_id)
                    ->getResult();
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.wiki_fullurl as url');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }

    protected function getDividerQuery()
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.url, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead
              FROM (
               %s
               UNION ALL
               SELECT null as url, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, prd.id, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
              AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join lexicon lex on lex.id = rrr.id_resource2
                          left JOIN flag flex ON lex.id = flex.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND flex.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}