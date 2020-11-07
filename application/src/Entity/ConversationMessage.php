<?php

namespace App\Entity;

use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use App\DTO\GetDTOInterface;

/**
 * @ORM\Table(name="conversation_messages")
 * @ORM\Entity(repositoryClass="App\Repository\ConversationMessageRepository")
 */
class ConversationMessage implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $id;

    /**
     * @ORM\Column(name="text", type="text")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $text;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     * @Serializer\Type("DateTime<'d.m.Y'>")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $created;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="conversationMessage")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="ConversationData", inversedBy="messages")
     * @ORM\JoinColumn(name="id_conversation_data", referencedColumnName="id")
     * @Serializer\Groups({"get_conversation"})
     */
    protected $conversationData;

    public function __construct($text = null, $user = null, $conversationData = null)
    {
        $this->setText($text);
        $this->setUser($user);
        $this->setConversationData($conversationData);
        $this->setCreated(new \DateTime());
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
     * Set id
     *
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * Get id
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set user
     *
     * @param User $user
     * @return ConversationMessage
     */
    public function setUser(User $user)
    {
        $this->user = $user;

        return $this;
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
     * @param string $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Set conversationData
     *
     * @param \App\Entity\ConversationData $conversationData
     * @return ConversationMessage
     */
    public function setConversationData(\App\Entity\ConversationData $conversationData)
    {
        $this->conversationData = $conversationData;

        return $this;
    }

    /**
     * Get conversationData
     *
     * @return \App\Entity\ConversationData
     */
    public function getConversationData()
    {
        return $this->conversationData;
    }

    public function getDTO()
    {
        return [
            'id' => $this->getId(),
            'message' => $this->getText(),
            'user' => $this->user->getDTO(),
            'date' => $this->created
        ];
    }

    public function availableForDelete(User $user)
    {
        if ($user->isAdmin() || $user === $this->getUser()) {
            return true;
        }

        return false;
    }
}