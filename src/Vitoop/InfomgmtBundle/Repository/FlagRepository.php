<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * FlagRepository
 */
class FlagRepository extends EntityRepository
{
    public function getFlags(Resource $res)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT f FROM VitoopInfomgmtBundle:Flag f WHERE f.resource=:arg_resource')
                    ->setParameters(array('arg_resource' => $res))
                    ->getResult();
    }
}