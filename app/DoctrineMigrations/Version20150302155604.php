<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Vitoop\InfomgmtBundle\Entity\Book;


/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20150302155604 extends AbstractMigration implements ContainerAwareInterface
{
    private $container;

    public function setContainer(ContainerInterface $container = null)
    {
        $this->container = $container;
    }

    public function postUp(Schema $schema)
    {
        $em = $this->container->get('doctrine.orm.entity_manager');
        $book = new Book();
        $book->setAuthor('Author');
        $book->setCreatedAt(new \DateTime());
        $book->setIsbn10('1234567890');
        $book->setIsbn13('12345678912345');
        $book->setIssuer('Issuer');
        $book->setPublisher('Publisher');
        $book->setKind('Roman');
        $book->setLang('de');
        $book->setCountry('XX');
        $book->setName('First Book');
        $book->setYear('1999');
        $book->setTnop(112);
        $book->setUser($em->getRepository('VitoopInfomgmtBundle:User')->find(1));
        $em->persist($book);
        $em->flush();
    }

    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE book (id INT NOT NULL, author VARCHAR(256) NOT NULL, publisher VARCHAR(256) NOT NULL, issuer VARCHAR(256) NOT NULL, kind VARCHAR(100) NOT NULL, isbn13 VARCHAR(17) NOT NULL, isbn10 VARCHAR(13) NOT NULL, tnop INT NOT NULL, year VARCHAR(20) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE book ADD CONSTRAINT FK_CBE5A331BF396750 FOREIGN KEY (id) REFERENCES resource (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE book');
    }
}
