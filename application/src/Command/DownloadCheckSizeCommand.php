<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use App\Service\DownloadsService;
use App\Service\EmailSender;

class DownloadCheckSizeCommand extends Command
{
    /**
     * @var DownloadsService
     */
    private $downloadService;

    /**
     * @var EmailSender
     */
    private $emailSender;

    /**
     * DownloadCheckSizeCommand constructor.
     * @param DownloadsService $downloadService
     * @param EmailSender $emailSender
     */
    public function __construct(DownloadsService $downloadService, EmailSender $emailSender)
    {
        $this->downloadService = $downloadService;
        $this->emailSender = $emailSender;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('download:check:size')
            ->setDescription('Check size of downloads folder')
            ->addOption(
                'mail',
                null,
                InputOption::VALUE_NONE,
                'Send mail to admin if folder size is critical'
            )
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln($this->downloadService->getDownloadsSizeInMb());
        if ($input->getOption('mail') && ($this->downloadService->isFolderWarning() || $this->downloadService->isFolderError())) {
            $message = 'will be oversized soon';
            if ($this->downloadService->isFolderError()) {
                $message = 'is oversized. New resources are not saving';
            }

            $this->emailSender->sendDownloadFolderStatus(
                'david@vitoop.org',
                number_format($this->downloadService->getDownloadsSizeInMb(), 2, '.', ''),
                $message
            );
        }
    }
}
