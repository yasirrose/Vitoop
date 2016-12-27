<?php

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Console\Output\OutputInterface;
use Knp\Bundle\SnappyBundle\Snappy\LoggableGenerator;
use Vitoop\InfomgmtBundle\Entity\Downloadable\DownloadableInterface;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\Option;
use Vitoop\InfomgmtBundle\Repository\OptionRepository;

class DownloadsService
{
    private $em = null;
    private $downloadsDir;
    private $folderSize;
    private $pdfGenerator;

    const WARNING_FOLDER_SIZE = 1700;
    const ERROR_FOLDER_SIZE = 3000;

    public function __construct(
        EntityManager $entityManager,
        SettingsService $settingsService,
        LoggableGenerator $pdfGenerator,
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
        $path = join(DIRECTORY_SEPARATOR, array(
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
        $resources = $this->em->getRepository('VitoopInfomgmtBundle:Pdf')
            ->getPDFForDownloading($count, $missing);
        $output->writeln(count($resources).' resources loaded from DB');
        foreach ($resources as $resource) {
            $this->download($resource, $output);
        }
        $this->em->flush();
    }

    public function downloadHtml($count, $missing, OutputInterface $output)
    {
        $output->writeln('Getting '.$count.' elements from database');
        $resources = $this->em->getRepository(Teli::class)
            ->getHTMLForDownloading($count, $missing);
        $output->writeln(count($resources).' resources loaded from DB');
        foreach ($resources as $resource) {
            $output->writeln($resource->getUrl());
            $info = $this->getInfoFromUrl($resource->getUrl());
            if (200 != $info['http_code']) {
                $resource->markAsWrongUrl();
                continue;
            }
            $this->pdfGenerator->generate($resource->getUrl(), $this->getPath($resource), [], true);
            $resource->markAsSuccess();
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
            $file = fopen($path, 'w+');
            curl_setopt($curl, CURLOPT_NOBODY, false);
            curl_setopt($curl, CURLOPT_FILE, $file);
            curl_exec($curl);
            fclose($file);
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