<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Symfony\Component\Security\Core\User\UserInterface;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\Entity\User;

class RemarkRepository extends EntityRepository
{
    public function getLatestRemark(Resource $resource)
    {
        return $this->getEntityManager()
            ->createQueryBuilder()
            ->select('rem, u')
            ->from('VitoopInfomgmtBundle:Remark', 'rem')
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
}
