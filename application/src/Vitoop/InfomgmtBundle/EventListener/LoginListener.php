<?php
/**
 * Created by PhpStorm.
 * User: Master-Tobi
 * Date: 16.04.14
 * Time: 21:39
 */
namespace Vitoop\InfomgmtBundle\EventListener;

use Symfony\Component\EventDispatcher;
use Symfony\Component\Security\Http;
use Symfony\Component\HttpKernel;
use Symfony\Component\HttpFoundation\Cookie;
use Vitoop\InfomgmtBundle\Service\UserConfigManager;

class LoginListener
{
    protected $ucm;

    public function __construct(UserConfigManager $ucm)
    {
        $this->ucm = $ucm;
    }

    public function onInteractiveLogin(Http\Event\InteractiveLoginEvent $event)
    {
        $dispatcher = $event->getDispatcher();
        $dispatcher->addListener(HttpKernel\KernelEvents::RESPONSE, array($this, 'onFilterResponse'));
    }

    public function onFilterResponse(HttpKernel\Event\FilterResponseEvent $event)
    {
        $response = $event->getResponse();

        $maxperpage = $this->ucm->getUserConfig()
                                ->getMaxPerPage();
        $config_cookie = new Cookie('maxperpage', $maxperpage, 0, '/', null, false, false);
        $response->headers->setCookie($config_cookie);
        $event->setResponse($response);
        $dispatcher = $event->getDispatcher();
        $dispatcher->removeListener(HttpKernel\KernelEvents::RESPONSE, array($this, 'onFilterResponse'));
    }
}