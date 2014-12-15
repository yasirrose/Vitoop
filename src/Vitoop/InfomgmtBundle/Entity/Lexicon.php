<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Table(name="lexicon")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\LexiconRepository")
 */
class Lexicon extends Resource
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     */
    protected $id;

    /**
     * @ORM\Column(name="wiki_page_id", type="integer", unique=true)
     */
    protected $wiki_page_id;

    /**
     * @ORM\Column(name="wiki_fullurl", type="string", length=255, unique=true)
     */
    protected $wiki_fullurl;

    /**
     * @ORM\OneToMany(targetEntity="WikiRedirect", mappedBy="lexicon")
     */
    protected $wiki_redirects;

    public function __construct()
    {
        parent::__construct();
        $this->wiki_redirects = new ArrayCollection();
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
        return 5;
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
        return 'lex';
    }

    /**
     * {@inheritdoc}
     */
    public function getViewLink()
    {
        return $this->getWikiFullurl();
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
     * Set wiki_page_id
     *
     * @param int $wiki_page_id
     */
    public function setWikiPageId($wiki_page_id)
    {
        $this->wiki_page_id = $wiki_page_id;
    }

    /**
     * Get wiki_page_id
     *
     * @return int
     */
    public function getWikiPageId()
    {
        return $this->wiki_page_id;
    }

    /**
     * Set wiki_fullurl
     *
     * @param string $wiki_fullurl
     */
    public function setWikiFullurl($wiki_fullurl)
    {
        $this->wiki_fullurl = $wiki_fullurl;
    }

    /**
     * Get wiki_fullurl
     *
     * @return string
     */
    public function getWikiFullurl()
    {
        return $this->wiki_fullurl;
    }

    /**
     * Add wiki_redirect
     *
     * @param WikiRedirect $wiki_redirect
     */
    public function addWikiRedirect(WikiRedirect $wiki_redirect)
    {
        $this->wiki_redirects[] = $wiki_redirect;
    }

    /**
     * Get wiki_redirects
     *
     * @return ArrayCollection
     */
    public function getWikiRedirects()
    {
        return $this->wiki_redirects;
    }
}