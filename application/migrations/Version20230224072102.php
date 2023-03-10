<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230224072102 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql('CREATE TABLE IF NOT EXISTS user_mail_detail (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, resource_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, INDEX IDX_891B914FA76ED395 (user_id), INDEX IDX_891B914F89329D25 (resource_id), UNIQUE INDEX uniqueusersres_idx (resource_id, user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_mail_detail ADD CONSTRAINT FK_891B914FA76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE user_mail_detail ADD CONSTRAINT FK_891B914F89329D25 FOREIGN KEY (resource_id) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE user_mail_detail ADD send_mail VARCHAR(255) DEFAULT "0"');
    }

    public function down(Schema $schema) : void
    {
        $this->addSql('ALTER TABLE user_mail_detail DROP FOREIGN KEY FK_891B914F89329D25');
        $this->addSql('ALTER TABLE user_mail_detail DROP FOREIGN KEY FK_891B914FA76ED395');
        $this->addSql('DROP TABLE user_mail_detail');
    }
}
