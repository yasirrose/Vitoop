<?php
namespace App\Entity;

use App\DTO\Resource\Export\ExportResourceTagDTO;
use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="rel_resource_tag",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniquetag_idx",
 * columns={"id_resource", "id_tag", "id_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\RelResourceTagRepository")
 */
class RelResourceTag
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="rel_tags")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id")
     */
    protected $resource;

    /**
     * @ORM\ManyToOne(targetEntity="Tag", inversedBy="rel_resources")
     * @ORM\JoinColumn(name="id_tag", referencedColumnName="id")
     */
    protected $tag;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="rel_resource_tags")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="deleted_rel_resource_tags")
     * @ORM\JoinColumn(name="deleted_by_id_user", referencedColumnName="id", nullable=true)
     */
    protected $deletedByUser;

    /**
     * RelResourceTag constructor.
     * @param Resource $resource
     * @param Tag $tag
     * @param User $user
     */
    public function __construct(Resource $resource, Tag $tag, User $user)
    {
        $this->resource = $resource;
        $this->tag = $tag;
        $this->user = $user;
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
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addRelResourceTag($this);
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
     * Set resource
     *
     * @param Resource $resource
     */
    public function setResource(Resource $resource)
    {
        $this->resource = $resource;
        $resource->addRelResourceTag($this);
    }

    /**
     * Get resource
     *
     * @return Resource
     */
    public function getResource()
    {
        return $this->resource;
    }

    /**
     * Set tag
     *
     * @param Tag $tag
     */
    public function setTag(Tag $tag)
    {
        $this->tag = $tag;
        $tag->addRelResourceTag($this);
    }

    /**
     * Get tag
     *
     * @return Tag
     */
    public function getTag()
    {
        return $this->tag;
    }

    /**
     * Set deletedByUser
     *
     * @param User $deletedByUser
     * @return RelResourceTag
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

    /**
     * @param User $user
     */
    public function unlinkTag(User $user)
    {
        $this->deletedByUser = $user;
    }

    public function toExportResourceTagDTO()
    {
        return new ExportResourceTagDTO(
            $this->id,
            $this->resource->getId(),
            $this->user->getDTO(),
            $this->tag->getText(),
            $this->deletedByUser ? $this->deletedByUser->getDTO() : null
        );
    }
}
