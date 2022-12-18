<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\DTO\Resource\RemarkDTO;
use App\Entity\Remark;
use App\Entity\Resource;
use App\Entity\User\User;

class RemarkRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Remark::class);
    }

    public function getLatestRemark(Resource $resource)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('rem, u')
            ->from(Remark::class, 'rem')
            ->join('rem.user', 'u')
            ->where('rem.resource=:arg_resource')
            ->orderBy('rem.created_at', 'DESC')
            ->setParameter('arg_resource', $resource)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getAllRemarks(Resource $resource)
    {
        return $this->createQueryBuilder('r')
            ->where('r.resource =:resource')
            ->setParameter('resource', $resource)
            ->orderBy('r.created_at')
            ->getQuery()
            ->getResult();
    }

    public function getAllRemarksDTO(Resource $resource)
    {
        return $this->createQueryBuilder('r')
            ->select('NEW '.RemarkDTO::class.'(r.id, r.text, r.ip, r.locked, u.id, u.username, r.created_at)')
            ->leftJoin('r.user', 'u')
            ->where('r.resource =:resource')
            ->setParameter('resource', $resource)
            ->orderBy('r.created_at')
            ->getQuery()
            ->getResult();
    }

    public function getRemarkByUser(Resource $resource, User $user)
    {
        return $this->createQueryBuilder('r')
            ->select('r.id')
            ->where('r.user = :user')
            ->andWhere('r.resource = :resource')
            ->andWhere('r.ip is not null')
            ->setParameter('user', $user)
            ->setParameter('resource', $resource)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function save(Remark $remark)
    {
        $this->getEntityManager()->persist($remark);
        $this->getEntityManager()->flush();
    }
}
