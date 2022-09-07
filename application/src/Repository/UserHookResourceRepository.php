<?php

namespace App\Repository;

use App\Entity\UserHookResource;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

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

    public function checkCorrectColor($color): bool
    {
        if(in_array($color, [UserHookResource::BLUE_COLOR,UserHookResource::CYAN_COLOR, UserHookResource::LIME_COLOR, UserHookResource::RED_COLOR, UserHookResource::YELLOW_COLOR, UserHookResource::ORANGE_COLOR])) {
            return true;
        }
        else {
            return false;
        }
    }
}