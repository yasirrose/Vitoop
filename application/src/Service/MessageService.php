<?php

namespace App\Service;

use phpcent\Client;

class MessageService
{
    protected $client;

    public function __construct($url, $api, $secret)
    {
        $this->client = new Client($url, $api, $secret);
    }

    public function getToken($userId, $conversationId)
    {
        return $this->client->generateConnectionToken($userId, time() + 3600 * 24);
    }

    public function sendMessageToChanel($conversationId, $data)
    {
        $this->client->publish('con_'.$conversationId, $data);
    }
}