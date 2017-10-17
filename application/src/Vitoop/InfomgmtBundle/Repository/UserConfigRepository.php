<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\Entity\UserConfig;

class UserConfigRepository extends EntityRepository
{
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