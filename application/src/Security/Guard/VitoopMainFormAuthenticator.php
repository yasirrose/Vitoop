<?php

namespace App\Security\Guard;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\PasswordUpgradeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

/**
 * Class VitoopMainFormAuthenticator
 * @package Vitoop\InfomgmtBundle\Service\Security\Guard
 */
class VitoopMainFormAuthenticator extends AbstractLoginFormAuthenticator
{
    const PROVIDER_KEY_PREFIX = 'vitoop_';

    use TargetPathTrait;

    private UserProviderInterface $userProvider;

    public function __construct(UserProviderInterface $userProvider)
    {
        $this->userProvider = $userProvider;
    }

    /**
     * @inheritDoc
     */
    public function supports(Request $request): bool
    {
        return $request->isMethod('POST') &&
            $this->getLoginUrl($request) === $request->getBaseUrl().$request->getPathInfo() &&
            $request->request->get('_username') &&
            $request->request->get('_password');
    }

    /**
     * @inheritDoc
     */
    public function getCredentials(Request $request)
    {
        return [
            'username' => $request->request->get('_username'),
            'password' => $request->request->get('_password'),
        ];
    }

    public function authenticate(Request $request): Passport
    {
        $credentials = $this->getCredentials($request);

        $method = 'loadUserByIdentifier';
        $passport = new Passport(
            new UserBadge($credentials['username'], [$this->userProvider, $method]),
            new PasswordCredentials($credentials['password']),
            [new RememberMeBadge()]
        );
        if ($this->userProvider instanceof PasswordUpgraderInterface) {
            $passport->addBadge(new PasswordUpgradeBadge($credentials['password'], $this->userProvider));
        }

        return $passport;
    }

    /**
     * @inheritDoc
     */
    protected function getLoginUrl(Request $request): string
    {
        return '/login';
    }

    /**
     * @inheritDoc
     */
    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $path = null;

        // if the user hit a secure page and start() was called, this was
        // the URL they were on, and probably where you want to redirect to
        if ($request->getSession() instanceof SessionInterface) {
            $path = $this->getTargetPath($request->getSession(), self::PROVIDER_KEY_PREFIX . $firewallName);
        }

        if (!$path) {
            $path = '/link';
        }

        return new RedirectResponse($path);
    }
}
