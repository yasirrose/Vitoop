<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Service\SettingsService;

class DataInitCommand extends Command
{
    /**
     * @var SettingsService
     */
    private $settings;

    /**
     * DataInitCommand constructor.
     */
    public function __construct(SettingsService $settings)
    {
        $this->settings = $settings;
        parent::__construct();
    }

    protected function configure()
    {
        $this
            ->setName('vitoop:data:init')
            ->setDescription('Init data for new project');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->settings->set(SettingsService::NAME_INVITATION, false);
    }
}