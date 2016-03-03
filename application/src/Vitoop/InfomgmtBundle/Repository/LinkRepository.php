<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * LinkRepository
 */
class LinkRepository extends ResourceRepository
{
    public function getResources($flagged = false, $resource = null, $arr_tags = array(), $arr_tags_ignore = array(), $arr_tags_highlight = array(), $tag_cnt = 0)
    {
        $qb = $this->createQueryBuilder('r');
        $qb->select('r.is_hp', 'r.url');
        $this->prepareListQueryBuilder($qb, $flagged);
        if (!is_null($resource)) {
            $this->prepareListByResourceQueryBuilder($qb, $resource);
        } elseif (!empty($arr_tags)) {
            $this->prepareListByTagsQueryBuilder($qb, $arr_tags, $arr_tags_highlight, $arr_tags_ignore, $tag_cnt);
        }

        return $qb->getQuery()->getResult();
    }
}