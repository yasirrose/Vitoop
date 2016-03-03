<?php

namespace Vitoop\InfomgmtBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class DownloadCheckSizeCommand extends ContainerAwareCommand
{
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
        $downloadService = $this->getContainer()->get('vitoop.downloads');
        $output->writeln($downloadService->getDownloadsSizeInMb());
        if ($input->getOption('mail') && ($downloadService->isFolderWarning() || $downloadService->isFolderError())) {
            $mail = <<<'EOT'
Hello David!

It is seems that downloads folder {MESSAGE}. Current size is {SIZE} Mb. Check it please.

Best regards,
Vitoop.
EOT;
            $mail = str_replace('{SIZE}', number_format($downloadService->getDownloadsSizeInMb(), 2, '.', ''), $mail);
            if ($downloadService->isFolderError()) {
                $mail = str_replace('{MESSAGE}', 'is oversized. New resources are not saving', $mail);
            } else {
                $mail = str_replace('{MESSAGE}', 'will be oversized soon', $mail);
            }
            $message = \Swift_Message::newInstance()
                ->setSubject('Vitoop needs help')
                ->setFrom(array('einladung@vitoop.org' => 'Vitoop'))
                ->setTo('david@vitoop.org')
                ->setBody($mail);
            $this->getContainer()->get('mailer')->send($message);

        }
    }
}
