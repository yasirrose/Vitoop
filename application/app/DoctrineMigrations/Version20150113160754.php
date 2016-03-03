<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20150113160754 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        
        $this->addSql('CREATE TABLE remark_private (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, created_at DATETIME NOT NULL, text VARCHAR(2048) NOT NULL, INDEX IDX_127F6656B3CA4B (id_user), INDEX IDX_127F665EC4A1883 (id_resource), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE remark_private ADD CONSTRAINT FK_127F6656B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE remark_private ADD CONSTRAINT FK_127F665EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');
        
        $this->addSql('DROP TABLE remark_private');
    }
}
