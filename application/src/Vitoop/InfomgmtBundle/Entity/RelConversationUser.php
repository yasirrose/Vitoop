<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="rel_conversation_user",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniquerelconvusr_idx",
 * columns={"id_conversation_data", "id_user"})})
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\RelConversationUserRepository")
 */
class RelConversationUser implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="ConversationData", inversedBy="relUsers")
     * @ORM\JoinColumn(name="id_conversation_data", referencedColumnName="id")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $conversationData;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="relConversation")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $user;

    /**
     * @ORM\Column(name="read_only", type="boolean", options={"default":true})
     * @Serializer\Groups({"get_conversation"})
     */
    protected $readOnly;

    /**
     * RelConversationUser constructor.
     * @param ConversationData|null $conversationData
     * @param User|null $user
     * @param bool $readOnly
     */
    public function __construct(ConversationData $conversationData = null, User $user = null, $readOnly = true)
    {
        $this->setConversationData($conversationData);
        $this->setUser($user);
        $this->setReadOnly($readOnly);
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
     * Set conversation
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ConversationData $conversationData
     * @return RelConversationUser
     */
    public function setConversationData(\Vitoop\InfomgmtBundle\Entity\ConversationData $conversationData = null)
    {
        $this->conversationData = $conversationData;

        return $this;
    }

    /**
     * Get Conversation
     *
     * @return \Vitoop\InfomgmtBundle\Entity\ConversationData
     */
    public function getConversationData()
    {
        return $this->conversationData;
    }

    /**
     * Set user
     *
     * @param \Vitoop\InfomgmtBundle\Entity\User $user
     * @return RelConversationUser
     */
    public function setUser(\Vitoop\InfomgmtBundle\Entity\User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Vitoop\InfomgmtBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set readOnly
     *
     * @param boolean $readOnly
     * @return RelConversationUser
     */
    public function setReadOnly($readOnly)
    {
        $this->readOnly = $readOnly;

        return $this;
    }

    /**
     * Get readOnly
     *
     * @return boolean
     */
    public function getReadOnly(): bool
    {
        return $this->readOnly;
    }

    /**
     * @return array
     */
    public function getDTO(): array
    {
        return [
            'id'=> $this->id,
            'user' => $this->user->getDTO(),
            'read_only' => $this->readOnly,
        ];
    }
}
