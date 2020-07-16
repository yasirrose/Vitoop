<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Vitoop\InfomgmtBundle\DTO\Resource\RemarkPrivateDTO;
use Vitoop\InfomgmtBundle\Entity\RemarkPrivate;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

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
