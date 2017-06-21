<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Criteria;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;
use Vitoop\InfomgmtBundle\Entity\Resource\ResourceType;

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
     * @var \DateTime
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
     * @ORM\OneToMany(targetEntity="RelResourceTag", mappedBy="resource", cascade={"remove"})
     */
    protected $rel_tags;

    /**
     * @ORM\OneToMany(targetEntity="Rating", mappedBy="resource")
     */
    protected $ratings;

    /**
     * @ORM\OneToMany(targetEntity="Remark", mappedBy="resource")
     * @ORM\OrderBy({"created_at" = "DESC"})
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
     * @ORM\OneToMany(targetEntity="Flag", mappedBy="resource", cascade={"persist"})
     */
    protected $flags;

    /**
     * @ORM\ManyToOne(targetEntity="Language")
     * @ORM\JoinColumn(name="language", referencedColumnName="code")
     */
    protected $lang;

    /**
     * @ORM\ManyToOne(targetEntity="Country")
     * @ORM\JoinColumn(name="country", referencedColumnName="code")
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

    /**
     * @ORM\OneToMany(
     *      targetEntity="UserHookResource", mappedBy="resource", 
     *      cascade={"persist", "remove"}, orphanRemoval=true
     * )
     */
    protected $userHooks;

    public function __construct()
    {
        $this->created_at = new \DateTime();
        $this->updated_at = new \DateTime();
        //$this->lang = 'xx';
        //$this->country = 'XX';

        $this->rel_tags = new ArrayCollection();
        $this->ratings = new ArrayCollection();
        $this->remarks = new ArrayCollection();
        $this->remarksPrivate = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->flags = new ArrayCollection();
        $this->rel_resources1 = new ArrayCollection();
        $this->rel_resources2 = new ArrayCollection();
        $this->watchlist_entries = new ArrayCollection();
        $this->userHooks = new ArrayCollection();

        $this->avgmark = 'not rated';
        $this->res12count = '-';
    }

    public function __toString()
    {
        return $this->name;
    }

    public static function createFromResourceDTO(ResourceDTO $dto)
    {
        $resource = new static();
        $resource->updateFromResourceDTO($dto);

        return $resource;
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
        return ResourceType::getResourceNameByIndex($this->getResourceTypeIdx());
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
     * Return url for email sending link
     *
     * @return string
     */
    public function getSendLink()
    {
        return $this->getViewLink();
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
     * @return Remark
     */
    public function getLastRemark()
    {
        return $this->remarks->first();
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

    public function blame($info, User $user = null)
    {
        $flag = new Flag();
        $flag->setType(Flag::FLAG_BLAME);
        $flag->setResource($this);
        $flag->setUser($user?$user:$this->user);
        $flag->setInfo($info);

        $this->addFlag($flag);
    }

    public function hook(User $user)
    {
        $userHooks = $this->findUserHook($user);
        if (0 === $userHooks->count()) { 
            $this->userHooks->add(new UserHookResource($user, $this));
        }
    }

    public function unhook(User $user)
    {
        $userHooks = $this->findUserHook($user);
        if (0 < $userHooks->count()) {
            $this->userHooks->removeElement($userHooks->first());
        }
    }

    public function isBlueByUser(User $user) : bool
    {
        return 0 < $this->findUserHook($user)->count();
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        if (!$this->user) {
            $this->user = $dto->user;
        }
        $this->name = $dto->name;
        $this->lang = $dto->lang;
        $this->country = $dto->country;

        $this->updateUserHook($dto);
        $this->updated_at = new \DateTime();
    }

    public function updateUserHook(ResourceDTO $dto)
    {
        if ($dto->isUserHook) {
            $this->hook($dto->user);
            return;
        }
        $this->unhook($dto->user);
    }

    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = new ResourceDTO();
        $dto->user = $user;
        $dto->name = $this->name;
        $dto->lang = $this->lang;
        $dto->country = $this->country;
        $dto->isUserHook = $this->isBlueByUser($user);

        return $dto;
    }
    
    protected function findUserHook(User $user) : ArrayCollection
    {
        $expr = Criteria::expr();
        $userCriteria = Criteria::create();
        $userCriteria
            ->where($expr->eq('user', $user));

        return $this->userHooks->matching($userCriteria);
    }
}
