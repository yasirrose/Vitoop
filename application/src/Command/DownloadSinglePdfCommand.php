<?php

namespace App\Command;

use App\Entity\Downloadable\DownloadableInterface;
use App\Exception\File\UrlNotAvailableException;
use App\Repository\ResourceRepository;
use App\Service\FileDownloader;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Knp\Snappy\Pdf as PdfGenerator;

class DownloadSinglePdfCommand extends Command
{
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;
    /**
     * @var FileDownloader
     */
    private $fileDownloader;
    /**
     * @var PdfGenerator
     */
    private $pdfGenerator;

    public function __construct(ResourceRepository $resourceRepository, FileDownloader $fileDownloader, PdfGenerator $pdfGenerator)
    {
        $this->resourceRepository = $resourceRepository;
        $this->fileDownloader = $fileDownloader;
        $this->pdfGenerator = $pdfGenerator;
        parent::__construct();
    }


    protected function configure()
    {
        $this
            ->setName('download:pdf:one')
            ->setDescription('Download PDF on server by id')
            ->addArgument(
                'id',
                InputArgument::REQUIRED,
                'Resource id for download (teli or pdf supported)'
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $resourceId = $input->getArgument('id');
        $resource = $this->resourceRepository->find($resourceId);
        if (!$resource instanceof DownloadableInterface) {
            $output->writeln('Resource with id '.$resourceId. ' is not found or unsupported');
            return 0;
        }

        try {
            $isPdf = $this->fileDownloader->isPdf($resource);
            if (true === $isPdf) {
                $this->fileDownloader->download($resource);
            } else {
                $this->pdfGenerator->generate(
                    $resource->getUrl(),
                    $this->fileDownloader->getPath($resource),
                    ['disable-javascript' => true],
                    true
                );
            }
            $resource->markAsSuccess();
        } catch (UrlNotAvailableException $exception) {
            $output->writeln($resource->getUrl() . ' is not avalable');
            $resource->markAsWrongUrl();
        }
        $this->resourceRepository->save($resource);

        return 0;
    }
}
