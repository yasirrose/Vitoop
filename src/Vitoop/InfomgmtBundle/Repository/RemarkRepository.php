<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Symfony\Component\Security\Core\User\UserInterface;

use Vitoop\InfomgmtBundle\Entity\Resource;

use Doctrine\ORM\EntityRepository;

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
}
