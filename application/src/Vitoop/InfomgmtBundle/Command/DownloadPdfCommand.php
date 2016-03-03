<?php

namespace Vitoop\InfomgmtBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class DownloadPdfCommand extends ContainerAwareCommand
{
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
        $downloadService = $this->getContainer()->get('vitoop.downloads');

        $count = 10;
        $missing = false;

        $countInput = (int) $input->getArgument('count');

        if ($countInput && is_int($countInput) && $countInput > 0) {
            $count = $countInput;
        }

        if ($input->getOption('missing')) {
            $missing = true;
        }
        $downloadService->downloadPDF($count, $missing, $output);
    }
}
