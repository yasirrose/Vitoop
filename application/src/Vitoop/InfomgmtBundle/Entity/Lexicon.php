<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;
use Vitoop\InfomgmtBundle\Entity\ValueObject\DateTime;

/**
 * @ORM\Table(name="lexicon")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\LexiconRepository")
 */
class Lexicon extends Resource implements GetDTOInterface
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
     * @ORM\Column(name="description", type="string", length=5000)
     */
    protected $description;

    /**
     * @ORM\Column(name="updated", type="datetime")
     */
    protected $updated;

    /**
     * @ORM\OneToMany(targetEntity="WikiRedirect", mappedBy="lexicon")
     */
    protected $wiki_redirects;

    public function __construct()
    {
        parent::__construct();
        $this->wiki_redirects = new ArrayCollection();
        $this->updated = new \DateTime();
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

    static public function getSearcheableColumns()
    {
        return [
            'name',
            'username'
        ];
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

    /**
     * Set description
     *
     * @param string $description
     * @return Lexicon
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set updated
     *
     * @param \DateTime $updated
     * @return Lexicon
     */
    public function setUpdated($updated)
    {
        $this->updated = $updated;

        return $this;
    }

    /**
     * Get updated
     *
     * @return \DateTime 
     */
    public function getUpdated()
    {
        return $this->updated;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Lexicon
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Remove wiki_redirects
     *
     * @param \Vitoop\InfomgmtBundle\Entity\WikiRedirect $wikiRedirects
     */
    public function removeWikiRedirect(\Vitoop\InfomgmtBundle\Entity\WikiRedirect $wikiRedirects)
    {
        $this->wiki_redirects->removeElement($wikiRedirects);
    }

    
    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->wikifullurl = $this->wiki_fullurl;
        
        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Lexicon
    {
        $resource = new static();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->wiki_fullurl = $dto->wikifullurl;
    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'wiki_page_id' => $this->wiki_page_id,
            'wiki_fullurl' => $this->wiki_fullurl,
            'user' => $this->user->getDTO(),
            'created' => new DateTime($this->created_at),
        ];
    }
}
