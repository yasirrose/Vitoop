<?php

namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Vitoop\InfomgmtBundle\DTO\Resource\DividerDTO;

/**
 * ProjectRelsDivider
 *
 * @ORM\Table(name="project_rel_divider",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniqueprjreldiv_idx",
 * columns={"coefficient", "id_project_data"})})
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ProjectRelsDividerRepository")
 */
class ProjectRelsDivider implements GetDTOInterface
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"get", "edit"})
     * @Serializer\Type("integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="string", length=350, nullable=true)
     * @Serializer\Groups({"get", "edit"})
     * @Serializer\Type("string")
     */
    private $text;

    /**
     * @var integer
     *
     * @ORM\Column(name="coefficient", type="integer")
     * @Serializer\Groups({"get", "edit"})
     * @Serializer\Type("integer")
     */
    private $coefficient;

    /**
     * @ORM\ManyToOne(targetEntity="ProjectData", inversedBy="dividers")
     * @ORM\JoinColumn(name="id_project_data", referencedColumnName="id")
     */
    protected $projectData;


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
     * Set text
     *
     * @param string $text
     * @return ProjectRelsDivider
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
    }

    /**
     * Get text
     *
     * @return string 
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set coefficient
     *
     * @param integer $coefficient
     * @return ProjectRelsDivider
     */
    public function setCoefficient($coefficient)
    {
        $this->coefficient = $coefficient;

        return $this;
    }

    /**
     * Get coefficient
     *
     * @return integer
     */
    public function getCoefficient()
    {
        return $this->coefficient;
    }

    /**
     * Set projectData
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ProjectData $projectData
     * @return ProjectRelsDivider
     */
    public function setProjectData(\Vitoop\InfomgmtBundle\Entity\ProjectData $projectData = null)
    {
        $this->projectData = $projectData;

        return $this;
    }

    /**
     * Get projectData
     *
     * @return \Vitoop\InfomgmtBundle\Entity\ProjectData 
     */
    public function getProjectData()
    {
        return $this->projectData;
    }

    /**
     * @param ProjectData $projectData
     * @param DividerDTO $dividerDTO
     * @return ProjectRelsDivider
     */
    public static function create(ProjectData $projectData, DividerDTO $dividerDTO)
    {
        $divider = new ProjectRelsDivider();
        $divider->projectData = $projectData;
        $divider->updateFromDTO($dividerDTO);

        return $divider;
    }

    public function updateFromDTO(DividerDTO $dividerDTO)
    {
        $this->coefficient = $dividerDTO->coefficient;
        $this->text = $dividerDTO->text;
    }

    public function getDTO()
    {
        $dto = new DividerDTO(
            $this->id,
            $this->text,
            $this->coefficient
        );
        $dto->projectDataId = $this->projectData->getId();

        return $dto->jsonSerialize();
    }
}
