<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Entity\Resource;

/**
 * FlagRepository
 */
class FlagRepository extends ServiceEntityRepository
{
    /**
     * FlagRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Flag::class);
    }

    public function getFlags(Resource $res)
    {
        return $this->getEntityManager()
            ->createQuery('SELECT f FROM VitoopInfomgmtBundle:Flag f WHERE f.resource=:arg_resource')
            ->setParameters(array('arg_resource' => $res))
            ->getResult();
    }

    public function findResourceFlagByUserAndType(Resource $resource, $userId, $type)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('f')
            ->from(Flag::class, 'f')
            ->where('f.resource = :resource')
            ->andWhere('f.user = :user')
            ->andWhere('f.type = :type')
            ->setParameter('resource', $resource)
            ->setParameter('user', $userId)
            ->setParameter('type', $type)
            ->getQuery()
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }
}
