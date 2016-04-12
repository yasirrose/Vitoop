<?php

namespace Vitoop\InfomgmtBundle\EventListener;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Http;
use Symfony\Component\HttpKernel;
use Symfony\Component\HttpFoundation\Cookie;
use Vitoop\InfomgmtBundle\Service\UserConfigManager;

class LoginListener
{
    protected $eventDispatcher;

    protected $ucm;

    public function __construct(
        UserConfigManager $ucm,
        EventDispatcherInterface $eventDispatcher
    ) {
        $this->ucm = $ucm;
        $this->eventDispatcher = $eventDispatcher;
    }

    public function onInteractiveLogin(Http\Event\InteractiveLoginEvent $event)
    {
        $this->eventDispatcher->addListener(HttpKernel\KernelEvents::RESPONSE, array($this, 'onFilterResponse'));
    }

    public function onFilterResponse(HttpKernel\Event\FilterResponseEvent $event)
    {
        $response = $event->getResponse();

        $maxperpage = $this->ucm->getUserConfig()->getMaxPerPage();
        $config_cookie = new Cookie('maxperpage', $maxperpage, 0, '/', null, false, false);
        $response->headers->setCookie($config_cookie);
        $event->setResponse($response);
        $this->eventDispatcher->removeListener(HttpKernel\KernelEvents::RESPONSE, array($this, 'onFilterResponse'));
    }
}