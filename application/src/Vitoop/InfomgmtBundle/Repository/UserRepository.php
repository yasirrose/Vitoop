<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\Entity\User;

class UserRepository extends EntityRepository
{
    /**
     * @param User $user
     */
    public function add(User $user)
    {
        $this->getEntityManager()->persist($user);
    }

    public function findOneByUsernameOrEmail($username, $email)
    {
        return $this->createQueryBuilder('u')
            ->where('u.username=:username OR u.email=:email')
            ->setParameters([
                'username' => $username,
                'email' => $email
            ])
            ->getQuery()
            ->getOneOrNullResult();
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

    public function findByResetToken($resetToken)
    {
        if (empty($resetToken)) {
            return null;
        }

        return $this->createQueryBuilder('u')
            ->where('u.resetPasswordToken IS NOT NULL')
            ->andWhere("u.resetPasswordToken = :token")
            ->setParameter('token', $resetToken)
            ->getQuery()
            ->getOneOrNullResult();
    }
}