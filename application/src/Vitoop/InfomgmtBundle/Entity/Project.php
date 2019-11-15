<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;
use Vitoop\InfomgmtBundle\Entity\ValueObject\DateTime;

/**
 * @ORM\Table(name="project")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ProjectRepository")
 */
class Project extends Resource implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @Serializer\Groups({"get_project"})
     */
    protected $id;

    /**
     * @ORM\Column(name="description", type="text", length=4096)
     */
    protected $description;

    /**
     * @ORM\OneToOne(targetEntity="ProjectData", inversedBy="project", cascade = {"persist", "merge", "remove"})
     * @Serializer\Groups({"get_project"})
     */
    protected $project_data;

    public function __construct()
    {
        parent::__construct();
        $this->project_data = new ProjectData();
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
        return 6;
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
        return 'prj';
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
     * Set project_data
     *
     * @param ProjectData $project_data
     */
    public function setProjectData(ProjectData $project_data)
    {
        $this->project_data = $project_data;
        $project_data->setProject($this);
    }

    /**
     * Get project_data
     *
     * @return ProjectData
     */
    public function getProjectData()
    {
        return $this->project_data;
    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'project_data' => $this->project_data->getDTO(),
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

    public static function createFromResourceDTO(ResourceDTO $dto) : Project
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

