<?php

namespace Vitoop\InfomgmtBundle\Service\Security\Guard;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Guard\Authenticator\AbstractFormLoginAuthenticator;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Vitoop\InfomgmtBundle\Entity\User\PasswordEncoderInterface;

/**
 * Class VitoopMainFormAuthenticator
 * @package Vitoop\InfomgmtBundle\Service\Security\Guard
 */
class VitoopMainFormAuthenticator extends AbstractFormLoginAuthenticator
{
    const PROVIDER_KEY_PREFIX = 'vitoop_';

    use TargetPathTrait;

    /**
     * @var PasswordEncoderInterface
     */
    private $passwordEncoder;

    /**
     * VitoopMainFormAuthenticator constructor.
     * @param PasswordEncoderInterface $passwordEncoder
     */
    public function __construct(PasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
    }

    /**
     * @inheritDoc
     */
    public function getCredentials(Request $request)
    {
        if ($request->request->get('_username')) {
            return [
                'username' => $request->request->get('_username'),
                'password' => $request->request->get('_password'),
            ];
        }

        return null;
    }

    /**
     * @inheritDoc
     */
    public function getUser($credentials, UserProviderInterface $userProvider)
    {
        return $userProvider->loadUserByUsername($credentials['username']);
    }

    /**
     * @inheritDoc
     */
    public function checkCredentials($credentials, UserInterface $user)
    {
        return $this->passwordEncoder->isPasswordValid($user->getPassword(), $credentials['password'], $user->getSalt());
    }

    /**
     * @inheritDoc
     */
    protected function getLoginUrl()
    {
        return '/login';
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, $providerKey)
    {
        $path = null;

        // if the user hit a secure page and start() was called, this was
        // the URL they were on, and probably where you want to redirect to
        if ($request->getSession() instanceof SessionInterface) {
            $path = $this->getTargetPath($request->getSession(), self::PROVIDER_KEY_PREFIX . $providerKey);
        }

        if (!$path) {
            $path = '/link';
        }

        return new RedirectResponse($path);
    }
}
