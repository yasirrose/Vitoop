<?php

namespace DoctrineMigrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191227125828 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE conversation_messages (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_conversation_data INT DEFAULT NULL, text LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_3B4CA1866B3CA4B (id_user), INDEX IDX_3B4CA1868BBBF868 (id_conversation_data), PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rel_conversation_user (id INT AUTO_INCREMENT NOT NULL, id_conversation_data INT DEFAULT NULL, id_user INT DEFAULT NULL, INDEX IDX_F394D8928BBBF868 (id_conversation_data), INDEX IDX_F394D8926B3CA4B (id_user), UNIQUE INDEX uniquerelconvusr_idx (id_conversation_data, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE conversation_data (id INT AUTO_INCREMENT NOT NULL, sheet MEDIUMTEXT NOT NULL, is_for_related_users TINYINT(1) DEFAULT \'0\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE conversation (id INT NOT NULL, conversation_data_id INT NOT NULL, description TEXT NOT NULL, UNIQUE INDEX UNIQ_8A8E26E9ACA3AF36 (conversation_data_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET UTF8 COLLATE UTF8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE conversation_messages ADD CONSTRAINT FK_3B4CA1866B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE conversation_messages ADD CONSTRAINT FK_3B4CA1868BBBF868 FOREIGN KEY (id_conversation_data) REFERENCES conversation_data (id)');
        $this->addSql('ALTER TABLE rel_conversation_user ADD CONSTRAINT FK_F394D8928BBBF868 FOREIGN KEY (id_conversation_data) REFERENCES conversation_data (id)');
        $this->addSql('ALTER TABLE rel_conversation_user ADD CONSTRAINT FK_F394D8926B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE conversation ADD CONSTRAINT FK_8A8E26E9ACA3AF36 FOREIGN KEY (conversation_data_id) REFERENCES conversation_data (id)');
        $this->addSql('ALTER TABLE conversation ADD CONSTRAINT FK_8A8E26E9BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE conversation_messages DROP FOREIGN KEY FK_3B4CA1868BBBF868');
        $this->addSql('ALTER TABLE rel_conversation_user DROP FOREIGN KEY FK_F394D8928BBBF868');
        $this->addSql('ALTER TABLE conversation DROP FOREIGN KEY FK_8A8E26E9ACA3AF36');
        $this->addSql('DROP TABLE conversation_messages');
        $this->addSql('DROP TABLE rel_conversation_user');
        $this->addSql('DROP TABLE conversation_data');
        $this->addSql('DROP TABLE conversation');

    }
}
