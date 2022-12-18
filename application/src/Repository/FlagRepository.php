<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\DTO\Resource\FlagDTO;
use App\Entity\Flag;
use App\Entity\Resource;

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
        $flags = $this->getEntityManager()
            ->createQuery('SELECT f FROM App\Entity\Flag f WHERE f.resource=:arg_resource')
            ->setParameters(array('arg_resource' => $res))
            ->getResult();

        if (empty($flags)) {
            return null;
        }

        return $flags;
    }

    public function getFlagDTO(Resource $resource)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('NEW '. FlagDTO::class.'(f.id, f.type, f.info, f.created_at, u.id, u.username)')
            ->from(Flag::class, 'f')
            ->leftJoin('f.user', 'u')
            ->where('f.resource = :arg_resource')
            ->setParameter('arg_resource', $resource)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
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

    public function doUnblame(Resource $resource)
    {
        $this->createQueryBuilder('f')
            ->delete()
            ->where('f.resource = :resource')
            ->andWhere('f.type = :type')
            ->setParameter('resource', $resource)
            ->setParameter('type', Flag::FLAG_BLAME)
            ->getQuery()
            ->execute();
    }

    public function save(Flag $flag)
    {
        $this->getEntityManager()->persist($flag);
        $this->getEntityManager()->flush();
    }

    public function remove(Flag $flag)
    {
        $this->getEntityManager()->remove($flag);
        $this->getEntityManager()->flush();
    }
}
