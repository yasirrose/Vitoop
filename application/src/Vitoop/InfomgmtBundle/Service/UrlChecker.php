<?php

namespace Vitoop\InfomgmtBundle\Service;

use GuzzleHttp\Client;

class UrlChecker
{
    public function isAvailableUrl($url)
    {
        try {
            $client = new Client();

            return 404 !== $client->head($url)->getStatusCode();
        } catch (\Exception $ex) {
            return false;
        }
    }
}
