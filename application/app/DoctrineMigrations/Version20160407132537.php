<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20160407132537 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE countries (code VARCHAR(2) NOT NULL COLLATE utf8_general_ci, name VARCHAR(255) NOT NULL, sort_order INT DEFAULT NULL, PRIMARY KEY(code)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE languages (code VARCHAR(2) NOT NULL COLLATE utf8_general_ci, name VARCHAR(255) NOT NULL, sort_order INT DEFAULT NULL, PRIMARY KEY(code)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql("INSERT INTO countries(name, code, sort_order) VALUES('Deutschland','DE',1), ('Dänemark','DK',2), ('Niederlande','NL',3), ('anderes Land', 'XX', 300)");
        $this->addSql("INSERT INTO languages(name, code, sort_order) VALUES('deutsch','de',1), ('englisch','en',2), ('französisch','fr',3), ('spanisch', 'es', 4), ('portugiesisch', 'po', 5), ('niederländisch', 'nl', 6),('andere Sprache', 'xx', 1000)");
        $this->addSql('ALTER TABLE resource CHANGE language lang VARCHAR(2) NOT NULL COLLATE utf8_general_ci, CHANGE country country_temp VARCHAR(2) NOT NULL COLLATE utf8_general_ci');
        $this->addSql('ALTER TABLE resource ADD COLUMN language VARCHAR(2) DEFAULT NULL, ADD COLUMN country VARCHAR(2) DEFAULT NULL');
        $this->addSql('CREATE INDEX IDX_BC91F41631098462 ON resource (language)');
        $this->addSql('CREATE INDEX IDX_BC91F4165373C966 ON resource (country)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F41631098462 FOREIGN KEY (language) REFERENCES languages (code)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F4165373C966 FOREIGN KEY (country) REFERENCES countries (code)');
        $this->addSql("UPDATE resource SET language = lang WHERE lang is not NULL and lang <> ''");
        $this->addSql("UPDATE resource SET country = country_temp WHERE country_temp is not NULL and country_temp <> ''");
        $this->addSql('ALTER TABLE resource DROP COLUMN lang, DROP COLUMN country_temp');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

       $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F4165373C966');
       $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F41631098462');
       $this->addSql('DROP TABLE countries');
       $this->addSql('DROP TABLE languages');
       $this->addSql('DROP INDEX IDX_BC91F41631098462 ON resource');
       $this->addSql('DROP INDEX IDX_BC91F4165373C966 ON resource');
       $this->addSql('ALTER TABLE resource CHANGE language language VARCHAR(2) NOT NULL COLLATE utf8_general_ci, CHANGE country country VARCHAR(2) NOT NULL COLLATE utf8_general_ci');
       
    }
}
