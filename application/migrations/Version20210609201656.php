<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210609201656 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pdf_annotation DROP FOREIGN KEY FK_1479CCC4511FC912');
        $this->addSql('ALTER TABLE pdf_annotation CHANGE pdf_id pdf_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE pdf_annotation ADD CONSTRAINT FK_1479CCC4511FC912 FOREIGN KEY (pdf_id) REFERENCES resource (id)');
    }

    public function down(Schema $schema) : void
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pdf_annotation DROP FOREIGN KEY FK_1479CCC4511FC912');
        $this->addSql('ALTER TABLE pdf_annotation CHANGE pdf_id pdf_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE pdf_annotation ADD CONSTRAINT FK_1479CCC4511FC912 FOREIGN KEY (pdf_id) REFERENCES pdf (id)');
    }
}
