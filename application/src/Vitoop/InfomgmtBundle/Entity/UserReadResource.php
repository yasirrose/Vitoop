<?php

namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(
 *      name="users_readable",
 *      uniqueConstraints={
 *        @ORM\UniqueConstraint(
 *          name="uniqueusersred_idx", columns={"resource_id", "user_id"}
 *        )
 *      }
 * )
 * @ORM\Entity()
 */
class UserReadResource
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="userReads")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     */
    private $resource;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * UserReadResource constructor.
     * @param User $user
     * @param Resource $resource
     */
    public function __construct(User $user, Resource $resource)
    {
        $this->user = $user;
        $this->resource = $resource;
        $this->createdAt = new \DateTime();
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @return Resource
     */
    public function getResource()
    {
        return $this->resource;
    }
}
