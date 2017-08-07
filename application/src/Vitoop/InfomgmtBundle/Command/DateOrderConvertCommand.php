<?php

namespace Vitoop\InfomgmtBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Teli;

class DateOrderConvertCommand extends ContainerAwareCommand
{
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
        $entityManager = $this->getContainer()->get('doctrine.orm.entity_manager');
        $query = $entityManager->createQuery('SELECT p FROM '.Pdf::class.' p');
        foreach ($query->iterate() as $key => $row) {
            /** @var Pdf $pdf */
            $pdf = current($row);
            $pdf->setPdfDate(PublishedDate::createFromString($pdf->getPdfDate()->getDate()));
            if (($key % $batchSize) === 0) {
                $entityManager->flush();
                $entityManager->clear();
            }
        }
        $entityManager->flush();

        $query = $entityManager->createQuery('SELECT t FROM '.Teli::class. ' t');
        foreach ($query->iterate() as $key => $row) {
            /** @var Teli $teli */
            $teli = current($row);
            $teli->setReleaseDate(PublishedDate::createFromString($teli->getReleaseDate()->getDate()));
            if (($key % $batchSize) === 0) {
                $entityManager->flush();
                $entityManager->clear();
            }
        }
        $entityManager->flush();
    }
}
