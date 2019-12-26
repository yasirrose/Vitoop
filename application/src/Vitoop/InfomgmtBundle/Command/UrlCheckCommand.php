<?php

namespace Vitoop\InfomgmtBundle\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\Link;
use Vitoop\InfomgmtBundle\Service\UrlChecker;

class UrlCheckCommand extends Command
{
    /**
     * @var UrlChecker
     */
    private $urlChecker;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * UrlCheckCommand constructor.
     * @param UrlChecker $urlChecker
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(UrlChecker $urlChecker, EntityManagerInterface $entityManager)
    {
        $this->urlChecker = $urlChecker;
        $this->entityManager = $entityManager;

        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('vitoop:url:check')
            ->setDescription('Get old 10 urls for PDF, Textlink and Link and check its availablity')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $linkClasses = [Pdf::class, Teli::class, Link::class];

        foreach ($linkClasses as $class) {
            $resourcesForCheck = $this->entityManager
                ->getRepository($class)
                ->findResourcesForCheckUrl();

            foreach ($resourcesForCheck as $resource) {
                $resource->updateLastCheck();
                if (!$this->urlChecker->isAvailableUrl($resource->getUrl())) {
                    $output->writeln('Blamed:  ' .$resource->getUrl(). ' res id = '.$resource->getId());
                    $resource->blame('URL not exist anymore');
                } else {
                    $output->writeln('Unblamed:  ' .$resource->getUrl(). ' res id = '.$resource->getId());
                    $resource->unblame();
                }
            }

            $this->entityManager->flush();
        }
    }
}
