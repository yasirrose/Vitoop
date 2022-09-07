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
    const BLUE_COLOR = "blue";
    const LIME_COLOR = "lime";
    const RED_COLOR = "red";
    const YELLOW_COLOR = "yellow";
    const CYAN_COLOR = "cyan";
    const ORANGE_COLOR = "orange";

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

    /**
     * @ORM\Column(name="color", type="string", length=30, nullable=true, options={"default":"blue"})
     */
    protected $color;

    public function __construct(User $user, Resource $resource, string $color)
    {
        $this->user = $user;
        $this->resource = $resource;
        $this->color = $color;
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

    /**
     * Set color
     *
     * @param string $color
     */
    public function updateColor(string $color) : UserHookResource
    {
        $this->color = $color;

        return $this;
    }

    public function getColor() : string
    {
        return $this->color;
    }
}
