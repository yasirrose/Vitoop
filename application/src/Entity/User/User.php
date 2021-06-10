<?php
namespace App\Entity\User;

use App\Entity\Comment;
use App\Entity\Flag;
use App\Entity\Invitation;
use App\Entity\Rating;
use App\Entity\RelResourceResource;
use App\Entity\RelResourceTag;
use App\Entity\Remark;
use App\Entity\RemarkPrivate;
use App\Entity\Resource;
use App\Entity\User\UserConfig;
use App\Entity\User\UserData;
use App\Entity\User\PasswordEncoderInterface;
use App\DTO\GetDTOInterface;
use App\DTO\User\NewUserDTO;
use App\DTO\User\CredentialsDTO;
use App\Entity\Watchlist;
use App\Utils\Token\TokenGeneratorInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\EquatableInterface;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="vitoop_user")
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User implements EquatableInterface, UserInterface, \Serializable, GetDTOInterface
{
    const USER_DISABLED_USERNAME = "gel-";
    const DEFAULT_USERNAME = 'david';

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"edit", "get_project"})
     * @Serializer\Type("integer")
     */
    protected $id;

    /**
     * @ORM\Column(name="username", type="string", length=25, unique=true)
     * @Serializer\Groups({"get_project"})
     */
    protected $username;

    /**
     * @ORM\Column(name="email", type="string", length=60, unique=true)
     * @Serializer\Groups({"edit"})
     * @Serializer\Type("string")
     */
    protected $email;

    /**
     * @ORM\Column(name="password", type="string", length=40)
     * @Serializer\Groups({"edit"})
     * @Serializer\Type("string")
     */
    protected $password;

    /**
     * @ORM\Column(name="reset_password_token", type="string", length=255, nullable = true) 
     */
    protected $resetPasswordToken;

    /**
     * @ORM\Column(name="salt", type="string", length=40)
     */
    protected $salt;

    /**
     * @ORM\Column(name="is_active", type="boolean")
     */
    protected $active;

    /**
     * @ORM\Column(name="is_agreed_with_terms", type="boolean", options={"default" = true})
     */
    protected $isAgreedWithTerms;

    /**
     * @ORM\Column(name="is_show_help", type="boolean", options={"default" = true})
     */
    protected $isShowHelp;
    
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Resource", mappedBy="user")
     */
    protected $resources;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ToDoItem", mappedBy="user")
     * @ORM\OrderBy({"order" = "ASC", "title" = "ASC"})
     */
    protected $toDoItems;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Rating", mappedBy="user")
     */
    protected $ratings;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Remark", mappedBy="user")
     */
    protected $remarks;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RemarkPrivate", mappedBy="user")
     */
    protected $remarksPrivate;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="user")
     */
    protected $comments;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Flag", mappedBy="user")
     */
    protected $flags;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Invitation", mappedBy="user")
     */
    protected $invitations;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Watchlist", mappedBy="user")
     */
    protected $watchlist_entries;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RelResourceTag", mappedBy="user")
     */
    protected $rel_resource_tags;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RelResourceTag", mappedBy="deletedByUser")
     */
    protected $deleted_rel_resource_tags;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RelResourceResource", mappedBy="deletedByUser")
     */
    protected $deleted_rel_resource_resources;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RelResourceResource", mappedBy="user")
     */
    protected $rel_resource_resources;

    /**
     * @var UserConfig
     *
     * @ORM\OneToOne(targetEntity="UserConfig", inversedBy="user", cascade={"persist", "merge"})
     * @Serializer\Groups({"edit"})
     */
    protected $user_config;

    /**
     * @ORM\OneToOne(targetEntity="UserData", inversedBy="user", cascade={"persist"})
     */
    protected $user_data;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RelProjectUser", mappedBy="user")
     */
    protected $relProject;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RelConversationUser", mappedBy="user")
     */
    protected $relConversation;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\ConversationMessage", mappedBy="user")
     */
    protected $conversationMessage;

    /**
     * @ORM\Column(name="last_logined_at", type="datetime", nullable=true)
     */
    protected $lastLoginedAt;

    public function __construct()
    {
        $this->setActive(true);
        $this->salt = base_convert(sha1(uniqid(mt_rand(), true)), 16, 36);

        $this->resources = new ArrayCollection();
        $this->relProject = new ArrayCollection();
        $this->relConversation = new ArrayCollection();
        $this->conversationMessage = new ArrayCollection();
        $this->toDoItems = new ArrayCollection();
        $this->ratings = new ArrayCollection();
        $this->remarks = new ArrayCollection();
        $this->remarksPrivate = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->flags = new ArrayCollection();
        $this->invitations = new ArrayCollection();
        $this->watchlist_entries = new ArrayCollection();
        $this->rel_resources_tags = new ArrayCollection();
        $this->deleted_rel_resource_tags = new ArrayCollection();
        $this->deleted_rel_resource_resources = new ArrayCollection();
        $this->rel_resource_resources = new ArrayCollection();
    }

    public static function create(NewUserDTO $dto, PasswordEncoderInterface $encoder)
    {
        $user = new static();
        $user->email = $dto->email;
        $user->username = $dto->username;
        $user->password = $encoder->encode($dto->password, $user->salt);
        $user->isAgreedWithTerms = true;
        $user->isShowHelp = true;
        $user->user_config = new UserConfig($user);

        return $user;
    }

    public function __toString()
    {
        return $this->username;
    }

    public function getRoles()
    {
        $roles = array('ROLE_USER');
        $admins = array(self::DEFAULT_USERNAME, 'alex.shalkin');

        if (in_array($this->username, $admins)) {
            $roles = array_merge($roles, array('ROLE_ADMIN'));
        }

        return $roles;
    }

    public function isAdmin()
    {
        return in_array('ROLE_ADMIN', $this->getRoles());
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

    public function deactivate()
    {
        $this->active = false;
        $this->username = self::USER_DISABLED_USERNAME.$this->id;
    }

    public function setIsAgreedWithTerms($agreed)
    {
        $this->isAgreedWithTerms = $agreed;
    }

    public function setIsShowHelp($isShowHelp)
    {
        $this->isShowHelp = $isShowHelp;
        return $this;
    }

        
    public function getIsShowHelp()
    {
        return $this->isShowHelp;
    }
        
    /**
     * Add resources
     *
     * @param \App\Entity\Resource $resource
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
     * @param \App\Entity\Rating $rating
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
     * @param \App\Entity\Remark $remark
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
     * @param \App\Entity\RemarkPrivate $remarkPrivate
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
     * Add comment
     *
     * @param \App\Entity\Comment $comment
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
     * @param \App\Entity\Flag $flag
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
     * @param \App\Entity\Invitation $invitation
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
     * @param \App\Entity\Watchlist $watchlist_entry
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
     * @param \App\Entity\RelResourceTag $relResourceTag
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
     * @param \App\Entity\RelResourceResource $relResourceResource
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
     * Get is_agreed
     *
     * @return boolean
     */
    public function getIsAgreedWithTerms()
    {
        return $this->isAgreedWithTerms;
    }

    /**
     * Remove resources
     *
     * @param \App\Entity\Resource $resources
     */
    public function removeResource(\App\Entity\Resource $resources)
    {
        $this->resources->removeElement($resources);
    }

    /**
     * Add toDoItems
     *
     * @param \App\Entity\ToDoItem $toDoItems
     * @return User
     */
    public function addToDoItem(\App\Entity\ToDoItem $toDoItems)
    {
        $this->toDoItems[] = $toDoItems;

        return $this;
    }

    /**
     * Remove toDoItems
     *
     * @param \App\Entity\ToDoItem $toDoItems
     */
    public function removeToDoItem(\App\Entity\ToDoItem $toDoItems)
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
     * @param \App\Entity\Rating $ratings
     */
    public function removeRating(\App\Entity\Rating $ratings)
    {
        $this->ratings->removeElement($ratings);
    }

    /**
     * Remove remarks
     *
     * @param \App\Entity\Remark $remarks
     */
    public function removeRemark(\App\Entity\Remark $remarks)
    {
        $this->remarks->removeElement($remarks);
    }

    /**
     * Remove remarksPrivate
     *
     * @param \App\Entity\RemarkPrivate $remarksPrivate
     */
    public function removeRemarkPrivate(\App\Entity\RemarkPrivate $remarksPrivate)
    {
        $this->remarksPrivate->removeElement($remarksPrivate);
    }

    /**
     * Remove comments
     *
     * @param \App\Entity\Comment $comments
     */
    public function removeComment(\App\Entity\Comment $comments)
    {
        $this->comments->removeElement($comments);
    }

    /**
     * Remove flags
     *
     * @param \App\Entity\Flag $flags
     */
    public function removeFlag(\App\Entity\Flag $flags)
    {
        $this->flags->removeElement($flags);
    }

    /**
     * Remove invitations
     *
     * @param \App\Entity\Invitation $invitations
     */
    public function removeInvitation(\App\Entity\Invitation $invitations)
    {
        $this->invitations->removeElement($invitations);
    }

    /**
     * Remove watchlist_entries
     *
     * @param \App\Entity\Watchlist $watchlistEntries
     */
    public function removeWatchlistEntry(\App\Entity\Watchlist $watchlistEntries)
    {
        $this->watchlist_entries->removeElement($watchlistEntries);
    }

    /**
     * Remove rel_resource_tags
     *
     * @param \App\Entity\RelResourceTag $relResourceTags
     */
    public function removeRelResourceTag(\App\Entity\RelResourceTag $relResourceTags)
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
     * @param \App\Entity\RelResourceResource $relResourceResources
     */
    public function removeRelResourceResource(\App\Entity\RelResourceResource $relResourceResources)
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

    /**
     * Add deleted_rel_resource_tags
     *
     * @param \App\Entity\RelResourceTag $deletedRelResourceTags
     * @return User
     */
    public function addDeletedRelResourceTag(\App\Entity\RelResourceTag $deletedRelResourceTags)
    {
        $this->deleted_rel_resource_tags[] = $deletedRelResourceTags;

        return $this;
    }

    /**
     * Remove deleted_rel_resource_tags
     *
     * @param \App\Entity\RelResourceTag $deletedRelResourceTags
     */
    public function removeDeletedRelResourceTag(\App\Entity\RelResourceTag $deletedRelResourceTags)
    {
        $this->deleted_rel_resource_tags->removeElement($deletedRelResourceTags);
    }

    /**
     * Get deleted_rel_resource_tags
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDeletedRelResourceTags()
    {
        return $this->deleted_rel_resource_tags;
    }

    /**
     * Add deleted_rel_resource_resources
     *
     * @param \App\Entity\RelResourceResource $deletedRelResourceResources
     * @return User
     */
    public function addDeletedRelResourceResource(\App\Entity\RelResourceResource $deletedRelResourceResources)
    {
        $this->deleted_rel_resource_resources[] = $deletedRelResourceResources;

        return $this;
    }

    /**
     * Remove deleted_rel_resource_resources
     *
     * @param \App\Entity\RelResourceResource $deletedRelResourceResources
     */
    public function removeDeletedRelResourceResource(\App\Entity\RelResourceResource $deletedRelResourceResources)
    {
        $this->deleted_rel_resource_resources->removeElement($deletedRelResourceResources);
    }

    /**
     * Get deleted_rel_resource_resources
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getDeletedRelResourceResources()
    {
        return $this->deleted_rel_resource_resources;
    }

    /**
     * Add relProject
     *
     * @param \App\Entity\RelProjectUser $relProject
     * @return User
     */
    public function addRelProject(\App\Entity\RelProjectUser $relProject)
    {
        $this->relProject[] = $relProject;

        return $this;
    }

    /**
     * Remove relProject
     *
     * @param \App\Entity\RelProjectUser $relProject
     */
    public function removeRelProject(\App\Entity\RelProjectUser $relProject)
    {
        $this->relProject->removeElement($relProject);
    }

    /**
     * Get relProject
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelProject()
    {
        return $this->relProject;
    }

    /**
     * Add relConversation
     *
     * @param \App\Entity\RelConversationUser $relConversation
     * @return User
     */
    public function addRelConversation(\App\Entity\RelConversationUser $relConversation)
    {
        $this->relConversation[] = $relConversation;

        return $this;
    }

    /**
     * Remove relConversation
     *
     * @param \App\Entity\RelConversationUser $relConversation
     */
    public function removeConversation(\App\Entity\RelConversationUser $relConversation)
    {
        $this->relConversation->removeElement($relConversation);
    }

    /**
     * Get relConversation
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelConversation()
    {
        return $this->relConversation;
    }

    /**
     * Add conversationMessage
     *
     * @param \App\Entity\ConversationMessage $message
     * @return User
     */
    public function addConversationMessage(\App\Entity\ConversationMessage $message)
    {
        $this->conversationMessage[] = $message;

        return $this;
    }

    /**
     * Remove conversationMessage
     *
     * @param \App\Entity\ConversationMessage $message
     */
    public function removeConversationMessage(\App\Entity\ConversationMessage $message)
    {
        $this->conversationMessage->removeElement($message);
    }

    /**
     * Get conversationMessage
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getConversationMessage()
    {
        return $this->conversationMessage;
    }

    public function getResetPasswordToken()
    {
        return $this->resetPasswordToken;
    }

    public function generateForgotPasswordToken(TokenGeneratorInterface $generator)
    {
        $this->resetPasswordToken = $generator->generateToken();
    }

    public function changePassword($newPassword, PasswordEncoderInterface $encoder)
    {
        $this->password = $encoder->encode($newPassword, $this->salt);
        $this->resetPasswordToken = null;
    }

    public function updateCredentials(CredentialsDTO $credentials, PasswordEncoderInterface $encoder)
    {
        if ($credentials->password) {
            $this->changePassword($credentials->password, $encoder);
        }
        if ($credentials->email) {
            $this->email = $credentials->email;
        }
        if ($credentials->username) {
            $this->username = $credentials->username;
        }

        $this->user_config
            ->updateUserSettings(
                $credentials->numberOfTodoElements,
                $credentials->heightOfTodoList,
                $credentials->decreaseFontSize,
                $credentials->isOpenInSameTabPdf,
                $credentials->isOpenInSameTabTeli
            );
    }

    /**
     * Get isActive
     *
     * @return boolean
     */
    public function getIsActive()
    {
        return $this->active;
    }

    public function isAccountNonExpired()
    {
        return true;
    }

    public function isAccountNonLocked()
    {
        return true;
    }

    public function isCredentialsNonExpired()
    {
        return true;
    }

    public function isEnabled()
    {
        return $this->active;
    }

    public function serialize()
    {
        return serialize(array(
            $this->id,
            $this->username,
            $this->password,
            $this->salt,
            $this->active,
            $this->isShowHelp,
            $this->isAgreedWithTerms
        ));
    }

    public function unserialize($serialized)
    {
        list (
            $this->id,
            $this->username,
            $this->password,
            $this->salt,
            $this->active,
            $this->isShowHelp,
            $this->isAgreedWithTerms
        ) = unserialize($serialized);
    }

    public function getDTO()
    {
        if (null === $this->user_config) {
            $this->user_config = new UserConfig($this);
        }

        return [
            'id' => $this->id,
            'username' => $this->username,
            'is_show_help' => $this->isShowHelp,
            'is_agreed_with_term' => $this->isAgreedWithTerms,
            'is_check_max_link' => $this->user_config->getIsCheckMaxLink()
        ];
    }

    /**
     * @return array
     */
    public function getDTOWithConfig(): array
    {
        $dto = $this->getDTO();

        return $dto += [
            'number_of_todo_elements' => $this->user_config->getNumberOfTodoElements(),
            'height_of_todo_list' => $this->user_config->getHeightOfTodoList(),
            'decrease_font_size' => $this->user_config->getDecreaseFontSize(),
            'is_open_in_same_tab_pdf' => $this->user_config->isOpenInSameTabPdf(),
            'is_open_in_same_tab_teli' => $this->user_config->isOpenInSameTabTeli(),
        ];
    }

    public function login()
    {
        $this->lastLoginedAt = new \DateTime();
    }
}
