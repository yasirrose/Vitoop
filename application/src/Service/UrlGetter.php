<?php
namespace App\Service;

use App\Entity\Downloadable\DownloadableInterface;
use GuzzleHttp\Client;

class UrlGetter
{
    const GETTER_TIMEOUT = 5;

    /**
     * @var string
     */
    private $downloadFolder;

    /**
     * UrlGetter constructor.
     * @param string $downloadFolder
     */
    public function __construct($downloadFolder)
    {
        $this->downloadFolder = $downloadFolder;
    }

    public function getBinaryContentFromUrl($url)
    {
        if (false !== strpos($url, 'vitoop:///')) {
            return $this->getLocalContent($url);
        }

        $client = new Client([
            'cookies' => true,
            'allow_redirects' => true,
            'headers' => [
                'Accept' => 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'User-Agent' => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:46.0) Gecko/20100101 Firefox/46.0'
            ]
        ]);

        return $client->get($url)->getBody();
    }

    public function getLocalUrl(DownloadableInterface $resource)
    {
        return 'vitoop:///'.$resource->getResourceType().'/'.$resource->getId().'.'.$resource->getResourceExtension();
    }

    private function getLocalContent($url)
    {
        $path = str_replace('vitoop:///', $this->downloadFolder.'/', $url);
        if (file_exists($path)) {
            $handle = fopen($path, "rb");
            $contents = fread($handle, filesize($path));
            fclose($handle);
            return $contents;
        }

        return null;
    }
}