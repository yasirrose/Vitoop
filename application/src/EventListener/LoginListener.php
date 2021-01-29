<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Security\Core\Authentication\Token\RememberMeToken;
use Symfony\Component\Security\Http;
use Symfony\Component\HttpKernel;
use Symfony\Component\HttpFoundation\Cookie;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\UserConfigManager;

class LoginListener
{
    protected $eventDispatcher;
    protected $entityManager;
    protected $ucm;

    public function __construct(
        UserConfigManager $ucm,
        EntityManagerInterface $entityManager,
        EventDispatcherInterface $eventDispatcher
    ) {
        $this->ucm = $ucm;
        $this->entityManager = $entityManager;
        $this->eventDispatcher = $eventDispatcher;
    }

    public function onInteractiveLogin(Http\Event\InteractiveLoginEvent $event)
    {
        $user = $event->getAuthenticationToken()->getUser();
        $user->login();
        $this->entityManager->flush();

        if ($event->getAuthenticationToken() instanceof RememberMeToken) {
            $event->getRequest()->getSession()->set('rememberme_auth', 1);
        }

        $this->eventDispatcher->addListener(HttpKernel\KernelEvents::RESPONSE, array($this, 'onFilterResponse'));
    }

    public function onFilterResponse(HttpKernel\Event\ResponseEvent $event)
    {
        $response = $event->getResponse();
        if (1 === $event->getRequest()->getSession()->get('rememberme_auth', null)) {
            $event->getRequest()->getSession()->remove('rememberme_auth');
            $response = new RedirectResponse('/link');
        }

        $maxperpage = $this->ucm->getUserConfig()->getMaxPerPage();
        $configCookie = new Cookie('maxperpage', $maxperpage, 0, '/', null, false, false);
        $response->headers->setCookie($configCookie);
        $event->setResponse($response);
        $this->eventDispatcher->removeListener(HttpKernel\KernelEvents::RESPONSE, array($this, 'onFilterResponse'));
    }
}