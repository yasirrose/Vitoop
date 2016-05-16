<?php

namespace Vitoop\InfomgmtBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\Link;
use Vitoop\InfomgmtBundle\Service\UrlChecker;

class UrlCheckCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('vitoop:url:check')
            ->setDescription('Get old 10 urls for PDF, Textlink and Link and check its availablity')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        /* @var $urlChecker UrlChecker */
        $urlChecker = $this->getContainer()->get('vitoop.url_checker');

        $linkClasses = [Pdf::class, Teli::class, Link::class];

        foreach ($linkClasses as $class) {
            $resourcesForCheck = $this->getContainer()->get('doctrine.orm.entity_manager')
                ->getRepository($class)
                ->findResourcesForCheckUrl();

            foreach ($resourcesForCheck as $resource) {
                $resource->updateLastCheck();
                if (!$urlChecker->isAvailableUrl($resource->getUrl())) {
                    $resource->blame('URL not exist anymore');
                }
            }

            $this->getContainer()->get('doctrine.orm.entity_manager')->flush();
        }
    }
}
