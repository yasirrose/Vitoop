<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20150804205245 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE remark DROP FOREIGN KEY FK_E1CAD839EC4A1883');
        $this->addSql('ALTER TABLE remark ADD CONSTRAINT FK_E1CAD839EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE remark_private DROP FOREIGN KEY FK_127F665EC4A1883');
        $this->addSql('ALTER TABLE remark_private ADD CONSTRAINT FK_127F665EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE remark DROP FOREIGN KEY FK_E1CAD839EC4A1883');
        $this->addSql('ALTER TABLE remark ADD CONSTRAINT FK_E1CAD839EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE remark_private DROP FOREIGN KEY FK_127F665EC4A1883');
        $this->addSql('ALTER TABLE remark_private ADD CONSTRAINT FK_127F665EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
    }
}
