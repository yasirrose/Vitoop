<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * WikiRedirectRepository
 */
class WikiRedirectRepository extends EntityRepository
{
    public function getByWikiPageId($wiki_page_id)
    {

        return $this->getEntityManager()
                    ->createQuery('SELECT wr FROM VitoopInfomgmtBundle:WikiRedirect wr WHERE wr.wiki_page_id=:arg_wiki_page_id')
                    ->setParameter('arg_wiki_page_id', $wiki_page_id)
                    ->getOneOrNullResult();
    }
}