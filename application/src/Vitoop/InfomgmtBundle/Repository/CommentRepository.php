<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use Doctrine\ORM\EntityRepository;

class CommentRepository extends EntityRepository
{
    public function getAllCommentsFromResource(Resource $resource)
    {
        return $this->getAllCommentsQuery($resource)
            ->getQuery()
            ->getResult();
    }

    public function getAllVisibleCommentsFromResource(Resource $resource)
    {
        return $this->getAllCommentsQuery($resource)
            ->andWhere('c.isVisible = :isVisible')
            ->setParameter('isVisible', true)
            ->getQuery()
            ->getResult();
    }

    private function getAllCommentsQuery(Resource $resource)
    {
        return $this->getEntityManager()->createQueryBuilder()
            ->select('c, partial u.{id, username}')
            ->from('VitoopInfomgmtBundle:Comment', 'c')
            ->leftJoin('c.user', 'u')
            ->where('c.resource=:arg_resource')
            ->setParameter('arg_resource', $resource);
    }
}