<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20150804210007 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3EC4A1883');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3EC4A1883');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
    }
}
