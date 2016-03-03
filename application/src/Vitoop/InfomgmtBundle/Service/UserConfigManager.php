<?php
/**
 * Created by PhpStorm.
 * User: Master-Tobi
 * Date: 16.04.14
 * Time: 22:19
 */

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Vitoop\InfomgmtBundle\Entity\UserConfig;

class UserConfigManager
{
    protected $em;

    protected $sc;

    public function __construct(ObjectManager $em, SecurityContextInterface $sc)
    {
        $this->em = $em;
        $this->sc = $sc;
    }

    /**
     * @return  UserConfig;
     */
    public function getUserConfig()
    {

        $user = $this->sc->getToken()
                         ->getUser();

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