<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Validator\Constraints\DateFormat as DateFormatAssert;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;

/**
 * @ORM\Table(name="book")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\BookRepository")
 */
class Book extends Resource
{
    /**
     * @ORM\Column(name="author", type="string", length=256)
     */
    protected $author;

    /**
     * @ORM\Column(name="publisher", type="string", length=256)
     */
    protected $publisher;

    /**
     * @ORM\Column(name="issuer", type="string", length=256, nullable=true)
     */
    protected $issuer;

    /**
     * @ORM\Column(name="kind", type="string", length=100)
     */
    protected $kind;

    /**
     * @ORM\Column(name="isbn13", type="string", length=17)
     */
    protected $isbn13;

    /**
     * @ORM\Column(name="isbn10", type="string", length=13)
     */
    protected $isbn10;

    /**
     * @ORM\Column(name="tnop", type="integer")
     */
    protected $tnop;

    /**
     * @ORM\Column(name="year", type="string", length=20)
     */
    protected $year;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Get ResourceTypeIdx
     *
     * Get the the numerical Index of the resource_type as used in the
     * discriminator map as follows:
     * "0" = "Resource", "1" = "Pdf", "2"="Address", "3" = "Link",
     * "4" = "Teli", "5" = "Lexicon", "6" = "Project", "7" = "Book"
     *
     * @return integer
     */
    public function getResourceTypeIdx()
    {
        return 7;
    }

    /**
     * Get ResourceType
     *
     * Get the resource_type of a Resource. (e.g. 'pdf, 'teli' ...)
     *
     * @return string
     */
    public function getResourceType()
    {
        return 'book';
    }

    static public function getSearcheableColumns()
    {
        return [
            'name',
            'author',
            'tnop',
            'username'
        ];
    }
    
    /**
     * Set author
     *
     * @param string $author
     * @return Book
     */
    public function setAuthor($author)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Get author
     *
     * @return string 
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * Set publisher
     *
     * @param string $publisher
     * @return Book
     */
    public function setPublisher($publisher)
    {
        $this->publisher = $publisher;

        return $this;
    }

    /**
     * Get publisher
     *
     * @return string 
     */
    public function getPublisher()
    {
        return $this->publisher;
    }

    /**
     * Set issuer
     *
     * @param string $issuer
     * @return Book
     */
    public function setIssuer($issuer)
    {
        $this->issuer = $issuer;

        return $this;
    }

    /**
     * Get issuer
     *
     * @return string 
     */
    public function getIssuer()
    {
        return $this->issuer;
    }

    /**
     * Set kind
     *
     * @param string $kind
     * @return Book
     */
    public function setKind($kind)
    {
        $this->kind = $kind;

        return $this;
    }

    /**
     * Get kind
     *
     * @return string 
     */
    public function getKind()
    {
        return $this->kind;
    }

    /**
     * Set isbn13
     *
     * @param string $isbn13
     * @return Book
     */
    public function setIsbn13($isbn13)
    {
        $this->isbn13 = $isbn13;

        return $this;
    }

    /**
     * Get isbn13
     *
     * @return string 
     */
    public function getIsbn13()
    {
        return $this->isbn13;
    }

    /**
     * Set isbn10
     *
     * @param string $isbn10
     * @return Book
     */
    public function setIsbn10($isbn10)
    {
        $this->isbn10 = $isbn10;

        return $this;
    }

    /**
     * Get isbn10
     *
     * @return string 
     */
    public function getIsbn10()
    {
        return $this->isbn10;
    }

    /**
     * Set tnop
     *
     * @param integer $tnop
     * @return Book
     */
    public function setTnop($tnop)
    {
        $this->tnop = $tnop;

        return $this;
    }

    /**
     * Get tnop
     *
     * @return integer 
     */
    public function getTnop()
    {
        return $this->tnop;
    }

    /**
     * Set year
     *
     * @param string $year
     * @return Book
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return string 
     */
    public function getYear()
    {
        return $this->year;
    }
    
    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->author = $this->author;
        $dto->issuer = $this->issuer;
        $dto->isbn13 = $this->isbn13;
        $dto->isbn10 = $this->isbn10;
        $dto->publisher = $this->publisher;
        $dto->kind = $this->kind;
        $dto->tnop = $this->tnop;
        $dto->year = $this->year;

        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Book
    {
        $resource = new static();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->author = $dto->author;
        $this->issuer = $dto->issuer;
        $this->isbn13 = $dto->isbn13;
        $this->isbn10 = $dto->isbn10;
        $this->publisher = $dto->publisher;
        $this->kind = $dto->kind;
        $this->tnop = $dto->tnop;
        $this->year = $dto->year;
    }
}
