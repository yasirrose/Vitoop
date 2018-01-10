<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20171226194520 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE pdf_annotation (id INT AUTO_INCREMENT NOT NULL, pdf_id INT DEFAULT NULL, user_id INT DEFAULT NULL, annotations LONGTEXT NOT NULL COMMENT \'(DC2Type:json_array)\', INDEX IDX_1479CCC4511FC912 (pdf_id), INDEX IDX_1479CCC4A76ED395 (user_id), UNIQUE INDEX uniqpdfannot_idx (pdf_id, user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE pdf_annotation ADD CONSTRAINT FK_1479CCC4511FC912 FOREIGN KEY (pdf_id) REFERENCES pdf (id)');
        $this->addSql('ALTER TABLE pdf_annotation ADD CONSTRAINT FK_1479CCC4A76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F41631098462');
        $this->addSql('DROP INDEX idx_bc91f41631098462 ON resource');
        $this->addSql('CREATE INDEX IDX_BC91F416D4DB71B5 ON resource (language)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F41631098462 FOREIGN KEY (language) REFERENCES languages (code)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE pdf_annotation');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F416D4DB71B5');
        $this->addSql('DROP INDEX idx_bc91f416d4db71b5 ON resource');
        $this->addSql('CREATE INDEX IDX_BC91F41631098462 ON resource (language)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416D4DB71B5 FOREIGN KEY (language) REFERENCES languages (code)');
    }
}
