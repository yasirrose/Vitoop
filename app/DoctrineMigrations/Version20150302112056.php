<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20150302112056 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        
        $this->addSql('ALTER TABLE rel_resource_resource ADD deleted_by_id_user INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rel_resource_resource ADD CONSTRAINT FK_BB65537C5D2FB0A4 FOREIGN KEY (deleted_by_id_user) REFERENCES vitoop_user (id)');
        $this->addSql('CREATE INDEX IDX_BB65537C5D2FB0A4 ON rel_resource_resource (deleted_by_id_user)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        
        $this->addSql('ALTER TABLE rel_resource_resource DROP FOREIGN KEY FK_BB65537C5D2FB0A4');
        $this->addSql('DROP INDEX IDX_BB65537C5D2FB0A4 ON rel_resource_resource');
        $this->addSql('ALTER TABLE rel_resource_resource DROP deleted_by_id_user');
    }
}
