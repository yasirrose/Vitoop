<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Entity\RelResourceTag;
use App\Entity\Resource;
use App\Entity\Tag;

/**
 * RelResourceTagRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RelResourceTagRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RelResourceTag::class);
    }

    /**
     * @param RelResourceTag $relation
     */
    public function add(RelResourceTag $relation)
    {
        $this->_em->persist($relation);
    }

    public function getOneFirstRel(Tag $tag, Resource $resource)
    {
        return $this->createQueryBuilder('r')
            ->where('r.tag = :tag')
            ->andWhere('r.resource = :resource')
            ->setParameter('tag', $tag->getId())
            ->setParameter('resource', $resource->getId())
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getCountOfAddedTags($userID, $resourceID)
    {
        return $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->where('r.resource = :resourceID')
            ->andWhere('r.user = :userID')
            ->setParameter('resourceID', $resourceID)
            ->setParameter('userID', $userID)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function getCountOfRemovedTags($userID, $resourceID)
    {
        return $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->where('r.resource = :resourceID')
            ->andWhere('r.deletedByUser = :userID')
            ->setParameter('resourceID', $resourceID)
            ->setParameter('userID', $userID)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function exists(RelResourceTag $rrt)
    {
        return $this->createQueryBuilder('rrt')
            ->where('rrt.resource = :resource')
            ->andWhere('rrt.tag = :tag')
            ->andWhere('rrt.user = :user')
            ->setParameter('resource',$rrt->getResource())
            ->setParameter('tag', $rrt->getTag())
            ->setParameter('user', $rrt->getUser())
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function removeTagRelationByTagId($tagId)
    {
        $this->createQueryBuilder('rrt')
            ->delete()
            ->where('rrt.tag = :tag')
            ->setParameter('tag', $tagId)
            ->getQuery()
            ->execute();
    }
}
