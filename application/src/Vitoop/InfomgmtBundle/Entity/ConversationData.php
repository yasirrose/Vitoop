<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="conversation_data")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ConversationDataRepository")
 */
class ConversationData implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"edit", "get_conversation_data"})
     * @Serializer\Type("integer")
     */
    protected $id;

    /**
     * @ORM\Column(name="sheet", type="text", length=65536)
     * @Serializer\Groups({"get_conversation_data"})
     */
    protected $sheet;

    /**
     * @ORM\OneToOne(targetEntity="Conversation", mappedBy="conversation_data")
     */
    protected $conversation;

    /**
     * @ORM\Column(name="is_for_related_users", type="boolean", options={"default":false})
     * @Serializer\Groups({"get_conversation"})
     */
    protected $isForRelatedUsers;

    /**
     * @ORM\OneToMany(targetEntity="RelConversationUser", mappedBy="conversationData", cascade={"merge", "remove"})
     * @Serializer\Groups({"get_conversation"})
     */
    protected $relUsers;

    /**
     * @ORM\OneToMany(targetEntity="ConversationMessage", mappedBy="conversationData", cascade={"merge", "remove"})
     */
    protected $messages;

    public function __construct()
    {
        $this->sheet = '<h1>Leeres Conversation.</h1>';
        $this->isForRelatedUsers = false;
        $this->relUsers = new ArrayCollection();
        $this->messages = new ArrayCollection();
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
     * Set sheet
     *
     * @param string $sheet
     */
    public function setSheet($sheet)
    {
        $this->sheet = $sheet;
    }

    /**
     * Get sheet
     *
     * @return string
     */
    public function getSheet()
    {
        return $this->sheet;
    }

    /**
     * Set conversation
     *
     * @param Conversation $conversation
     */
    public function setConversation(Conversation $conversation)
    {
        $this->conversation = $conversation;
    }

    /**
     * Get conversation
     *
     * @return Conversation
     */
    public function getConversation()
    {
        return $this->conversation;
    }

    /**
     * Add messages
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ConversationMessage $message
     * @return ConversationData
     */
    public function addMessage(\Vitoop\InfomgmtBundle\Entity\ConversationMessage $message)
    {
        if ($this->messages->contains($message)) {
            $this->messages->add($message);
        }

        return $this;
    }

    /**
     * Get messages
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getMessages()
    {
        return $this->messages;
    }

    /**
     * Remove messages
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ConversationMessage $message
     */
    public function removeMessage(\Vitoop\InfomgmtBundle\Entity\ConversationMessage $message)
    {
        if ($this->messages->contains($message)) {
            $this->messages->removeElement($message);
        }

        return $this;
    }

    /**
     * Add relUsers
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelConversationUser $relUser
     * @return ConversationData
     */
    public function addRelUser(\Vitoop\InfomgmtBundle\Entity\RelConversationUser $relUser)
    {
        if ($this->relUsers->contains($relUser)) {
            $this->relUsers->add($relUser);
        }

        return $this;
    }

    /**
     * Remove relUsers
     *
     * @param \Vitoop\InfomgmtBundle\Entity\RelConversationUser $relUser
     */
    public function removeRelUser(\Vitoop\InfomgmtBundle\Entity\RelConversationUser $relUser)
    {
        if ($this->messages->contains($relUser)) {
            $this->relUsers->removeElement($relUser);
        }

    }

    /**
     * Get relUsers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRelUsers()
    {
        return $this->relUsers;
    }

    public function availableForReading(User $user)
    {
        if ((!$this->isForRelatedUsers) || $user->isAdmin()) {
            return true;
        }

        foreach ($this->relUsers as $rel) {
            var_dump($rel->getUser()->getId());
            if ($rel->getUser()->getId() === $user->getId()) {
                return true;
            }
        }

        return false;
    }

    public function availableForWriting(User $user)
    {
        if (($user->getId() === $this->getConversation()->getUser()->getId()) || $user->isAdmin()) {
            return true;
        }
        foreach ($this->relUsers as $rel) {
            if (($rel->getUser()->getId() === $user->getId()) && !$rel->getReadOnly()) {
                return true;
            }
        }

        return false;
    }

    public function availableForRelUserAction(User $user)
    {
        if (($user->getId() === $this->getConversation()->getUser()->getId()) || $user->isAdmin()) {
            return true;
        }

        return false;
    }

    public function availableForDelete(User $user)
    {
        if ($user->isAdmin() || $user == $this->conversation->getUser()) {
            return true;
        }

        return false;
    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'sheet' => $this->sheet,
            'is_for_related_users' => $this->isForRelatedUsers,
            'messages' => $this->messages->map(function (ConversationMessage $messages) {
                return $messages->getDTO();
            })->toArray(),
            'rel_users' => $this->relUsers->map(function (RelConversationUser $user) {
                return $user->getDTO();
            })->toArray()
        ];
    }
}
