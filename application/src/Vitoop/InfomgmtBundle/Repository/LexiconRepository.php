<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

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

    public function getResources($flagged = false, $resource = null, $arr_tags = array(), $arr_tags_ignore = array(), $arr_tags_highlight = array(), $tag_cnt = 0)
    {
        $qb = $this->createQueryBuilder('r');
        $qb->select('r.wiki_fullurl as url');
        $this->prepareListQueryBuilder($qb, $flagged);
        if (!is_null($resource)) {
            $this->prepareListByResourceQueryBuilder($qb, $resource);
        } elseif (!empty($arr_tags)) {
            $this->prepareListByTagsQueryBuilder($qb, $arr_tags, $arr_tags_highlight, $arr_tags_ignore, $tag_cnt);
        }

        return $qb->getQuery()->getResult();
    }
}