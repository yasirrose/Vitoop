<?php

namespace Vitoop\InfomgmtBundle\Service;

use Symfony\Component\Filesystem\Filesystem;
use Vitoop\InfomgmtBundle\Entity\Downloadable\DownloadableInterface;

class FileDownloader
{
    private $downloadFolder;

    /**
     * @var Filesystem
     */
    private $fileSystem;

    /**
     * FileDownloader constructor.
     * @param $downloadFolder
     */
    public function __construct($downloadFolder)
    {
        $this->downloadFolder = $downloadFolder;
        $this->fileSystem = new Filesystem();
    }

    /**
     * @param DownloadableInterface $resource
     * @return string
     */
    public function getPath(DownloadableInterface $resource)
    {
        $path = implode(DIRECTORY_SEPARATOR, array(
            $this->downloadFolder,
            $resource->getResourceType(),
            $resource->getId().'.'.$resource->getResourceExtension()
        ));
        $this->fileSystem->mkdir(dirname($path));

        return $path;
    }

    public function getFile(DownloadableInterface $resource)
    {
        $filepath = $this->getPath($resource);
        if (!$this->fileSystem->exists($filepath)) {
            $this->download($resource);
        }

        return $filepath;
    }

    public function download(DownloadableInterface $resource)
    {
        $info = $this->getInfoFromUrl($resource->getUrl());
        if (200 !== $info['http_code']) {
            return false;
        }

        $this->downloadFromUrl($resource->getUrl(), $this->getPath($resource));

        return $info;
    }

    /**
     * @param $url
     * @param $path
     */
    private function downloadFromUrl($url, $path)
    {
        $curl = curl_init($url);
        $file = fopen($path, 'w+');
        curl_setopt($curl, CURLOPT_NOBODY, false);
        curl_setopt($curl, CURLOPT_FILE, $file);
        curl_exec($curl);
        fclose($file);
        curl_close($curl);
    }

    /**
     * @param $url
     * @return mixed
     */
    private function getInfoFromUrl($url)
    {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        curl_exec($curl);
        $info = curl_getinfo($curl);
        curl_close($curl);

        return $info;
    }
}