<?php


namespace Vitoop\InfomgmtBundle\Service;

use phpcent\Client;
use Symfony\Component\HttpFoundation\JsonResponse;
use Vitoop\InfomgmtBundle\Entity\Resource;

class MessageService extends Resource
{
    protected $client;

    public $token;

    public $channel;

    public $userId;

    public function __construct()
    {
        $this->client = new Client("https://centrifugo2.herokuapp.com/api", "api_key", 'secret');

        //$this->client = new Client("https://centrifugal.vitoop.de:8000/api", "b5dd67ab-fde9-4578-b7ff-f63180434980", 'bd0a6d03-cd8c-4ee7-b6e6-b9d6cdc7383a');

        $this->token = $this->client->generatePrivateChannelToken($this->userId, $this->channel);

    }

    public function setToken($token)
    {
        $this->token = $token;
    }

    private function getToken()
    {
        return $this->token;
    }

    public function setChannel($channel)
    {
        $this->channel = $channel;
    }

    private function getChannel()
    {
        return $this->channel;
    }

    public function setUserId($userId)
    {
        $this->userId = $userId;
    }

}