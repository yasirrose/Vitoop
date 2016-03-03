<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

class UserRepository extends EntityRepository
{
    public function usernameExistsOrEmailExists($username, $email)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT u FROM VitoopInfomgmtBundle:User u WHERE u.username=:arg_username OR u.email=:arg_email')
                    ->setparameters(array('arg_username' => $username, 'arg_email' => $email))
                    ->getResult();
    }

    public function getNames($like, $currentUserID, $ownerID)
    {
        return $this->createQueryBuilder('u')
            ->select('u.id')
            ->addSelect('u.username')
            ->where('u.username LIKE :like')
            ->andWhere('u.id != :currentID')
            ->andWhere('u.id != :ownerID')
            ->setParameter('like', $like.'%')
            ->setParameter('currentID', $currentUserID)
            ->setParameter('ownerID', $ownerID)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }
}