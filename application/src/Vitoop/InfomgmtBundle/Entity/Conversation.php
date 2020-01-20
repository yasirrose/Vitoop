<?php


namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;
use Vitoop\InfomgmtBundle\Entity\ValueObject\DateTime;

/**
 * @ORM\Table(name="conversation")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ConversationRepository")
 */
class Conversation extends Resource implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @Serializer\Groups({"get_conversation"})
     */
    protected $id;

    /**
     * @ORM\Column(name="description", type="text", length=4096)
     */
    protected $description;

    /**
     * @ORM\Column(name="conversation_data_id", type="text", length=4096)
     */
    protected $conversationDataId;

    /**
     * @ORM\OneToOne(targetEntity="ConversationData", inversedBy="conversation", cascade = {"persist", "merge", "remove"})
     * @Serializer\Groups({"get_conversation"})
     */
    protected $conversation_data;

    public function __construct()
    {
        parent::__construct();
        $this->conversation_data = new ConversationData();
    }

    /**
     * Get ResourceTypeIdx
     *
     * Get the the numerical Index of the resource_type as used in the
     * discriminator map as follows:
     * "0" = "Resource", "1" = "Pdf", "2"="Address", "3" = "Link",
     * "4" = "Teli", "5" = "Lexicon", "6" = "Project", "7" = "Buch", "8" = "Conversation"
     *
     * @return integer
     */
    public function getResourceTypeIdx()
    {
        return 8;
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
        return 'conversation';
    }

    /**
     * @return array
     */
    public static function getSearcheableColumns()
    {
        return [
            'name',
            'username'
        ];
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
     * Set description
     *
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
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
     * Set conversation_data_id
     *
     * @param integer $conversationDataId
     */
    public function setConversationDataId($conversationDataId)
    {
        $this->conversationDataId = $conversationDataId;
    }

    /**
     * Get conversation_data_id
     *
     * @param integer
     */
    public function getConversationDataId()
    {
        return $this->conversationDataId;
    }

    /**
     * Set conversation_data
     *
     * @param ConversationData $conversation_data
     */
    public function setConversationData(ConversationData $conversation_data)
    {
        $this->conversation_data = $conversation_data;
        $conversation_data->setConversation($this);
    }

    /**
     * Get conversation_data
     *
     * @return ConversationData
     */
    public function getConversationData()
    {
        return $this->conversation_data;
    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'conversation_data' => $this->conversation_data->getDTO(),
            'user' => $this->user->getDTO(),
            'created' => new DateTime($this->created_at),
        ];
    }

    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->description = $this->description;

        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Conversation
    {
        $resource = new self();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->description = $dto->description;
    }
}
