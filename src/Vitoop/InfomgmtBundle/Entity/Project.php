<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="project")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ProjectRepository")
 */
class Project extends Resource
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     */
    protected $id;

    /**
     * @ORM\Column(name="description", type="text", length=4096)
     */
    protected $description;

    /**
     * @ORM\OneToOne(targetEntity="ProjectData", inversedBy="project")
     */
    protected $project_data;

    /**
     * @ORM\Column(name="is_private", type="boolean", options={"default":false})
     */
    protected $isPrivate;

    public function __construct()
    {
        parent::__construct();
        $this->isPrivate = false;
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

    /**
     * Set isPrivate
     *
     * @param boolean $isPrivate
     * @return Project
     */
    public function setIsPrivate($isPrivate)
    {
        $this->isPrivate = $isPrivate;

        return $this;
    }

    /**
     * Get isPrivate
     *
     * @return boolean 
     */
    public function getIsPrivate()
    {
        return $this->isPrivate;
    }
}
