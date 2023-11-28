<?php

namespace App\Repository;

use App\Entity\UserHookResource;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserHookResourceRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserHookResource::class);
    }

    public function save(UserHookResource $userHookResource)
    {
        $this->getEntityManager()->persist($userHookResource);
        $this->getEntityManager()->flush();
    }
}
