<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Vitoop\InfomgmtBundle\DTO\GetDTOInterface;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="rel_project_user",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniquerelprjusr_idx",
 * columns={"id_project_data", "id_user"})})
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\RelProjectUserRepository")
 */
class RelProjectUser implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"get_project"})
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="ProjectData", inversedBy="relUsers")
     * @ORM\JoinColumn(name="id_project_data", referencedColumnName="id")
     * @Serializer\Groups({"get_project"})
     */
    protected $projectData;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="relProject")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * @Serializer\Groups({"get_project"})
     */
    protected $user;

    /**
     * @ORM\Column(name="read_only", type="boolean", options={"default":true})
     * @Serializer\Groups({"get_project"})
     */
    protected $readOnly;

    public function construct()
    {
        $this->readOnly = true;
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
     * Set readOnly
     *
     * @param boolean $readOnly
     * @return RelProjectUser
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
    public function getReadOnly()
    {
        return $this->readOnly;
    }

    /**
     * Set project
     *
     * @param \Vitoop\InfomgmtBundle\Entity\ProjectData $projectData
     * @return RelProjectUser
     */
    public function setProjectData(\Vitoop\InfomgmtBundle\Entity\ProjectData $projectData = null)
    {
        $this->projectData = $projectData;

        return $this;
    }

    /**
     * Get project
     *
     * @return \Vitoop\InfomgmtBundle\Entity\ProjectData
     */
    public function getProjectData()
    {
        return $this->projectData;
    }

    /**
     * Set user
     *
     * @param \Vitoop\InfomgmtBundle\Entity\User $user
     * @return RelProjectUser
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
     * @param ProjectData $projectData
     * @param User $user
     * @param bool $readOnly
     * @return RelProjectUser
     */
    public static function create(ProjectData $projectData, User $user, $readOnly = true): RelProjectUser
    {
        $projectUser = new RelProjectUser();
        $projectUser->projectData = $projectData;
        $projectUser->user = $user;
        $projectUser->readOnly = $readOnly;

        return $projectUser;
    }

    public function getDTO()
    {
        return [
            'id'=> $this->id,
            'user' => $this->user->getDTO(),
            'read_only' => $this->readOnly
        ];
    }
}
