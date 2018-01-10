<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Entity\UrlCheck\UrlCheckInterface;
use Vitoop\InfomgmtBundle\Validator\Constraints\DateFormat as DateFormatAssert;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;
use Vitoop\InfomgmtBundle\Entity\Downloadable\DownloadableInterface;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;

/**
 * @ORM\Table(name="pdf")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\PdfRepository")
 */
class Pdf extends Resource implements DownloadableInterface, UrlCheckInterface
{
    use \Vitoop\InfomgmtBundle\Entity\UrlCheck\UrlCheckTrait;
    use \Vitoop\InfomgmtBundle\Entity\Downloadable\DownloadableTrait;

    /**
     * @ORM\Column(name="author", type="string", length=128)
     */
    protected $author;

    /**
     * @ORM\Column(name="publisher", type="string", length=128)
     */
    protected $publisher;

    /**
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     */
    protected $url;

    /**
     * @ORM\Column(name="tnop", type="integer")
     */
    protected $tnop;

    /**
     * @ORM\Embedded(class="Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate", columnPrefix="pdf_")
     * @Assert\NotBlank
     * @DateFormatAssert
     */
    protected $pdfDate;

    public function __construct()
    {
        parent::__construct();
        $this->markAsNotDownloaded();
        $this->unskip();
    }

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
        return 1;
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
        return 'pdf';
    }

    public function getResourceExtension()
    {
        return 'pdf';
    }

    public static function getSearcheableColumns()
    {
        return [
            'name',
            'author',
            'tnop',
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
     * Set publisher
     *
     * @param string $publisher
     */
    public function setPublisher($publisher)
    {
        $this->publisher = $publisher;
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
     * Set tnop
     *
     * @param integer $tnop
     */
    public function setTnop($tnop)
    {
        $this->tnop = $tnop;
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
     * Set pdfDate
     *
     * @param string $pdfDate
     */
    public function setPdfDate($pdfDate)
    {
        $this->pdfDate = $pdfDate;
    }

    /**
     * Get pdfDate
     *
     * @return string
     */
    public function getPdfDate()
    {
        return $this->pdfDate;
    }

    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->author = $this->author;
        $dto->publisher = $this->publisher;
        $dto->url = $this->url;
        $dto->tnop = $this->tnop;
        $dto->pdfDate = $this->pdfDate;

        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Pdf
    {
        $resource = new static();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->author = $dto->author;
        $this->publisher = $dto->publisher;
        $this->url = $dto->url;
        $this->tnop = $dto->tnop;
        $this->pdfDate = PublishedDate::createFromString($dto->pdfDate);
    }
}
