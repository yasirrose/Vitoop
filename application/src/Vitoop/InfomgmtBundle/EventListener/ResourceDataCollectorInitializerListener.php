<?php
/**
 * Created by PhpStorm.
 * User: Master-Tobi
 * Date: 13.02.14
 * Time: 06:38
 */

namespace Vitoop\InfomgmtBundle\EventListener;

use Vitoop\InfomgmtBundle\Service\ResourceDataCollector;
use Vitoop\InfomgmtBundle\Service\ResourceManager;

use Symfony\Component\HttpKernel\Event\FilterControllerEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use Symfony\Component\HttpFoundation\ParameterBag;

class ResourceDataCollectorInitializerListener
{
    private $rdc;

    private $rm;

    public function __construct(ResourceDataCollector $rdc, ResourceManager $rm)
    {
        $this->rdc = $rdc;
        $this->rm = $rm;
    }

    public function onKernelController(FilterControllerEvent $event)
    {
        /* @var $bag Parameterbag */
        $bag = $event->getRequest()->attributes;

        if ($bag->has('res_type')) {
            $this->rdc->prepare($bag->get('res_type'), $event->getRequest());
            if ($bag->has('res_id')) {
                $res = $this->rm->getResource($bag->get('res_type'), $bag->get('res_id'));
                if (null === $res) {
                    throw new NotFoundHttpException('Vitoooops! The requested Resource does not exist.');
                }
                $this->rdc->init($res);
            }
        }
    }
}