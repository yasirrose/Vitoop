<?php

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Console\Output\OutputInterface;
use Vitoop\InfomgmtBundle\Entity\DownloadableInterface;
use Vitoop\InfomgmtBundle\Entity\Option;
use Vitoop\InfomgmtBundle\Repository\OptionRepository;

class DownloadsService
{
    private $em = null;
    private $downloadsDir;
    private $folderSize;

    const WARNING_FOLDER_SIZE = 1700;
    const ERROR_FOLDER_SIZE = 3000;

    public function __construct(EntityManager $entityManager, SettingsService $settingsService, $downloadFolder)
    {
        $this->em = $entityManager;
        $this->downloadsDir = $downloadFolder;
        $this->folderSize = $this->getFolderSize($this->downloadsDir);
        $settingsService->setCurrentDownloadsSize($this->folderSize);
    }

    public function getPath(DownloadableInterface $resource)
    {
        $path = join(DIRECTORY_SEPARATOR, array(
            $this->downloadsDir,
            $resource->getResourceType(),
            $resource->getId().'.'.$resource->getResourceType()
        ));
        $directory = dirname($path);
        
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }

        return $path;
    }

    private function getFolderSize($dir)
    {
        $size = 0;
        foreach (glob(rtrim($dir, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.'*', GLOB_NOSORT) as $each) {
            $size += is_file($each) ? filesize($each)/1024/1024 : $this->getFolderSize($each);
        }
        return $size;
    }

    public function isFolderError()
    {
        return $this->folderSize > self::ERROR_FOLDER_SIZE;
    }

    public function isFolderWarning()
    {
        return $this->folderSize > self::WARNING_FOLDER_SIZE;
    }

    public function getDownloadsSizeInMb()
    {
        return $this->folderSize;
    }

    private function download(DownloadableInterface $resource, OutputInterface $output)
    {
        if ($this->isFolderError()) {
            $output->writeln('Folder oversized...');
            return false;
        }

        $output->writeln($resource->getUrl());
        $output->writeln('Checking resource...');
        $curl = curl_init($resource->getUrl());
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_NOBODY, true);
        $answer = curl_exec($curl);
        $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
        $output->write('Checking finished. ');
        if (!$answer) {
            $resource->setIsDownloaded(5);
            $output->writeln('Wrong url or site unvailable');
        } elseif ($code != 200 && $code != 350) {
            $resource->setIsDownloaded($code);
            $output->writeln('Not found. Error code '.$code);
        } elseif (strpos($contentType, 'pdf') === false && $code != 350) {
            $resource->setIsDownloaded(5);
            $output->writeln('Not a PDF');
        } else {
            $resource->setIsDownloaded(1);
            $resource->setDownloadedAt(new \DateTime());
            $output->writeln('PDF found. Start downloading...');
            $path = $this->getPath($resource);
            $file = fopen($path, 'w+');
            curl_setopt($curl, CURLOPT_NOBODY, false);
            curl_setopt($curl, CURLOPT_FILE, $file);
            curl_exec($curl);
            fclose($file);
            $output->writeln('PDF saved on server');
        }
        curl_close($curl);
        $this->em->merge($resource);

        return true;
    }

    public function downloadPDF($count, $missing, OutputInterface $output)
    {
        $output->writeln('Getting '.$count.' elements from database');
        $resources = $this->em->getRepository('VitoopInfomgmtBundle:Pdf')->getPDFForDownloading($count, $missing);
        $output->writeln(count($resources).' resources loaded from DB');
        foreach ($resources as $resource) {
            $this->download($resource, $output);
        }
        $this->em->flush();
    }
}