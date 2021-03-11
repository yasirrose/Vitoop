<?php

namespace App\Command;

use App\Repository\FlagRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Entity\Pdf;
use App\Entity\Teli;
use App\Entity\Link;
use App\Service\UrlChecker;

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
     * @var FlagRepository
     */
    private $flagRepository;

    /**
     * UrlCheckCommand constructor.
     * @param UrlChecker $urlChecker
     * @param EntityManagerInterface $entityManager
     * @param FlagRepository $flagRepository
     */
    public function __construct(
        UrlChecker $urlChecker,
        EntityManagerInterface $entityManager,
        FlagRepository $flagRepository
    ) {
        $this->urlChecker = $urlChecker;
        $this->entityManager = $entityManager;
        $this->flagRepository = $flagRepository;

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
                    $this->flagRepository->doUnblame($resource);
                }
                $this->entityManager->flush();
            }
        }

        return 0;
    }
}
