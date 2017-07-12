<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\DependencyInjection\ContainerAwareTrait;

class Version20170710193923 extends AbstractMigration implements ContainerAwareInterface
{
    use ContainerAwareTrait;

    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pdf ADD pdf_order BIGINT DEFAULT NULL');
        $this->addSql('ALTER TABLE teli ADD release_order BIGINT DEFAULT NULL');
    }

    public function postUp(Schema $schema)
    {
        $batchSize = 100;
        $entityManager = $this->container->get('doctrine.orm.entity_manager');
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


    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pdf DROP pdf_order');
        $this->addSql('ALTER TABLE teli DROP release_order');
    }
}
