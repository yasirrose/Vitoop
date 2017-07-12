<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;
use Vitoop\InfomgmtBundle\Validator\Constraints\DateFormat as DateFormatAssert;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;
use Vitoop\InfomgmtBundle\Entity\Downloadable\DownloadableInterface;

/**
 * @ORM\Table(name="teli")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\TeliRepository")
 */
class Teli extends Resource implements DownloadableInterface
{
    use \Vitoop\InfomgmtBundle\Entity\UrlCheck\UrlCheckTrait;
    use \Vitoop\InfomgmtBundle\Entity\Downloadable\DownloadableTrait;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     */
    protected $id;

    /**
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     */
    protected $url;

    /**
     * @ORM\Column(name="author", type="string", length=128)
     */
    protected $author;

    public function __construct()
    {
        parent::__construct();
        $this->markAsNotDownloaded();
    }

    /**
     * @ORM\Embedded(class="Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate", columnPrefix="release_")
     * @Assert\NotBlank
     * @DateFormatAssert
     */
    protected $releaseDate;

    /**
     * Get ResourceTypeIdx
     *
     * Get the the numerical Index of the resource_type as used in the
     * discriminator map as follows:
     * "0" = "Resource", "1" = "Pdf", "2"="Address", "3" = "Link",
     * "4" = "Teli", "5" = "Lexicon", "6" = "Project"
     *
     * @return integer
     */
    public function getResourceTypeIdx()
    {
        return 4;
    }

    /**
     * Get ResourceType
     *
     * Gets the resource_type of a Resource. (e.g. 'pdf, 'teli' ...)
     *
     * @return string
     */
    public function getResourceType()
    {
        return 'teli';
    }

    public function getResourceExtension()
    {
        return 'pdf';
    }
    
    static public function getSearcheableColumns()
    {
        return [
            'name',
            'author',
            'username'
        ];
    }
    
    /**
     * {@inheritdoc}
     */
    public function getViewLink()
    {
        return $this->getUrl();
    }

    /**
     * Set id
     *
     * @param integer $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set url
     *
     * @param string $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set author
     *
     * @param string $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
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
     * Set releaseDate
     *
     * @param string $releaseDate
     */
    public function setReleaseDate($releaseDate)
    {
        $this->releaseDate = $releaseDate;
    }

    /**
     * Get releaseDate
     *
     * @return string
     */
    public function getReleaseDate()
    {
        return $this->releaseDate;
    }

    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->author = $this->author;
        $dto->url = $this->url;
        $dto->releaseDate = $this->releaseDate;

        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Teli
    {
        $resource = new static();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->author = $dto->author;
        $this->url = $dto->url;
        $this->releaseDate = PublishedDate::createFromString($dto->releaseDate);
    }
}
