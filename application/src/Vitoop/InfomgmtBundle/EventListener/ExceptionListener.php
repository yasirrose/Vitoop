<?php

namespace Vitoop\InfomgmtBundle\EventListener;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Util\TargetPathTrait;
use Vitoop\InfomgmtBundle\Service\Security\Guard\VitoopMainFormAuthenticator;

class ExceptionListener
{
    use TargetPathTrait;

    /**
     * @var string
     */
    private $providerKey;

    /**
     * ExceptionListener constructor.
     * @param string $providerKey
     */
    public function __construct(string $providerKey)
    {
        $this->providerKey = $providerKey;
    }

    public function onKernelException(GetResponseForExceptionEvent $event)
    {
        $exception = $event->getException();
        if ($exception instanceof AuthenticationException || $exception instanceof AccessDeniedException) {
            $this->addRequestedRoute($event->getRequest());

            return;
        }
    }

    /**
     *
     * @param Request $request
     */
    private function addRequestedRoute(Request $request)
    {
        // session isn't required when using HTTP basic authentication mechanism for example
        if ($request->hasSession() && $request->isMethodSafe(false) && !$request->isXmlHttpRequest() && false === strpos($request->getPathInfo(), 'api')) {
            $this->saveTargetPath(
                $request->getSession(),
                VitoopMainFormAuthenticator::PROVIDER_KEY_PREFIX. $this->providerKey,
                $request->getUri()
            );
        }
    }
}