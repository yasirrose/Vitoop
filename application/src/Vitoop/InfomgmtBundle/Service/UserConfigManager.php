<?php

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Vitoop\InfomgmtBundle\Entity\UserConfig;

class UserConfigManager
{
    protected $em;

    protected $tokenStorage;

    public function __construct(ObjectManager $em, TokenStorageInterface $tokenStorage)
    {
        $this->em = $em;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @return  UserConfig;
     */
    public function getUserConfig()
    {

        $user = $this->tokenStorage->getToken()->getUser();
        $user_config = $user->getUserConfig();

        // If UserConfig doesn't exist, create it on the fly
        if (null === $user_config) {
            $user_config = new UserConfig($user);
            $this->em->persist($user_config);
            $this->em->flush();
        }

        return $user->getUserConfig();
    }

    public function setMaxPerPage($max_per_page)
    {
        $user_config = $this->getUserConfig();
        $user_config->setMaxPerPage($max_per_page);
        $this->em->persist($user_config);
        $this->em->flush();
    }
} 