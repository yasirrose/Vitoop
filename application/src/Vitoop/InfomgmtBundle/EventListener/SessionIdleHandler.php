<?php

namespace Vitoop\InfomgmtBundle\EventListener;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Event\GetResponseEvent;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;

/**
 * Class SessionIdleHandler
 * @package Vitoop\InfomgmtBundle\EventListener
 */
class SessionIdleHandler
{
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var SessionInterface
     */
    private $session;

    /**
     * @var RouterInterface
     */
    private $router;

    /**
     * @var int
     */
    private $maxIdleTime = 0;

    /**
     * SessionIdleHandler constructor.
     * @param TokenStorageInterface $tokenStorage
     * @param SessionInterface $session
     * @param RouterInterface $router
     * @param int $maxIdleTime
     */
    public function __construct(
        TokenStorageInterface $tokenStorage,
        SessionInterface $session,
        RouterInterface $router,
        int $maxIdleTime
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->session = $session;
        $this->router = $router;
        $this->maxIdleTime = $maxIdleTime;
    }

    /**
     * @param GetResponseEvent $event
     */
    public function onKernelRequest(GetResponseEvent $event)
    {
        if (!$event->isMasterRequest()) {
            return;
        }
        if ($this->maxIdleTime > 0) {
            $this->session->start();
            $lapse = time() - $this->session->get('manualLastUsedTime', time());
            if ($lapse > $this->maxIdleTime && null !== $this->tokenStorage->getToken()) {
                $this->tokenStorage->setToken(null);
                if ($event->getRequest()->isXmlHttpRequest()) {
                    $event->setResponse(new JsonResponse(new ErrorResponse(['Session expired']), 401));
                } else {
                    $event->setResponse(new RedirectResponse($this->router->generate('userhome')));
                }
                $this->session->clear();
            } else {
                $this->session->set('manualLastUsedTime', time());
            }
        }
    }
}
