<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200227214708 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE conversation_data_notification (conversation_data_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_88C48DC7ACA3AF36 (conversation_data_id), INDEX IDX_88C48DC7A76ED395 (user_id), PRIMARY KEY(conversation_data_id, user_id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE conversation_data_notification ADD CONSTRAINT FK_88C48DC7ACA3AF36 FOREIGN KEY (conversation_data_id) REFERENCES conversation_data (id)');
        $this->addSql('ALTER TABLE conversation_data_notification ADD CONSTRAINT FK_88C48DC7A76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE conversation_data_notification');
    }
}
