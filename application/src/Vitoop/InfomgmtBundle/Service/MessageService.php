<?php


namespace Vitoop\InfomgmtBundle\Service;

use phpcent\Client;
use phpDocumentor\Reflection\Types\Self_;
use Symfony\Component\DependencyInjection\ContainerInterface;


class MessageService
{
    protected $client;

    public function __construct(ContainerInterface $container)
    {
        $this->client = new Client(
            $container->getParameter('centrifugo_url'),
            $container->getParameter('centrifugo_secret'),
            $container->getParameter('centrifugo_secret')
        );
    }

    public function getToken($userId)
    {
        return $this->client->generateConnectionToken($userId, time() + 3600 * 24);
    }
}