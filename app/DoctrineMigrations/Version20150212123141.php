<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20150212123141 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE rel_project_user (id INT AUTO_INCREMENT NOT NULL, id_project_data INT DEFAULT NULL, id_user INT DEFAULT NULL, read_only TINYINT(1) DEFAULT \'1\' NOT NULL, INDEX IDX_82C10239B7A34E09 (id_project_data), INDEX IDX_82C102396B3CA4B (id_user), UNIQUE INDEX uniquerelprjusr_idx (id_project_data, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rel_project_user ADD CONSTRAINT FK_82C10239B7A34E09 FOREIGN KEY (id_project_data) REFERENCES project_data (id)');
        $this->addSql('ALTER TABLE rel_project_user ADD CONSTRAINT FK_82C102396B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE project DROP is_private');
        $this->addSql('ALTER TABLE project_data ADD is_private TINYINT(1) DEFAULT \'0\' NOT NULL');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE rel_project_user');
        $this->addSql('ALTER TABLE project ADD is_private TINYINT(1) DEFAULT \'0\' NOT NULL');
        $this->addSql('ALTER TABLE project_data DROP is_private');
    }
}
