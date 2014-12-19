<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Vitoop\InfomgmtBundle\Entity\UserConfig;
use Vitoop\InfomgmtBundle\Entity\UserData;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\EquatableInterface;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="vitoop_user")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\UserRepository")
 */
class User implements UserInterface, EquatableInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"edit"})
     * @Serializer\Type("integer")
     */
    protected $id;

    /**
     * @ORM\Column(name="username", type="string", length=25, unique=true)
     */
    protected $username;

    /**
     * @ORM\Column(name="email", type="string", length=60, unique=true)
     */
    protected $email;

    /**
     * @ORM\Column(name="password", type="string", length=40)
     */
    protected $password;

    /**
     * @ORM\Column(name="salt", type="string", length=40)
     */
    protected $salt;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    protected $active;

    /**
     * @ORM\OneToMany(targetEntity="Resource", mappedBy="user")
     */
    protected $resources;

    /**
     * @ORM\OneToMany(targetEntity="ToDoItem", mappedBy="user")
     * @ORM\OrderBy({"title" = "ASC"})
     */
    protected $toDoItems;

    /**
     * @ORM\OneToMany(targetEntity="Rating", mappedBy="user")
     */
    protected $ratings;

    /**
     * @ORM\OneToMany(targetEntity="Remark", mappedBy="user")
     */
    protected $remarks;

    /**
     * @ORM\OneToMany(targetEntity="Comment", mappedBy="user")
     */
    protected $comments;

    /**
     * @ORM\OneToMany(targetEntity="Flag", mappedBy="user")
     */
    protected $flags;

    /**
     * @ORM\OneToMany(targetEntity="Invitation", mappedBy="user")
     */
    protected $invitations;

    /**
     * @ORM\OneToMany(targetEntity="Watchlist", mappedBy="user")
     */
    protected $watchlist_entries;

    /**
     * @ORM\OneToMany(targetEntity="RelResourceTag", mappedBy="user")
     */
    protected $rel_resource_tags;

    /**
     * @ORM\OneToMany(targetEntity="RelResourceResource", mappedBy="user")
     */
    protected $rel_resource_resources;

    /**
     * @ORM\OneToOne(targetEntity="UserConfig", inversedBy="user")
     */
    protected $user_config;

    /**
     * @ORM\OneToOne(targetEntity="UserData", inversedBy="user")
     */
    protected $user_data;

    public function __construct()
    {
        $this->setActive(true);
        $this->salt = base_convert(sha1(uniqid(mt_rand(), true)), 16, 36);

        $this->resources = new ArrayCollection();
        $this->toDoItems = new ArrayCollection();
        $this->ratings = new ArrayCollection();
        $this->resource_remarks = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->flags = new ArrayCollection();
        $this->invitations = new ArrayCollection();
        $this->watchlist_entries = new ArrayCollection();
        $this->rel_resources_tags = new ArrayCollection();
        $this->rel_resource_resources = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->username;
    }

    public function getRoles()
    {
        $roles = array('ROLE_USER');
        $admins = array('david');

        if (in_array($this->username, $admins)) {
            $roles = array_merge($roles, array('ROLE_ADMIN'));
        }

        return $roles;
    }

    public function isEqualTo(UserInterface $user)
    {

        return ($user->getUsername() === $this->username && $user->isActive() === $this->isActive());
    }

    public function eraseCredentials()
    {
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getSalt()
    {
        return $this->salt;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }

    public function isActive()
    {
        return $this->active;
    }

    public function setActive($active)
    {
        $this->active = $active;
    }

    /**
     * Add resources
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Resource $resource
     */
    public function addResource(Resource $resource)
    {
        $this->resources[] = $resource;
    }

    /**
     * Get resources
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getResources()
    {
        return $this->resources;
    }

    /**
     * Add rating
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Rating $rating
     */
    public function addRating(Rating $rating)
    {
        $this->ratings[] = $rating;
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
     * Add comment
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
     * Add invitation
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Invitation $invitation
     */
    public function addInvitation(Invitation $invitation)
    {
        $this->invitations[] = $invitation;
    }

    /**
     * Get invitations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getInvitations()
    {
        return $this->invitations;
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
     * Add rel_resource_tag
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceTag $relResourceTag
     */
    public function addRelResourceTag(RelResourceTag $relResourceTag)
    {
        $this->rel_resource_tags[] = $relResourceTag;
    }

    /**
     * Get rel_resource_tags
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelResourcesTags()
    {
        return $this->rel_resource_tags;
    }

    /**
     * Add rel_resource_resource
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceResource $relResourceResource
     */
    public function addRelResourceResource(RelResourceResource $relResourceResource)
    {
        $this->rel_resource_resources[] = $relResourceResource;
    }

    /**
     * Get rel_resource_resources
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelResourcesResources()
    {
        return $this->rel_resource_resources;
    }

    /**
     * @param UserConfig $user_config
     */
    public function setUserConfig(UserConfig $user_config)
    {
        $this->user_config = $user_config;
    }

    /**
     * @return UserConfig
     */
    public function getUserConfig()
    {
        return $this->user_config;
    }

    /**
     * @param UserData $user_data
     */
    public function setUserData(UserData $user_data)
    {
        $this->user_data = $user_data;
    }

    /**
     * @return UserData
     */
    public function getUserData()
    {
        return $this->user_data;
    }

    /**
     * Set salt
     *
     * @param string $salt
     * @return User
     */
    public function setSalt($salt)
    {
        $this->salt = $salt;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Remove resources
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Resource $resources
     */
    public function removeResource(\Vitoop\InfomgmtBundle\Entity\Resource $resources)
    {
        $this->resources->removeElement($resources);
    }

    /**
     * Add toDoItems
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ToDoItem $toDoItems
     * @return User
     */
    public function addToDoItem(\Vitoop\InfomgmtBundle\Entity\ToDoItem $toDoItems)
    {
        $this->toDoItems[] = $toDoItems;

        return $this;
    }

    /**
     * Remove toDoItems
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ToDoItem $toDoItems
     */
    public function removeToDoItem(\Vitoop\InfomgmtBundle\Entity\ToDoItem $toDoItems)
    {
        $this->toDoItems->removeElement($toDoItems);
    }

    /**
     * Get toDoItems
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getToDoItems()
    {
        return $this->toDoItems;
    }

    /**
     * Remove ratings
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Rating $ratings
     */
    public function removeRating(\Vitoop\InfomgmtBundle\Entity\Rating $ratings)
    {
        $this->ratings->removeElement($ratings);
    }

    /**
     * Remove remarks
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Remark $remarks
     */
    public function removeRemark(\Vitoop\InfomgmtBundle\Entity\Remark $remarks)
    {
        $this->remarks->removeElement($remarks);
    }

    /**
     * Remove comments
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Comment $comments
     */
    public function removeComment(\Vitoop\InfomgmtBundle\Entity\Comment $comments)
    {
        $this->comments->removeElement($comments);
    }

    /**
     * Remove flags
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Flag $flags
     */
    public function removeFlag(\Vitoop\InfomgmtBundle\Entity\Flag $flags)
    {
        $this->flags->removeElement($flags);
    }

    /**
     * Remove invitations
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Invitation $invitations
     */
    public function removeInvitation(\Vitoop\InfomgmtBundle\Entity\Invitation $invitations)
    {
        $this->invitations->removeElement($invitations);
    }

    /**
     * Remove watchlist_entries
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Watchlist $watchlistEntries
     */
    public function removeWatchlistEntry(\Vitoop\InfomgmtBundle\Entity\Watchlist $watchlistEntries)
    {
        $this->watchlist_entries->removeElement($watchlistEntries);
    }

    /**
     * Remove rel_resource_tags
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceTag $relResourceTags
     */
    public function removeRelResourceTag(\Vitoop\InfomgmtBundle\Entity\RelResourceTag $relResourceTags)
    {
        $this->rel_resource_tags->removeElement($relResourceTags);
    }

    /**
     * Get rel_resource_tags
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getRelResourceTags()
    {
        return $this->rel_resource_tags;
    }

    /**
     * Remove rel_resource_resources
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelResourceResource $relResourceResources
     */
    public function removeRelResourceResource(\Vitoop\InfomgmtBundle\Entity\RelResourceResource $relResourceResources)
    {
        $this->rel_resource_resources->removeElement($relResourceResources);
    }

    /**
     * Get rel_resource_resources
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getRelResourceResources()
    {
        return $this->rel_resource_resources;
    }
}
