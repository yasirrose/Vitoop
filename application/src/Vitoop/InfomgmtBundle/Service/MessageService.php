<?php

namespace Vitoop\InfomgmtBundle\Service;

use phpcent\Client;

class MessageService
{
    protected $client;

    public function __construct($url, $api, $secret)
    {
        $this->client = new Client($url, $api, $secret);
    }

    public function getToken($userId)
    {
        return $this->client->generateConnectionToken($userId, time() + 3600 * 24);
    }
}