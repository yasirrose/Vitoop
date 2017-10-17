<?php

namespace Vitoop\InfomgmtBundle\Service;

use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Vitoop\InfomgmtBundle\Entity\UserConfig;
use Vitoop\InfomgmtBundle\Repository\UserConfigRepository;

class UserConfigManager
{
    /**
     * @var TokenStorageInterface
     */
    protected $tokenStorage;

    /**
     * @var UserConfigRepository
     */
    protected $userConfigRepository;

    public function __construct(
        UserConfigRepository $userConfigRepository,
        TokenStorageInterface $tokenStorage
    ) {
        $this->userConfigRepository = $userConfigRepository;
        $this->tokenStorage = $tokenStorage;
    }

    /**
     * @return  UserConfig;
     */
    public function getUserConfig()
    {
        $user = $this->tokenStorage->getToken()->getUser();
        $userConfig = $user->getUserConfig();

        // If UserConfig doesn't exist, create it on the fly
        if (null === $userConfig) {
            $userConfig = new UserConfig($user);
            $this->userConfigRepository->save($userConfig);
        }

        return $userConfig;
    }

    /**
     * @param $maxPerPage
     */
    public function setMaxPerPage($maxPerPage)
    {
        $userConfig = $this->getUserConfig();
        $userConfig->setMaxPerPage($maxPerPage);
        $this->userConfigRepository->save($userConfig);
    }

    public function setIsCheckMaxLinkForOpen($property)
    {
        $userConfig = $this->getUserConfig();
        $userConfig->setIsCheckMaxLink($property);
        $this->userConfigRepository->save($userConfig);
    }
} 