<?php

namespace App\Command;

use App\DTO\Resource\ResourceDTO;
use App\Repository\ResourceRepository;
use App\Repository\UserRepository;
use App\Service\EmailReceiver;
use App\Service\Resource\ResourceImporter;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AutoImportCommand extends Command
{
    protected static $defaultName = 'vitoop:auto:import';

    /**
     * @var EmailReceiver
     */
    private $emailReceiver;

    /**
     * @var ResourceImporter
     */
    private $resourceImporter;

    /**
     * @var ResourceRepository
     */
    private $resourceRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(EmailReceiver $emailReceiver,
        ResourceImporter $resourceImporter,
        ResourceRepository $resourceRepository,
        UserRepository $userRepository
    ) {
        $this->emailReceiver = $emailReceiver;
        $this->resourceImporter = $resourceImporter;
        $this->userRepository = $userRepository;
        $this->resourceRepository = $resourceRepository;

        parent::__construct();
    }


    protected function configure()
    {
        $this->setDescription('Check emails for import and apply new record to db.');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Check emails for import');
        try {
            $fileData = $this->emailReceiver->getImportMails();
        } catch (\Exception $exception) {
            $output->writeln($exception->getMessage());
            return 1;
        }
        if (empty($fileData)) {
            $output->writeln('No import emails were found');
            return 0;
        }

        $resourceIds = [];
        $existentResourceIds = [];
        foreach ($fileData as $json) {
            $importedJson = json_decode($json, true);
            foreach ($importedJson as $resourceArray) {
                $resourceDTO = ResourceDTO::createFromArrayAndType($resourceArray, $resourceArray['resourceType']);
                $resourceDTO->user = $this->userRepository->findDefaultUser();

                //check if resource exists
                $existentResources = $this->resourceRepository->getResourceByName($resourceDTO->name);
                if (!empty($existentResources)) {
                    $existentResourceIds[] = $existentResources[0]->getId();
                    continue;
                }

                $importedResource = $this->resourceImporter->importResource($resourceArray, $resourceDTO);
                $resourceIds[] = $importedResource->getId();
            }
        }

        $output->writeln(' - Amount of imported resources is '. count($resourceIds));
        $output->writeln(' - Amount of existent resources is '. count($existentResourceIds));

        return 0;
    }
}
