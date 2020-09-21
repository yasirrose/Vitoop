<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="wiki_redirect")
 * @ORM\Entity(repositoryClass="App\Repository\WikiRedirectRepository")
 */
class WikiRedirect
{
    /**
     * @ORM\Column(name="wiki_page_id", type="integer")
     * @ORM\Id()
     */
    protected $wiki_page_id;

    /**
     * @ORM\ManyToOne(targetEntity="Lexicon", inversedBy="wiki_redirects")
     * @ORM\JoinColumn(name="id_lexicon", referencedColumnName="id")
     */
    protected $lexicon;

    /**
     * @ORM\Column(name="wiki_title", type="string", length=128, unique=true)
     */
    protected $wiki_title;

    /**
     * @ORM\Column(name="wiki_fullurl", type="string", length=255, unique=true)
     */
    protected $wiki_fullurl;

    public function __construct($wiki_page_id)
    {
        $this->wiki_page_id = $wiki_page_id;
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
     * Set lexicon
     *
     * @param Lexicon $lexicon
     */
    public function setLexicon(Lexicon $lexicon)
    {
        $this->lexicon = $lexicon;
        $lexicon->addWikiRedirect($this);
    }

    /**
     * Get lexicon
     *
     * @return Lexicon
     */
    public function getLexicon()
    {
        return $this->lexicon;
    }

    /**
     * Set wiki_title
     *
     * @param string $wiki_title
     */
    public function setWikiTitle($wiki_title)
    {
        $this->wiki_title = $wiki_title;
    }

    /**
     * Get wiki_title
     *
     * @return string
     */
    public function getWikiTitle()
    {
        return $this->wiki_title;
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
}