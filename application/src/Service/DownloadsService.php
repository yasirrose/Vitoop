<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Knp\Snappy\Pdf;
use App\Entity\Downloadable\DownloadableInterface;
use App\Entity\Teli;

class DownloadsService
{
    private $em = null;
    private $downloadsDir;
    private $folderSize;
    private $pdfGenerator;

    const WARNING_FOLDER_SIZE = 1700;
    const ERROR_FOLDER_SIZE = 3000;

    public function __construct(
        EntityManagerInterface $entityManager,
        SettingsService $settingsService,
        Pdf $pdfGenerator,
        $downloadFolder
    ) {
        $this->em = $entityManager;
        $this->downloadsDir = $downloadFolder;
        $this->pdfGenerator = $pdfGenerator;
        $this->folderSize = $this->getFolderSize($this->downloadsDir);
        $settingsService->setCurrentDownloadsSize($this->folderSize);
    }

    public function getPath(DownloadableInterface $resource)
    {
        $path = implode(DIRECTORY_SEPARATOR, array(
            $this->downloadsDir,
            $resource->getResourceType(),
            $resource->getId().'.'.$resource->getResourceExtension()
        ));
        $directory = dirname($path);
        
        if (!file_exists($directory)) {
            mkdir($directory, 0777, true);
        }

        return $path;
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

    public function downloadPDF($count, $missing, OutputInterface $output)
    {
        $output->writeln('Getting '.$count.' elements from database');
        $resources = $this->em->getRepository(\App\Entity\Pdf::class)
            ->getPDFForDownloading($count, $missing);
        $output->writeln(count($resources).' resources loaded from DB');
        foreach ($resources as $resource) {
            $this->download($resource, $output);
        }
        $this->em->flush();
    }

    /**
     * @TODO Refactoring with FileDownloader
     */
    public function downloadHtml($count, $missing, LoggerInterface $output)
    {
        $output->info('Getting '.$count.' elements from database');
        $resources = $this->em->getRepository(Teli::class)->getHTMLForDownloading($count, $missing);
        $output->info(count($resources).' resources loaded from DB');
        foreach ($resources as $resource) {
            $output->info($resource->getUrl());
            $info = $this->getInfoFromUrl($resource->getUrl());
            if (200 != $info['http_code']) {
                $resource->markAsWrongUrl();
                continue;
            }

            $filePath = $this->getPath($resource);
            $curl = curl_init($resource->getUrl());
            $this->downloadFromCurl($curl, $filePath);
            chmod($filePath, 0666);
            curl_close($curl);
            $this->cleanHtml($filePath);

            if (file_get_contents($filePath) == null) {
                $resource->markAsWrongUrl();
            } else {
                $resource->markAsSuccess();
            }
            $this->em->flush($resource);
        }
        $this->em->flush();
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
            $resource->markAsWrongUrl();
            $output->writeln('Wrong url or site unvailable');
        } elseif ($code != 200 && $code != 350) {
            $resource->markAsWrongUrl();
            $output->writeln('Not found. Error code '.$code);
        } elseif (strpos($contentType, 'pdf') === false && $code != 350) {
            $resource->markAsWrongUrl();
            $output->writeln('Not a PDF');
        } else {
            $resource->markAsSuccess();
            $output->writeln('PDF found. Start downloading...');
            $path = $this->getPath($resource);
            $this->downloadFromCurl($curl, $path);
            $output->writeln('PDF saved on server');
        }
        curl_close($curl);
        return true;
    }
    
    private function getFolderSize($dir)
    {
        $size = 0;
        foreach (glob(rtrim($dir, DIRECTORY_SEPARATOR).DIRECTORY_SEPARATOR.'*', GLOB_NOSORT) as $each) {
            $size += is_file($each) ? filesize($each)/1024/1024 : $this->getFolderSize($each);
        }
        return $size;
    }

    private function downloadFromCurl(&$curl, $path)
    {
        $file = fopen($path, 'w+');
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($curl, CURLOPT_MAXREDIRS, 5);
        curl_setopt($curl, CURLOPT_NOBODY, false);
        curl_setopt($curl, CURLOPT_FILE, $file);
        curl_exec($curl);
        fclose($file);
    }

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

    private function cleanHtml(string $path)
    {
        $content = file_get_contents($path);
        $content = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', "", $content);
        if ($content == "stop scan") {
            file_put_contents($path, null);
        } else {
            file_put_contents($path, $content);
        }
    }
}
