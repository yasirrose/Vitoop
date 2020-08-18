<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

use Vitoop\InfomgmtBundle\DTO\Resource\RelResourceDTO;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * RelResourceResourceRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RelResourceResourceRepository extends EntityRepository
{
    /**
     * @param RelResourceResource $relation
     */
    public function add(RelResourceResource $relation)
    {
        $this->_em->persist($relation);
    }

    /**
     * @param RelResourceResource $relation
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function save()
    {
        $this->_em->flush();
    }

    public function getOneFirstRel(Resource $resource1, Resource $resource2)
    {
        return $this->createQueryBuilder('r')
            ->select('r')
            ->where('r.resource1 = :resource1')
            ->andWhere('r.resource2 = :resource2')
            ->andWhere('r.deletedByUser IS NULL')
            ->setParameter('resource1', $resource1)
            ->setParameter('resource2', $resource2)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getCountOfAddedResources($userID, $resourceID)
    {
        return $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->where('r.resource2 = :resourceID')
            ->andWhere('r.user = :userID')
            ->setParameter('resourceID', $resourceID)
            ->setParameter('userID', $userID)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function getCountOfRemovedResources($userID, $resourceID)
    {
        return $this->createQueryBuilder('r')
            ->select('count(r.id)')
            ->where('r.resource2 = :resourceID')
            ->andWhere('r.deletedByUser = :userID')
            ->setParameter('resourceID', $resourceID)
            ->setParameter('userID', $userID)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function getCoefficients(Project $project)
    {
        return $this->createQueryBuilder('rrr')
            ->select('res.id as res_id')
            ->addSelect('rrr.id as rel_id')
            ->addSelect('rrr.coefficient as coefficient')
            ->innerJoin('rrr.resource2', 'res')
            ->where('rrr.resource1 =:project')
            ->setParameter('project', $project)
            ->getQuery()
            ->getResult();
    }

    public function exists(RelResourceResource $rrr)
    {
        return $this
            ->getRelResourceQueryBuilder(
                $rrr->getResource1()->getId(),
                $rrr->getResource2()->getId(),
                $rrr->getUser()->getId()
            )
            ->select('rrr.id')
            ->getQuery()
            ->getResult();
    }

    public function getAllAssignmentsDTO($resourceId, $userId)
    {
        return $this->createQueryBuilder('r')
            ->select('NEW '.RelResourceDTO::class.'(r.id, IDENTITY(r.resource1),  IDENTITY(r.resource2), r.coefficient, IDENTITY(r.user))')
            ->where('r.resource1 = :resourceId')
            ->andWhere('r.user = :userId')
            ->setParameter('resourceId', $resourceId)
            ->setParameter('userId', $userId)
            ->getQuery()
            ->getResult();
    }

    public function getRelResource($resource1Id, $resource2Id, $userId)
    {
        return $this
            ->getRelResourceQueryBuilder($resource1Id, $resource2Id, $userId)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findRelatedCoefficients($resource1Id, $coeff)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('rrr')
            ->from(RelResourceResource::class, 'rrr')
            ->andWhere('rrr.resource1=:resource1')
            ->andWhere('rrr.coefficient LIKE :coffExpression OR rrr.coefficient = :coeff')
            ->setParameter('resource1', $resource1Id)
            ->setParameter('coffExpression', $coeff .'.%')
            ->setParameter('coeff', $coeff)
            ->getQuery()
            ->getResult();
    }

    private function getRelResourceQueryBuilder($resource1Id, $resource2Id, $userId)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('rrr')
            ->from(RelResourceResource::class, 'rrr')
            ->andWhere('rrr.resource1=:arg_resource1')
            ->andWhere('rrr.resource2=:arg_resource2')
            ->andWhere('rrr.user=:arg_user2')
            ->setParameter('arg_resource1', $resource1Id)
            ->setParameter('arg_resource2', $resource2Id)
            ->setParameter('arg_user2', $userId);
    }
}
