<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160606185117 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE users_resources (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, resource_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, INDEX IDX_891B914FA76ED395 (user_id), INDEX IDX_891B914F89329D25 (resource_id), UNIQUE INDEX uniqueusersres_idx (resource_id, user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE users_resources ADD CONSTRAINT FK_891B914FA76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE users_resources ADD CONSTRAINT FK_891B914F89329D25 FOREIGN KEY (resource_id) REFERENCES resource (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE users_resources');
    }
}
