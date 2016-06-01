<?php

namespace Vitoop\InfomgmtBundle\Service;

use Buzz\Browser;

class WikiApi
{
    const WIKI_URL = 'http://de.wikipedia.org/w/api.php?format=json&action=opensearch&search=api&namespace=0&suggest=';

    private $userAgent;
    private $browser;

    public function __construct(Browser $browser)
    {
        $this->browser = $browser;
        $this->userAgent = 'VitooP/0.dev (http://vitoop.org; tweini@web.de)';
    }

    public function getIndex()
    {
        $response =  $this->browser->get(
            self::WIKI_URL,
            [                
                'User-Agent' => $this->userAgent,
                'Accept'     => 'application/json',
            ]
        );

        return $response->getContent();
    }
}
