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
}