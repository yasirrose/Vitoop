<?php

namespace App\Entity;

use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(
 *      name="users_resources",
 *      uniqueConstraints={
 *        @ORM\UniqueConstraint(
 *          name="uniqueusersres_idx", columns={"resource_id", "user_id"}
 *        )
 *      }
 * )
 * @ORM\Entity()
 */
class UserHookResource
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="userHooks")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     */
    private $resource;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    public function __construct(User $user, Resource $resource)
    {
        $this->user = $user;
        $this->resource = $resource;
        $this->createdAt = new \DateTime();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function getResource()
    {
        return $this->resource;
    }
}
