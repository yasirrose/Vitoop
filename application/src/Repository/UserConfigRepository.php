<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User\UserConfig;

class UserConfigRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserConfig::class);
    }

    /**
     * @param UserConfig $userConfig
     */
    public function add(UserConfig $userConfig)
    {
        $this->_em->persist($userConfig);
    }

    /**
     * @param UserConfig $userConfig
     */
    public function save(UserConfig $userConfig)
    {
        $this->add($userConfig);
        $this->_em->flush($userConfig);
    }
}