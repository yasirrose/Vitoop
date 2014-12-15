<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="project_data")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\ProjectDataRepository")
 */
class ProjectData
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="sheet", type="text", length=65536)
     */
    protected $sheet;

    /**
     * @ORM\OneToOne(targetEntity="Project", mappedBy="project_data")
     */
    protected $project;

    public function __construct()
    {
        $this->sheet = '<h1>Leeres Projekt.</h1>';
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
     * Set project
     *
     * @param Project $project
     */
    public function setProject(Project $project)
    {
        $this->project = $project;
    }

    /**
     * Get project
     *
     * @return Project
     */
    public function getProject()
    {
        return $this->project;
    }
}