<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181100000000 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql("DELETE FROM migration_versions WHERE version = '20141217160119'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150109133654'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150113160754'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150209135357'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150212123141'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150225144512'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150302112056'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150302155604'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150305111328'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150319135527'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150320154503'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150320160610'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150414143039'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150719222727'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150722003921'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150804205245'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150804205609'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150804210007'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150810150215'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150811142039'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20150910163331'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160124235137'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160316191423'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160404112625'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160407132537'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160428195428'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160516194605'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20160606185117'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20161219210916'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20170123203248'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20170220203801'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20170710193923'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20170830201150'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20171013202747'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20171226194520'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20180220195440'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20180314205529'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20180524202305'");
        $this->addSql("DELETE FROM migration_versions WHERE version = '20181030193502'");

        $this->addSql("INSERT INTO migration_versions(version) VALUES ('20181100000001')");

    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

    }
}
