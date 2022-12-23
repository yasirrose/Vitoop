<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221222083535 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Change json_array(deprecated) to json type';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pdf_annotation CHANGE annotations annotations JSON NOT NULL');

    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE pdf_annotation CHANGE annotations annotations LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:json_array)\'');
    }
}
