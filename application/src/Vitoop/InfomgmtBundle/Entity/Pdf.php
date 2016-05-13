<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Validator\Constraints\DateFormat as DateFormatAssert;


/**
 * @ORM\Table(name="pdf")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\PdfRepository")
 */
class Pdf extends Resource implements DownloadableInterface
{
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
     * @ORM\Column(name="pdf_date", type="string", length=10)
     * @Assert\NotBlank
     * @DateFormatAssert
     */
    protected $pdf_date;

    /**
     * @ORM\Column(name="is_downloaded", type="smallint", options={"default" = 0})
     *
     * 0 = Not downloaded still
     * 1 = Downloaded on server
     * 5 = Wrong url
     * code = Download error (404 or something else)
     */
    protected $isDownloaded;

    /**
     * @ORM\Column(name="downloaded_at", type="datetime", nullable=true, options={"default" = null})
     */
    protected $downloadedAt;


    public function __construct()
    {
        parent::__construct();
        $this->isDownloaded = 0;
        $this->downloadedAt = null;
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
     * Set pdf_date
     *
     * @param string $pdf_date
     */
    public function setPdfDate($pdf_date)
    {
        $this->pdf_date = $pdf_date;
    }

    /**
     * Get pdf_date
     *
     * @return string
     */
    public function getPdfDate()
    {
        return $this->pdf_date;
    }

    /**
     * Set isDownloaded
     *
     * @param integer $isDownloaded
     * @return Pdf
     */
    public function setIsDownloaded($isDownloaded)
    {
        $this->isDownloaded = $isDownloaded;

        return $this;
    }

    /**
     * Get isDownloaded
     *
     * @return integer 
     */
    public function getIsDownloaded()
    {
        return $this->isDownloaded;
    }

    /**
     * Set downloadedAt
     *
     * @param \DateTime $downloadedAt
     * @return Pdf
     */
    public function setDownloadedAt($downloadedAt)
    {
        $this->downloadedAt = $downloadedAt;

        return $this;
    }

    /**
     * Get downloadedAt
     *
     * @return \DateTime 
     */
    public function getDownloadedAt()
    {
        return $this->downloadedAt;
    }
}
