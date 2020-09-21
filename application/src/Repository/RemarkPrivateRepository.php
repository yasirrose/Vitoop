<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\DTO\Resource\RemarkPrivateDTO;
use App\Entity\RemarkPrivate;
use App\Entity\Resource;
use App\Entity\User\User;

/**
 * RemarkPrivateRepository
 */
class RemarkPrivateRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, RemarkPrivate::class);
    }

    public function getPrivateRemarkDTO(Resource $resource, User $user)
    {
        return $this->createQueryBuilder('pr')
            ->select('NEW '.RemarkPrivateDTO::class.'(pr.id, pr.text, u.id, u.username, pr.created_at)')
            ->leftJoin('pr.user', 'u')
            ->where('pr.resource = :resource')
            ->andWhere('pr.user = :user')
            ->setParameter('resource', $resource)
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    public function getUserRemarkForResource(Resource $resource, User $user)
    {
        return $this->findOneBy(['user' => $user, 'resource' => $resource]);
    }

    public function save(RemarkPrivate $remark)
    {
        $this->getEntityManager()->persist($remark);
        $this->getEntityManager()->flush();
    }
}
