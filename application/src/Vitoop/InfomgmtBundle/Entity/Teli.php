<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Validator\Constraints\DateFormat as DateFormatAssert;

/**
 * @ORM\Table(name="teli")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\TeliRepository")
 */
class Teli extends Resource
{
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
    }

    /**
     * @ORM\Column(name="release_date", type="string", length=10)
     * @Assert\NotBlank
     * @DateFormatAssert
     */
    protected $release_date;

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
     * Set release_date
     *
     * @param string $release_date
     */
    public function setReleaseDate($release_date)
    {
        $this->release_date = $release_date;
    }

    /**
     * Get release_date
     *
     * @return string
     */
    public function getReleaseDate()
    {
        return $this->release_date;
    }
}