<?php

namespace App\Repository;

use App\Entity\WikiRedirect;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

use App\Entity\Resource;
use App\Entity\Tag;
use App\Entity\User\User;

/**
 * WikiRedirectRepository
 */
class WikiRedirectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, WikiRedirect::class);
    }

    public function getByWikiPageId($wiki_page_id)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT wr FROM App\Entity\WikiRedirect wr WHERE wr.wiki_page_id=:arg_wiki_page_id')
                    ->setParameter('arg_wiki_page_id', $wiki_page_id)
                    ->getOneOrNullResult();
    }
}