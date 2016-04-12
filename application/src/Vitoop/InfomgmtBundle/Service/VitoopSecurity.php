<?php

namespace Vitoop\InfomgmtBundle\Service;

use Symfony\Component\Security\Core\Authorization\Voter\AuthenticatedVoter;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Vitoop\InfomgmtBundle\Entity\Resource;

class VitoopSecurity
{
    protected $tokenStorage;
    
    protected $authChecker;

    protected $decisions;

    /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
    protected $res;

    public function __construct(
        TokenStorageInterface $tokenStorage,
        AuthorizationCheckerInterface $authChecker
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->authChecker = $authChecker;
        $this->decisions = array();
        $this->res = null;
    }

    public function setResource(Resource $res)
    {
        if ($this->hasResource()) {
            throw new \Exception('The Resource is already set for security reasons');
        }
        if (null === $res) {
            throw new \Exception('You can\'t load VitoopSecurity with null. Please provide a valid Resource!');
        }

        $this->res = $res;
    }

    public function hasResource()
    {
        return (null !== $this->res);
    }

    //@TODO not yet used, no usecase known at the moment
    public function isViewer()
    {
        if (!isset ($this->decisions['is_read_only'])) {
            $this->decisions['is_read_only'] = !$this->authChecker->isGranted(AuthenticatedVoter::IS_AUTHENTICATED_REMEMBERED);
        }

        return $this->decisions['is_read_only'];
    }

    public function isUser()
    {
        if (!isset ($this->decisions['is_user'])) {
            $this->decisions['is_user'] = $this->authChecker->isGranted('ROLE_USER');
        }

        return $this->decisions['is_user'];
    }

    public function isOwner()
    {
        if (!$this->hasResource()) {
            return false;
        }
        if (!isset ($this->decisions['is_owner'])) {
            if ($this->getUser() instanceof UserInterface) {
                $this->decisions['is_owner'] = $this->res->getUser()
                                                         ->isEqualTo($this->getUser());
            } else {
                $this->decisions['is_owner'] = false;
            }
        }

        return $this->decisions['is_owner'];
    }

    public function isAdmin()
    {
        if (!isset ($this->decisions['is_admin'])) {
            $this->decisions['is_admin'] = $this->authChecker->isGranted('ROLE_ADMIN');
        }

        return $this->decisions['is_admin'];
    }

    public function isEqualToCurrentUser($user)
    {
        if (!$user instanceof UserInterface) {
            return false;
        }
        if ($this->getUser() instanceof UserInterface) {
            return $user->isEqualTo($this->getUser());
        }

        return false;
    }

    public function getUser()
    {
        return $this->tokenStorage->getToken()->getUser();
    }
}