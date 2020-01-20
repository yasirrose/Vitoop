<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191227125828 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->addSql('CREATE TABLE IF NOT EXISTS conversation (id INT NOT NULL, description TEXT NOT NULL, conversation_data_id INT DEFAULT NULL, UNIQUE INDEX UNIQ_2FB3D0EEA1EBAD59 (conversation_data_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS conversation_data (id INT AUTO_INCREMENT NOT NULL, sheet MEDIUMTEXT NOT NULL, is_for_related_users TINYINT(1) DEFAULT \'0\' NOT NULL,, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS conversation_messages (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(10000) NOT NULL, id_user INT DEFAULT NULL, created_at DATETIME NOT NULL, id_conversation_data INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS rel_conversation_user (id INT AUTO_INCREMENT NOT NULL, id_conversation_data INT DEFAULT NULL,  id_user INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rel_conversation_user ADD CONSTRAINT FK_82C10239B7A34E51 FOREIGN KEY (id_conversation_data) REFERENCES conversation_data (id)');
        $this->addSql('ALTER TABLE rel_conversation_user ADD CONSTRAINT FK_82C102396B3CA4B1 FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->addSql('ALTER TABLE rel_conversation_user DROP FOREIGN KEY FK_82C10239B7A34E51');
        $this->addSql('ALTER TABLE rel_conversation_user DROP FOREIGN KEY FK_82C102396B3CA4B1');
        $this->addSql('DROP TABLE conversation');
        $this->addSql('DROP TABLE conversation_data');
        $this->addSql('DROP TABLE conversation_messages');
        $this->addSql('DROP TABLE rel_conversation_user');

    }
}
