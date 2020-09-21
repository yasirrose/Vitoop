<?php
namespace App\Entity;

use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;
use App\DTO\GetDTOInterface;

/**
 * @ORM\Table(name="rel_resource_resource",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniquerelresres_idx",
 * columns={"id_resource1", "id_resource2", "id_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\RelResourceResourceRepository")
 */
class RelResourceResource implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="rel_resources1")
     * @ORM\JoinColumn(name="id_resource1", referencedColumnName="id")
     */
    protected $resource1;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="rel_resources2")
     * @ORM\JoinColumn(name="id_resource2", referencedColumnName="id")
     */
    protected $resource2;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="rel_resource_resources")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\Column(name="coefficient", type="float", options={"default":0})
     */
    protected $coefficient;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="deleted_rel_resource_resources")
     * @ORM\JoinColumn(name="deleted_by_id_user", referencedColumnName="id", nullable=true)
     */
    protected $deletedByUser;

    /**
     * @var int
     * @ORM\Column(name="count_links", type="smallint", options={"default": 1, "unsigned": true})
     */
    protected $countLinks;

    /**
     * RelResourceResource constructor.
     * @param $resource1
     * @param $resource2
     * @param $user
     */
    public function __construct(Resource $resource1, Resource $resource2, User $user)
    {
        $this->resource1 = $resource1;
        $this->resource2 = $resource2;
        $this->user = $user;
        $this->coefficient = 0;
        $this->countLinks = 1;
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
     * Set resource1
     *
     * @param \App\Entity\Resource $resource1
     */
    public function setResource1(Resource $resource1)
    {
        $this->resource1 = $resource1;
        $resource1->addRelResourceResource1($this);
    }

    /**
     * Get resource1
     *
     * @return \App\Entity\Resource
     */
    public function getResource1()
    {
        return $this->resource1;
    }

    /**
     * Set resource2
     *
     * @param \App\Entity\Resource $resource2
     */
    public function setResource2(Resource $resource2)
    {
        $this->resource2 = $resource2;
        $resource2->addRelResourceResource2($this);
    }

    /**
     * Get resource2
     *
     * @return \App\Entity\Resource
     */
    public function getResource2()
    {
        return $this->resource2;
    }

    /**
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addRelResourceResource($this);
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
     * Set coefficient
     *
     * @param float $coefficient
     * @return RelResourceResource
     */
    public function setCoefficient($coefficient)
    {
        $this->coefficient = $coefficient;

        return $this;
    }

    /**
     * Get coefficient
     *
     * @return float 
     */
    public function getCoefficient()
    {
        return $this->coefficient;
    }

    /**
     * Set deletedByUser
     *
     * @param User $deletedByUser
     * @return RelResourceResource
     */
    public function setDeletedByUser(User $deletedByUser = null)
    {
        $this->deletedByUser = $deletedByUser;

        return $this;
    }

    /**
     * Get deletedByUser
     *
     * @return User
     */
    public function getDeletedByUser()
    {
        return $this->deletedByUser;
    }

    public function increaseCountLinks()
    {
        $this->countLinks++;
    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'resourceId' => $this->getResource1()->getId(),
            'linkedResourceId' => $this->getResource2()->getId(),
            'coefficient' => $this->coefficient,
            'userId' => $this->user->getId(),
        ];
    }
}
