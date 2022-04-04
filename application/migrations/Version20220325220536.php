<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220325220536 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        $this->addSql("INSERT INTO languages (code, name, sort_order) VALUES('ml', 'Multi-Language', 1)");
        $this->addSql("UPDATE languages SET sort_order=2 WHERE code='de'");
        $this->addSql("UPDATE languages SET sort_order=3 WHERE code='en'");
        $this->addSql("UPDATE languages SET sort_order=4 WHERE code='es'");
        $this->addSql("UPDATE languages SET sort_order=5 WHERE code='fr'");
        $this->addSql("UPDATE languages SET sort_order=6 WHERE code='nl'");
        $this->addSql("UPDATE languages SET sort_order=7 WHERE code='po'");
        $this->addSql("UPDATE languages SET sort_order=8 WHERE code='ru'");
    }

    public function down(Schema $schema) : void
    {
        $this->addSql("DELETE FROM languages WHERE code='ml'");
        $this->addSql("UPDATE languages SET sort_order=1 WHERE code='de'");
        $this->addSql("UPDATE languages SET sort_order=2 WHERE code='en'");
        $this->addSql("UPDATE languages SET sort_order=3 WHERE code='es'");
        $this->addSql("UPDATE languages SET sort_order=4 WHERE code='fr'");
        $this->addSql("UPDATE languages SET sort_order=5 WHERE code='nl'");
        $this->addSql("UPDATE languages SET sort_order=6 WHERE code='po'");
        $this->addSql("UPDATE languages SET sort_order=7 WHERE code='ru'");
    }
}
