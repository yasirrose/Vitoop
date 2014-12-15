<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * RelResourceResourceRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class RelResourceResourceRepository extends EntityRepository
{
    public function exists(RelResourceResource $rrr)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT rrr.id FROM Vitoop\InfomgmtBundle\Entity\RelResourceResource rrr
            WHERE rrr.resource1=:arg_resource1 AND rrr.resource2=:arg_resource2 AND rrr.user=:arg_user')
                    ->setParameters(array(
                'arg_resource1' => $rrr->getResource1(),
                'arg_resource2' => $rrr->getResource2(),
                'arg_user' => $rrr->getUser()
            ))
                    ->getResult();
    }
}