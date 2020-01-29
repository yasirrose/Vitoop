<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * Class UserRepository
 * @package Vitoop\InfomgmtBundle\Repository
 */
class UserRepository extends ServiceEntityRepository
{
    /**
     * UserRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

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