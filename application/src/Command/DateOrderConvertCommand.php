<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Entity\ValueObject\PublishedDate;
use App\Entity\Pdf;
use App\Entity\Teli;

class DateOrderConvertCommand extends Command
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * DateOrderConvertCommand constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
        parent::__construct();
    }

    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('vitoop:date_order:convert')
            ->setDescription('Recreate order for all pdf and teli dates');
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $batchSize = 100;
        $query = $this->entityManager->createQuery('SELECT p FROM '.Pdf::class.' p');
        foreach ($query->iterate() as $key => $row) {
            /** @var Pdf $pdf */
            $pdf = current($row);
            $pdf->setPdfDate(PublishedDate::createFromString($pdf->getPdfDate()->getDate()));
            if (($key % $batchSize) === 0) {
                $this->entityManager->flush();
                $this->entityManager->clear();
            }
        }
        $this->entityManager->flush();

        $query = $this->entityManager->createQuery('SELECT t FROM '.Teli::class. ' t');
        foreach ($query->iterate() as $key => $row) {
            /** @var Teli $teli */
            $teli = current($row);
            $teli->setReleaseDate(PublishedDate::createFromString($teli->getReleaseDate()->getDate()));
            if (($key % $batchSize) === 0) {
                $this->entityManager->flush();
                $this->entityManager->clear();
            }
        }
        $this->entityManager->flush();
    }
}
