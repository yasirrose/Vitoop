<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ResourceRepository")
 * @ORM\Table(name="resource")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="doctrine2_dc", type="smallint")
 * @ORM\DiscriminatorMap({"0" = "Resource", "1" = "Pdf", "2"="Address", "3" =
 * "Link", "4" = "Teli", "5" = "Lexicon", "6" = "Project", "7" = "Book"})
 */
class Resource
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="name", type="string", length=128)
     */
    protected $name;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $created_at;

    /**
     * @ORM\Column(name="updated_at", type="datetime")
     */
    protected $updated_at;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="resources")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\OneToMany(targetEntity="RelResourceTag", mappedBy="resource")
     */
    protected $rel_tags;

    /**
     * @ORM\OneToMany(targetEntity="Rating", mappedBy="resource")
     */
    protected $ratings;

    /**
     * @ORM\OneToMany(targetEntity="Remark", mappedBy="resource")
     */
    protected $remarks;

    /**
     * @ORM\OneToMany(targetEntity="RemarkPrivate", mappedBy="resource")
     */
    protected $remarksPrivate;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="resource")
     */
    protected $comments;

    /**
     * @ORM\OneToMany(targetEntity="Flag", mappedBy="resource")
     */
    protected $flags;

    /**
     * @ORM\Column(name="language", type="string", length=2)
     */
    protected $lang;

    /**
     * @ORM\Column(name="country", type="string", length=2)
     */
    protected $country;

    /**
     * @ORM\OneToMany(targetEntity="RelResourceResource", mappedBy="resource1")
     */
    protected $rel_resources1;

    /**
     * @ORM\OneToMany(targetEntity="RelResourceResource", mappedBy="resource2")
     */
    protected $rel_resources2;

    /**
     * @ORM\OneToMany(targetEntity="Watchlist", mappedBy="resource")
     */
    protected $watchlist_entries;

    protected $avgmark;

    protected $res12count;

    public function __construct()
    {
        $this->created_at = new \DateTime();
        $this->updated_at = new \DateTime();
        $this->lang = 'xx';
        $this->country = 'XX';

        $this->rel_tags = new ArrayCollection();
        $this->ratings = new ArrayCollection();
        $this->remarks = new ArrayCollection();
        $this->remarksPrivate = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->flags = new ArrayCollection();
        $this->rel_resources1 = new ArrayCollection();
        $this->rel_resources2 = new ArrayCollection();
        $this->watchlist_entries = new ArrayCollection();

        $this->avgmark = 'not rated';
        $this->res12count = '-';
    }

    public function __toString()
    {
        return $this->name;
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
        return 0;
    }

    /**
     * Get Resourcename
     *
     * Get the the human readable Name of the resource_type as used in the
     * discriminator map as follows:
     * "0" = "Resource", "1" = "Pdf", "2"="Address", "3" = "Link",
     * "4" = "Teli", "5" = "Lexicon", "6" = "Project", "7" = "Book"
     *
     * @return string
     */
    public function getResourceName()
    {
        $arr_resourcenames = array(
            "0" => "Resource",
            "1" => "Pdf",
            "2" => "Adresse",
            "3" => "Link",
            "4" => "Textlink",
            "5" => "Lexikon",
            "6" => "Projekt",
            "7" => "Buch"
        );

        return $arr_resourcenames[$this->getResourceTypeIdx()];
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
        return 'res';
    }

    /**
     * Get ViewLink
     *
     * Gets the representation of the Source of the resource
     *
     * @return string
     */
    public function getViewLink()
    {
        return '#';
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
     * Set name
     *
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set created_at
     *
     * @param \DateTime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * Get created_at
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set updated_at
     *
     * @param \DateTime $updated_at
     */
    public function setUpdatedAt($updated_at)
    {
        $this->updated_at = $updated_at;
    }

    /**
     * Get updated_at
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Set user
     *
     * @param string $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addResource($this);
    }

    /**
     * Get user
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Add rel_tag
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceTag $relResTag
     */
    public function addRelResourceTag(RelResourceTag $relResTag)
    {
        $this->rel_tags[] = $relResTag;
    }

    /**
     * Get rel_tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelTags()
    {
        return $this->rel_tags;
    }

    /**
     * Add ratings
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Rating $Rating
     */
    public function addRating(Rating $Rating)
    {
        $this->ratings[] = $Rating;
    }

    /**
     * Get ratings
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRatings()
    {
        return $this->ratings;
    }

    /**
     * Add remark
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Remark $remark
     */
    public function addRemark(Remark $remark)
    {
        $this->remarks[] = $remark;
    }

    /**
     * Get remarks
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRemarks()
    {
        return $this->remarks;
    }

    /**
     * Add remarkPrivate
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RemarkPrivate $remarkPrivate
     */
    public function addRemarkPrivate(RemarkPrivate $remarkPrivate)
    {
        $this->remarksPrivate[] = $remarkPrivate;
    }

    /**
     * Get remarksPrivate
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRemarksPrivate()
    {
        return $this->remarksPrivate;
    }

    /**
     * Add comments
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Comment $comment
     */
    public function addComment(Comment $comment)
    {
        $this->comments[] = $comment;
    }

    /**
     * Get comments
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getComments()
    {
        return $this->comments;
    }

    /**
     * Add flag
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Flag $flag
     */
    public function addFlag(Flag $flag)
    {
        $this->flags[] = $flag;
    }

    /**
     * Get flags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getFlags()
    {
        return $this->flags;
    }

    /**
     * Set lang
     *
     * @param string $lang
     */
    public function setLang($lang)
    {
        $this->lang = $lang;
    }

    /**
     * Get lang
     *
     * @return string
     */
    public function getLang()
    {
        return $this->lang;
    }

    /**
     * Set country
     *
     * @param string $country
     */
    public function setCountry($country)
    {
        $this->country = $country;
    }

    /**
     * Get country
     *
     * @return string
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Add rel_resources1
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceResource $relResRes
     */
    public function addRelResourceResource1(RelResourceResource $relResRes)
    {
        $this->rel_resources1[] = $relResRes;
    }

    /**
     * Get rel_resources1
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelResources1()
    {
        return $this->rel_resources1;
    }

    /**
     * Add rel_resources2
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceResource $relResRes
     */
    public function addRelResourceResource2(RelResourceResource $relResRes)
    {
        $this->rel_resources2[] = $relResRes;
    }

    /**
     * Get rel_resources2
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelResources2()
    {
        return $this->rel_resources2;
    }

    /**
     * Add watchlist_entry
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Watchlist $watchlist_entry
     */
    public function addWatchlistEntry(Watchlist $watchlist_entry)
    {
        $this->watchlist_entries[] = $watchlist_entry;
    }

    /**
     * Get watchlist_entries
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getWatchlistEntries()
    {
        return $this->watchlist_entries;
    }

    /**
     * @param string $avgmark
     */
    public function setAvgmark($avgmark)
    {
        $this->avgmark = $avgmark;
    }

    /**
     * @return string
     */
    public function getAvgmark()
    {
        return $this->avgmark;
    }

    /**
     * @param string $res12count
     */
    public function setRes12count($res12count)
    {
        $this->res12count = $res12count;
    }

    /**
     * @return string
     */
    public function getRes12count()
    {
        return $this->res12count;
    }
}