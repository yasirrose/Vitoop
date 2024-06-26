<?php
namespace App\Entity;

use App\DTO\GetDTOInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use App\DTO\Resource\ProjectDataDTO;
use App\Entity\User\User;

/**
 * @ORM\Table(name="project_data")
 * @ORM\Entity(repositoryClass="App\Repository\ProjectDataRepository")
 */
class ProjectData implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"get_project"})
     */
    protected $id;

    /**
     * @ORM\Column(name="sheet", type="text", length=65536)
     * @Serializer\Groups({"get_project"})
     */
    protected $sheet;

    /**
     * @ORM\OneToOne(targetEntity="Project", mappedBy="project_data")
     */
    protected $project;

    /**
     * @ORM\Column(name="is_private", type="boolean", options={"default":false})
     * @Serializer\Groups({"get_project"})
     */
    protected $isPrivate;

    /**
     * @ORM\Column(name="is_for_related_users", type="boolean", options={"default":false})
     * @Serializer\Groups({"get_project"})
     */
    protected $isForRelatedUsers;

    /**
     * @ORM\OneToMany(targetEntity="RelProjectUser", mappedBy="projectData", cascade={"merge", "remove"})
     * @Serializer\Groups({"get_project"})
     */
    protected $relUsers;

    /**
     * @ORM\OneToMany(targetEntity="ProjectRelsDivider", mappedBy="projectData", cascade={"merge", "remove"})
     */
    protected $dividers;

    /**
     * @var bool
     * @ORM\Column(name="is_all_records", type="boolean", options={"default":false})
     * @Serializer\Groups({"get_project"})
     */
    protected $isAllRecords;

    public function __construct()
    {
        $this->sheet = '<h1>Leeres Projekt.</h1>';
        $this->isPrivate = false;
        $this->isForRelatedUsers = false;
        $this->isAllRecords = false;
        $this->relUsers = new ArrayCollection();
        $this->dividers = new ArrayCollection();
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

    /**
     * Set isPrivate
     *
     * @param boolean $isPrivate
     * @return ProjectData
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

    /**
     * @return bool
     */
    public function isAllRecords(): bool
    {
        return $this->isAllRecords;
    }

    /**
     * @param bool $isAllRecords
     */
    public function setIsAllRecords(bool $isAllRecords): void
    {
        $this->isAllRecords = $isAllRecords;
    }

    /**
     * Add relUsers
     *
     * @param \App\Entity\RelProjectUser $relUsers
     * @return ProjectData
     */
    public function addRelUser(\App\Entity\RelProjectUser $relUsers)
    {
        $this->relUsers[] = $relUsers;

        return $this;
    }

    /**
     * Remove relUsers
     *
     * @param \App\Entity\RelProjectUser $relUsers
     */
    public function removeRelUser(\App\Entity\RelProjectUser $relUsers)
    {
        $this->relUsers->removeElement($relUsers);
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
        if ((!$this->isPrivate && !$this->isForRelatedUsers) || $user->isAdmin()) {
            return true;
        }
        
        if ($user->getId() === $this->getProject()->getUser()->getId()) {
            return true;
        }
        foreach ($this->relUsers as $rel) {
            if ($rel->getUser()->getId() === $user->getId()) {
                return true;
            }
        }

        return false;
    }

    public function availableForWriting(User $user)
    {
        if (($user->getId() === $this->getProject()->getUser()->getId()) || $user->isAdmin()) {
            return true;
        }
        foreach ($this->relUsers as $rel) {
            if (($rel->getUser()->getId() === $user->getId()) && !$rel->getReadOnly()) {
                return true;
            }
        }

        return false;
    }

    public function availableForDelete(User $user)
    {
        if ($user->isAdmin() || $user == $this->project->getUser()) {
            return true;
        }

        return false;
    }

    /**
     * @param User $user
     * @return bool
     */
    public function inRelUsers(User $user)
    {
        foreach ($this->relUsers as $relUser) {
            if ($user->getUsername() == $relUser->getUser()->getUsername()) {
                return true;
            }
        }

        return false;
    }

    /**
     * Add dividers
     *
     * @param \App\Entity\ProjectRelsDivider $dividers
     * @return ProjectData
     */
    public function addDivider(\App\Entity\ProjectRelsDivider $dividers)
    {
        $this->dividers[] = $dividers;

        return $this;
    }

    /**
     * Remove dividers
     *
     * @param \App\Entity\ProjectRelsDivider $dividers
     */
    public function removeDivider(\App\Entity\ProjectRelsDivider $dividers)
    {
        $this->dividers->removeElement($dividers);
    }

    /**
     * Get dividers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getDividers()
    {
        return $this->dividers;
    }

    public function updateFromDTO(ProjectDataDTO $dto)
    {
        $this->sheet = $dto->sheet;
        $this->isForRelatedUsers = $dto->isForRelatedUsers;
        $this->isPrivate = $dto->isPrivate;
        $this->isAllRecords = $dto->isAllRecords;

        if ($dto->relUsers && is_array($dto->relUsers)) {
            $relUsersByIds = array_column($dto->relUsers, 'read_only', 'id');
            /**
             * @var RelProjectUser $relUser
             */
            foreach ($this->relUsers as $relUser) {
                if (isset($relUsersByIds[$relUser->getId()])) {
                    $relUser->setReadOnly($relUsersByIds[$relUser->getId()]);
                }
            }
        }

    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'sheet' => $this->sheet,
            'is_private' => $this->isPrivate,
            'is_for_related_users' => $this->isForRelatedUsers,
            'is_all_records' => $this->isAllRecords,
            'rel_users' => $this->relUsers->map(function (RelProjectUser $user) {
                return $user->getDTO();
            })->toArray()
        ];
    }
}
