<?php

namespace DoctrineMigrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181100000001 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->skipIf($schema->hasTable('options'));

        $this->addSql('CREATE TABLE IF NOT EXISTS resource (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, language VARCHAR(2) DEFAULT NULL, country VARCHAR(2) DEFAULT NULL, name VARCHAR(160) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, doctrine2_dc SMALLINT NOT NULL, INDEX IDX_BC91F4166B3CA4B (id_user), INDEX IDX_BC91F416D4DB71B5 (language), INDEX IDX_BC91F4165373C966 (country), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS pdf (id INT NOT NULL, author VARCHAR(128) NOT NULL, publisher VARCHAR(128) NOT NULL, url VARCHAR(255) NOT NULL, tnop INT NOT NULL, last_checked_at DATETIME DEFAULT NULL, is_skip TINYINT(1) DEFAULT \'0\' NOT NULL, is_downloaded SMALLINT DEFAULT 0 NOT NULL, downloaded_at DATETIME DEFAULT NULL, pdf_date VARCHAR(10) NOT NULL, pdf_order BIGINT DEFAULT NULL, UNIQUE INDEX UNIQ_EF0DB8CF47645AE (url), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS project (id INT NOT NULL, project_data_id INT DEFAULT NULL, description TEXT NOT NULL, UNIQUE INDEX UNIQ_2FB3D0EEA1EBAD59 (project_data_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS vitoop_user (id INT AUTO_INCREMENT NOT NULL, user_config_id INT DEFAULT NULL, user_data_id INT DEFAULT NULL, username VARCHAR(25) NOT NULL, email VARCHAR(60) NOT NULL, password VARCHAR(40) NOT NULL, reset_password_token VARCHAR(255) DEFAULT NULL, salt VARCHAR(40) NOT NULL, is_active TINYINT(1) NOT NULL, is_agreed_with_terms TINYINT(1) DEFAULT \'1\' NOT NULL, is_show_help TINYINT(1) DEFAULT \'1\' NOT NULL, last_logined_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_942E46AAF85E0677 (username), UNIQUE INDEX UNIQ_942E46AAE7927C74 (email), UNIQUE INDEX UNIQ_942E46AA243B8B67 (user_config_id), UNIQUE INDEX UNIQ_942E46AA6FF8BF36 (user_data_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS rel_resource_resource (id INT AUTO_INCREMENT NOT NULL, id_resource1 INT DEFAULT NULL, id_resource2 INT DEFAULT NULL, id_user INT DEFAULT NULL, deleted_by_id_user INT DEFAULT NULL, coefficient DOUBLE PRECISION DEFAULT \'0\' NOT NULL, INDEX IDX_BB65537CF7817735 (id_resource1), INDEX IDX_BB65537C6E88268F (id_resource2), INDEX IDX_BB65537C6B3CA4B (id_user), INDEX IDX_BB65537C5D2FB0A4 (deleted_by_id_user), UNIQUE INDEX uniquerelresres_idx (id_resource1, id_resource2, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS comment (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, text VARCHAR(512) NOT NULL, created_at DATETIME NOT NULL, is_visible TINYINT(1) DEFAULT \'1\' NOT NULL, INDEX IDX_9474526C6B3CA4B (id_user), INDEX IDX_9474526CEC4A1883 (id_resource), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS to_do_item (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, title VARCHAR(300) NOT NULL, text VARCHAR(10000) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, sort_order INT DEFAULT 0 NOT NULL, INDEX IDX_11B395EA6B3CA4B (id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS options (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, value VARCHAR(10000) NOT NULL, UNIQUE INDEX UNIQ_D035FA875E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS remark_private (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, created_at DATETIME NOT NULL, text VARCHAR(2048) NOT NULL, INDEX IDX_127F6656B3CA4B (id_user), INDEX IDX_127F665EC4A1883 (id_resource), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS languages (code VARCHAR(2) NOT NULL, name VARCHAR(255) NOT NULL, sort_order INT DEFAULT NULL, PRIMARY KEY(code)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS pdf_annotation (id INT AUTO_INCREMENT NOT NULL, pdf_id INT DEFAULT NULL, user_id INT DEFAULT NULL, annotations LONGTEXT NOT NULL COMMENT \'(DC2Type:json_array)\', INDEX IDX_1479CCC4511FC912 (pdf_id), INDEX IDX_1479CCC4A76ED395 (user_id), UNIQUE INDEX uniqpdfannot_idx (pdf_id, user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS project_data (id INT AUTO_INCREMENT NOT NULL, sheet MEDIUMTEXT NOT NULL, is_private TINYINT(1) DEFAULT \'0\' NOT NULL, is_for_related_users TINYINT(1) DEFAULT \'0\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS countries (code VARCHAR(2) NOT NULL, name VARCHAR(255) NOT NULL, sort_order INT DEFAULT NULL, PRIMARY KEY(code)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS address (id INT NOT NULL, name2 VARCHAR(64) NOT NULL, street VARCHAR(64) NOT NULL, zip VARCHAR(5) NOT NULL, city VARCHAR(64) NOT NULL, contact1 VARCHAR(32) NOT NULL, contact2 VARCHAR(32) NOT NULL, contact3 VARCHAR(32) NOT NULL, contact4 VARCHAR(128) NOT NULL, contact5 VARCHAR(128) NOT NULL, contact_key VARCHAR(5) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS users_resources (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, resource_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, INDEX IDX_891B914FA76ED395 (user_id), INDEX IDX_891B914F89329D25 (resource_id), UNIQUE INDEX uniqueusersres_idx (resource_id, user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS user_config (id INT AUTO_INCREMENT NOT NULL, max_per_page INT NOT NULL, number_of_todo_elements INT DEFAULT 12 NOT NULL, height_of_todo_list INT DEFAULT 550 NOT NULL, is_check_max_link TINYINT(1) DEFAULT \'1\' NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS vitoop_blog (id INT AUTO_INCREMENT NOT NULL, sheet MEDIUMTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS wiki_redirect (wiki_page_id INT NOT NULL, id_lexicon INT DEFAULT NULL, wiki_title VARCHAR(128) NOT NULL, wiki_fullurl VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_28CA9BE484BC41E7 (wiki_title), UNIQUE INDEX UNIQ_28CA9BE4C0D3845D (wiki_fullurl), INDEX IDX_28CA9BE4DAAC93BF (id_lexicon), PRIMARY KEY(wiki_page_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS flag (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, created_at DATETIME NOT NULL, type SMALLINT NOT NULL, info VARCHAR(128) NOT NULL, INDEX IDX_D1F4EB9A6B3CA4B (id_user), INDEX IDX_D1F4EB9AEC4A1883 (id_resource), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS users_readable (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, resource_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL, INDEX IDX_BADB323AA76ED395 (user_id), INDEX IDX_BADB323A89329D25 (resource_id), UNIQUE INDEX uniqueusersred_idx (resource_id, user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS help (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(10000) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS vitoop_user_agreement (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, ip VARCHAR(30) DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_877039E7A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS tag (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(48) NOT NULL, UNIQUE INDEX UNIQ_389B7833B8BA7C7 (text), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS watchlist (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, note VARCHAR(255) NOT NULL, INDEX IDX_340388D36B3CA4B (id_user), INDEX IDX_340388D3EC4A1883 (id_resource), UNIQUE INDEX uniqueentry_idx (id_resource, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS remark (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, created_at DATETIME NOT NULL, text VARCHAR(2048) NOT NULL, ip VARCHAR(30) DEFAULT NULL, is_locked TINYINT(1) NOT NULL, INDEX IDX_E1CAD8396B3CA4B (id_user), INDEX IDX_E1CAD839EC4A1883 (id_resource), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS link (id INT NOT NULL, url VARCHAR(255) NOT NULL, is_hp TINYINT(1) NOT NULL, last_checked_at DATETIME DEFAULT NULL, is_skip TINYINT(1) DEFAULT \'0\' NOT NULL, UNIQUE INDEX UNIQ_36AC99F1F47645AE (url), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS book (id INT NOT NULL, author VARCHAR(256) NOT NULL, publisher VARCHAR(256) NOT NULL, issuer VARCHAR(256) DEFAULT NULL, kind VARCHAR(100) NOT NULL, isbn VARCHAR(17) NOT NULL, tnop INT NOT NULL, year VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS vitoop_user_invitation (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, subject VARCHAR(64) NOT NULL, mail VARCHAR(4096) NOT NULL, email VARCHAR(60) NOT NULL, secret VARCHAR(32) NOT NULL, until DATETIME NOT NULL, UNIQUE INDEX UNIQ_F3D9E7CBE7927C74 (email), UNIQUE INDEX UNIQ_F3D9E7CB5CA2E8E5 (secret), INDEX IDX_F3D9E7CB6B3CA4B (id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS rel_project_user (id INT AUTO_INCREMENT NOT NULL, id_project_data INT DEFAULT NULL, id_user INT DEFAULT NULL, read_only TINYINT(1) DEFAULT \'1\' NOT NULL, INDEX IDX_82C10239B7A34E09 (id_project_data), INDEX IDX_82C102396B3CA4B (id_user), UNIQUE INDEX uniquerelprjusr_idx (id_project_data, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS rating (id INT AUTO_INCREMENT NOT NULL, id_user INT DEFAULT NULL, id_resource INT DEFAULT NULL, mark INT NOT NULL, INDEX IDX_D88926226B3CA4B (id_user), INDEX IDX_D8892622EC4A1883 (id_resource), UNIQUE INDEX uniquerating_idx (id_resource, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS lexicon (id INT NOT NULL, wiki_page_id INT NOT NULL, wiki_fullurl VARCHAR(255) NOT NULL, description VARCHAR(5000) NOT NULL, updated DATETIME NOT NULL, UNIQUE INDEX UNIQ_4313ACFC4759321 (wiki_page_id), UNIQUE INDEX UNIQ_4313ACFC0D3845D (wiki_fullurl), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS project_rel_divider (id INT AUTO_INCREMENT NOT NULL, id_project_data INT DEFAULT NULL, text VARCHAR(350) DEFAULT NULL, coefficient INT NOT NULL, INDEX IDX_8D788647B7A34E09 (id_project_data), UNIQUE INDEX uniqueprjreldiv_idx (coefficient, id_project_data), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS teli (id INT NOT NULL, url VARCHAR(255) NOT NULL, author VARCHAR(128) NOT NULL, last_checked_at DATETIME DEFAULT NULL, is_skip TINYINT(1) DEFAULT \'0\' NOT NULL, is_downloaded SMALLINT DEFAULT 0 NOT NULL, downloaded_at DATETIME DEFAULT NULL, release_date VARCHAR(10) NOT NULL, release_order BIGINT DEFAULT NULL, UNIQUE INDEX UNIQ_76231C4BF47645AE (url), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS rel_resource_tag (id INT AUTO_INCREMENT NOT NULL, id_resource INT DEFAULT NULL, id_tag INT DEFAULT NULL, id_user INT DEFAULT NULL, deleted_by_id_user INT DEFAULT NULL, INDEX IDX_151325A2EC4A1883 (id_resource), INDEX IDX_151325A29D2D5FD9 (id_tag), INDEX IDX_151325A26B3CA4B (id_user), INDEX IDX_151325A25D2FB0A4 (deleted_by_id_user), UNIQUE INDEX uniquetag_idx (id_resource, id_tag, id_user), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE IF NOT EXISTS user_data (id INT AUTO_INCREMENT NOT NULL, sheet MEDIUMTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F4166B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F416D4DB71B5 FOREIGN KEY (language) REFERENCES languages (code)');
        $this->addSql('ALTER TABLE resource ADD CONSTRAINT FK_BC91F4165373C966 FOREIGN KEY (country) REFERENCES countries (code)');
        $this->addSql('ALTER TABLE pdf ADD CONSTRAINT FK_EF0DB8CBF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EEA1EBAD59 FOREIGN KEY (project_data_id) REFERENCES project_data (id)');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EEBF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vitoop_user ADD CONSTRAINT FK_942E46AA243B8B67 FOREIGN KEY (user_config_id) REFERENCES user_config (id)');
        $this->addSql('ALTER TABLE vitoop_user ADD CONSTRAINT FK_942E46AA6FF8BF36 FOREIGN KEY (user_data_id) REFERENCES user_data (id)');
        $this->addSql('ALTER TABLE rel_resource_resource ADD CONSTRAINT FK_BB65537CF7817735 FOREIGN KEY (id_resource1) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE rel_resource_resource ADD CONSTRAINT FK_BB65537C6E88268F FOREIGN KEY (id_resource2) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE rel_resource_resource ADD CONSTRAINT FK_BB65537C6B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE rel_resource_resource ADD CONSTRAINT FK_BB65537C5D2FB0A4 FOREIGN KEY (deleted_by_id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526C6B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CEC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE to_do_item ADD CONSTRAINT FK_11B395EA6B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE remark_private ADD CONSTRAINT FK_127F6656B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE remark_private ADD CONSTRAINT FK_127F665EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE pdf_annotation ADD CONSTRAINT FK_1479CCC4511FC912 FOREIGN KEY (pdf_id) REFERENCES pdf (id)');
        $this->addSql('ALTER TABLE pdf_annotation ADD CONSTRAINT FK_1479CCC4A76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F81BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE users_resources ADD CONSTRAINT FK_891B914FA76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE users_resources ADD CONSTRAINT FK_891B914F89329D25 FOREIGN KEY (resource_id) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE wiki_redirect ADD CONSTRAINT FK_28CA9BE4DAAC93BF FOREIGN KEY (id_lexicon) REFERENCES lexicon (id)');
        $this->addSql('ALTER TABLE flag ADD CONSTRAINT FK_D1F4EB9A6B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE flag ADD CONSTRAINT FK_D1F4EB9AEC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE users_readable ADD CONSTRAINT FK_BADB323AA76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE users_readable ADD CONSTRAINT FK_BADB323A89329D25 FOREIGN KEY (resource_id) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE vitoop_user_agreement ADD CONSTRAINT FK_877039E7A76ED395 FOREIGN KEY (user_id) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D36B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE remark ADD CONSTRAINT FK_E1CAD8396B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE remark ADD CONSTRAINT FK_E1CAD839EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE link ADD CONSTRAINT FK_36AC99F1BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A331BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE vitoop_user_invitation ADD CONSTRAINT FK_F3D9E7CB6B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE rel_project_user ADD CONSTRAINT FK_82C10239B7A34E09 FOREIGN KEY (id_project_data) REFERENCES project_data (id)');
        $this->addSql('ALTER TABLE rel_project_user ADD CONSTRAINT FK_82C102396B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE rating ADD CONSTRAINT FK_D88926226B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE rating ADD CONSTRAINT FK_D8892622EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE lexicon ADD CONSTRAINT FK_4313ACFBF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE project_rel_divider ADD CONSTRAINT FK_8D788647B7A34E09 FOREIGN KEY (id_project_data) REFERENCES project_data (id)');
        $this->addSql('ALTER TABLE teli ADD CONSTRAINT FK_76231C4BBF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rel_resource_tag ADD CONSTRAINT FK_151325A2EC4A1883 FOREIGN KEY (id_resource) REFERENCES resource (id)');
        $this->addSql('ALTER TABLE rel_resource_tag ADD CONSTRAINT FK_151325A29D2D5FD9 FOREIGN KEY (id_tag) REFERENCES tag (id)');
        $this->addSql('ALTER TABLE rel_resource_tag ADD CONSTRAINT FK_151325A26B3CA4B FOREIGN KEY (id_user) REFERENCES vitoop_user (id)');
        $this->addSql('ALTER TABLE rel_resource_tag ADD CONSTRAINT FK_151325A25D2FB0A4 FOREIGN KEY (deleted_by_id_user) REFERENCES vitoop_user (id)');

        $this->addSql("INSERT INTO options(name, value) VALUES ('invitation', false)");
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE pdf DROP FOREIGN KEY FK_EF0DB8CBF396750');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EEBF396750');
        $this->addSql('ALTER TABLE rel_resource_resource DROP FOREIGN KEY FK_BB65537CF7817735');
        $this->addSql('ALTER TABLE rel_resource_resource DROP FOREIGN KEY FK_BB65537C6E88268F');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CEC4A1883');
        $this->addSql('ALTER TABLE remark_private DROP FOREIGN KEY FK_127F665EC4A1883');
        $this->addSql('ALTER TABLE address DROP FOREIGN KEY FK_D4E6F81BF396750');
        $this->addSql('ALTER TABLE users_resources DROP FOREIGN KEY FK_891B914F89329D25');
        $this->addSql('ALTER TABLE flag DROP FOREIGN KEY FK_D1F4EB9AEC4A1883');
        $this->addSql('ALTER TABLE users_readable DROP FOREIGN KEY FK_BADB323A89329D25');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3EC4A1883');
        $this->addSql('ALTER TABLE remark DROP FOREIGN KEY FK_E1CAD839EC4A1883');
        $this->addSql('ALTER TABLE link DROP FOREIGN KEY FK_36AC99F1BF396750');
        $this->addSql('ALTER TABLE book DROP FOREIGN KEY FK_CBE5A331BF396750');
        $this->addSql('ALTER TABLE rating DROP FOREIGN KEY FK_D8892622EC4A1883');
        $this->addSql('ALTER TABLE lexicon DROP FOREIGN KEY FK_4313ACFBF396750');
        $this->addSql('ALTER TABLE teli DROP FOREIGN KEY FK_76231C4BBF396750');
        $this->addSql('ALTER TABLE rel_resource_tag DROP FOREIGN KEY FK_151325A2EC4A1883');
        $this->addSql('ALTER TABLE pdf_annotation DROP FOREIGN KEY FK_1479CCC4511FC912');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F4166B3CA4B');
        $this->addSql('ALTER TABLE rel_resource_resource DROP FOREIGN KEY FK_BB65537C6B3CA4B');
        $this->addSql('ALTER TABLE rel_resource_resource DROP FOREIGN KEY FK_BB65537C5D2FB0A4');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526C6B3CA4B');
        $this->addSql('ALTER TABLE to_do_item DROP FOREIGN KEY FK_11B395EA6B3CA4B');
        $this->addSql('ALTER TABLE remark_private DROP FOREIGN KEY FK_127F6656B3CA4B');
        $this->addSql('ALTER TABLE pdf_annotation DROP FOREIGN KEY FK_1479CCC4A76ED395');
        $this->addSql('ALTER TABLE users_resources DROP FOREIGN KEY FK_891B914FA76ED395');
        $this->addSql('ALTER TABLE flag DROP FOREIGN KEY FK_D1F4EB9A6B3CA4B');
        $this->addSql('ALTER TABLE users_readable DROP FOREIGN KEY FK_BADB323AA76ED395');
        $this->addSql('ALTER TABLE vitoop_user_agreement DROP FOREIGN KEY FK_877039E7A76ED395');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D36B3CA4B');
        $this->addSql('ALTER TABLE remark DROP FOREIGN KEY FK_E1CAD8396B3CA4B');
        $this->addSql('ALTER TABLE vitoop_user_invitation DROP FOREIGN KEY FK_F3D9E7CB6B3CA4B');
        $this->addSql('ALTER TABLE rel_project_user DROP FOREIGN KEY FK_82C102396B3CA4B');
        $this->addSql('ALTER TABLE rating DROP FOREIGN KEY FK_D88926226B3CA4B');
        $this->addSql('ALTER TABLE rel_resource_tag DROP FOREIGN KEY FK_151325A26B3CA4B');
        $this->addSql('ALTER TABLE rel_resource_tag DROP FOREIGN KEY FK_151325A25D2FB0A4');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F416D4DB71B5');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EEA1EBAD59');
        $this->addSql('ALTER TABLE rel_project_user DROP FOREIGN KEY FK_82C10239B7A34E09');
        $this->addSql('ALTER TABLE project_rel_divider DROP FOREIGN KEY FK_8D788647B7A34E09');
        $this->addSql('ALTER TABLE resource DROP FOREIGN KEY FK_BC91F4165373C966');
        $this->addSql('ALTER TABLE vitoop_user DROP FOREIGN KEY FK_942E46AA243B8B67');
        $this->addSql('ALTER TABLE rel_resource_tag DROP FOREIGN KEY FK_151325A29D2D5FD9');
        $this->addSql('ALTER TABLE wiki_redirect DROP FOREIGN KEY FK_28CA9BE4DAAC93BF');
        $this->addSql('ALTER TABLE vitoop_user DROP FOREIGN KEY FK_942E46AA6FF8BF36');
        $this->addSql('DROP TABLE resource');
        $this->addSql('DROP TABLE pdf');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE vitoop_user');
        $this->addSql('DROP TABLE rel_resource_resource');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE to_do_item');
        $this->addSql('DROP TABLE options');
        $this->addSql('DROP TABLE remark_private');
        $this->addSql('DROP TABLE languages');
        $this->addSql('DROP TABLE pdf_annotation');
        $this->addSql('DROP TABLE project_data');
        $this->addSql('DROP TABLE countries');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE users_resources');
        $this->addSql('DROP TABLE user_config');
        $this->addSql('DROP TABLE vitoop_blog');
        $this->addSql('DROP TABLE wiki_redirect');
        $this->addSql('DROP TABLE flag');
        $this->addSql('DROP TABLE users_readable');
        $this->addSql('DROP TABLE help');
        $this->addSql('DROP TABLE vitoop_user_agreement');
        $this->addSql('DROP TABLE tag');
        $this->addSql('DROP TABLE watchlist');
        $this->addSql('DROP TABLE remark');
        $this->addSql('DROP TABLE link');
        $this->addSql('DROP TABLE book');
        $this->addSql('DROP TABLE vitoop_user_invitation');
        $this->addSql('DROP TABLE rel_project_user');
        $this->addSql('DROP TABLE rating');
        $this->addSql('DROP TABLE lexicon');
        $this->addSql('DROP TABLE project_rel_divider');
        $this->addSql('DROP TABLE teli');
        $this->addSql('DROP TABLE rel_resource_tag');
        $this->addSql('DROP TABLE user_data');
    }
}
