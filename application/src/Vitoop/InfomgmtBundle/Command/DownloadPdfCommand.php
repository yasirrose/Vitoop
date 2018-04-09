<?php

namespace Vitoop\InfomgmtBundle\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Vitoop\InfomgmtBundle\Service\DownloadsService;

class DownloadPdfCommand extends Command
{
    /**
     * @var DownloadsService
     */
    private $downloadService;

    /**
     * DownloadPdfCommand constructor.
     * @param DownloadsService $downloadService
     */
    public function __construct(DownloadsService $downloadService)
    {
        $this->downloadService = $downloadService;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('download:pdf')
            ->setDescription('Download PDFs on server')
            ->addArgument(
                'count',
                InputArgument::OPTIONAL,
                'Count of elements to download'
            )
            ->addOption(
                'missing',
                null,
                InputOption::VALUE_NONE,
                'Try to get missing files one more time'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $count = 10;
        $missing = false;

        $countInput = (int) $input->getArgument('count');

        if ($countInput && is_int($countInput) && $countInput > 0) {
            $count = $countInput;
        }

        if ($input->getOption('missing')) {
            $missing = true;
        }
        $this->downloadService->downloadPDF($count, $missing, $output);
        $this->downloadService->downloadHtml($count, $missing, $output);
    }
}
