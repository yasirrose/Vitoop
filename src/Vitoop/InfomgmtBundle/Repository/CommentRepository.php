<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

use Doctrine\ORM\EntityRepository;

/**
 * CommentRepository
 */

/**
 *
 * @author tweini
 */
class CommentRepository extends EntityRepository
{
    public function getAllCommentsFromResource(Resource $resource)
    {

        $comments = $this->getEntityManager()
                         ->createQuery('SELECT c, partial u.{id, username} FROM VitoopInfomgmtBundle:Comment c  LEFT JOIN c.user u WHERE c.resource=:arg_resource')
                         ->setParameter('arg_resource', $resource)
                         ->getResult();

        return $comments;
    }
}