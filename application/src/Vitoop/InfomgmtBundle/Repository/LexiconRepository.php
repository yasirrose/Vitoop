<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * LexiconRepository
 */
class LexiconRepository extends ResourceRepository
{
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
}