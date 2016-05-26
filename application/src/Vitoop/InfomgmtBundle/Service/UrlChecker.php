<?php

namespace Vitoop\InfomgmtBundle\Service;

use GuzzleHttp\Client;

class UrlChecker
{
    public function isAvailableUrl($url)
    {
        $client = new Client([
            'cookies' => true,
            'allow_redirects' => true,
            'headers' => [
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:46.0) Gecko/20100101 Firefox/46.0'
            ]
        ]);
        
        if ($this->isHeadAvailable($client, $url)) {
            return true;
        }
        try {
            return 404 !== $client->get($url)->getStatusCode();
        } catch (\GuzzleHttp\Exception\ClientException $ex) {
            return false;
        }
    }

    private function isHeadAvailable(Client $client, $url)
    {
        try {
            return 404 !== $client->head($url)->getStatusCode();
        } catch (\GuzzleHttp\Exception\ClientException $ex) {
            return false;
        }
    }
}
