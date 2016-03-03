<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Symfony\Component\Security\Core\User\UserInterface;

use Vitoop\InfomgmtBundle\Entity\Resource;

use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * RemarkRepository
 */
class RemarkRepository extends EntityRepository
{
    public function getLatestRemark(Resource $resource)
    {

        $result = $this->getEntityManager()
                       ->createQuery('SELECT rem, u FROM VitoopInfomgmtBundle:Remark rem JOIN rem.user u WHERE rem.resource=:arg_resource ORDER BY rem.created_at DESC')
                       ->setParameter('arg_resource', $resource)
                       ->getResult();

        return array_shift($result);
    }

    public function getAllRemarks(Resource $resource)
    {
        $query = $this->createQueryBuilder('r')
            ->where('r.resource =:resource')
            ->setParameter('resource', $resource)
            ->orderBy('r.created_at');

        return $query->getQuery()->getResult();
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
