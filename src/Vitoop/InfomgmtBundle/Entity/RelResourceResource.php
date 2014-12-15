<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="rel_resource_resource",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniquerelresres_idx",
 * columns={"id_resource1", "id_resource2", "id_user"})})
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\RelResourceResourceRepository")
 */
class RelResourceResource
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
     * @ORM\ManyToOne(targetEntity="User", inversedBy="rel_resource_resources")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

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
     * @param \Vitoop\InfomgmtBundle\Entity\Resource $resource1
     */
    public function setResource1(Resource $resource1)
    {
        $this->resource1 = $resource1;
        $resource1->addRelResourceResource1($this);
    }

    /**
     * Get resource1
     *
     * @return \Vitoop\InfomgmtBundle\Entity\Resource
     */
    public function getResource1()
    {
        return $this->resource1;
    }

    /**
     * Set resource2
     *
     * @param \Vitoop\InfomgmtBundle\Entity\Resource $resource2
     */
    public function setResource2(Resource $resource2)
    {
        $this->resource2 = $resource2;
        $resource2->addRelResourceResource2($this);
    }

    /**
     * Get resource2
     *
     * @return \Vitoop\InfomgmtBundle\Entity\Resource
     */
    public function getResource2()
    {
        return $this->resource2;
    }

    /**
     * Set user
     *
     * @param \Vitoop\InfomgmtBundle\Entity\User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addRelResourceResource($this);
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
}