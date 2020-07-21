<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\Resource\RemarkDTO;

/**
 * @ORM\Table(name="remark")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\RemarkRepository")
 */
class Remark
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $created_at;

    /**
     * @ORM\Column(name="text", type="string", length=2048)
     *
     * @Assert\NotNull()
     */
    protected $text;

    /**
     * @ORM\Column(name="ip", type="string", length=30, nullable=true)
     */
    protected $ip;

    /**
     * @ORM\ManyToOne(targetEntity="User", inversedBy="remarks")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="remarks")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id", onDelete="cascade")
     */
    protected $resource;

    /**
     * @ORM\Column(name="is_locked", type="boolean")
     */
    protected $locked;

    public function __construct()
    {
        $this->created_at = new \DateTime();
        $this->locked = false;
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
     * Set created_at
     *
     * @param \DateTime $created_at
     */
    public function setCreatedAt($created_at)
    {
        $this->created_at = $created_at;
    }

    /**
     * Get created_at
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set text
     *
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * Get text
     *
     * @return integer
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addRemark($this);
    }

    /**
     * Get user
     *
     * @return string
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
        $resource->addRemark($this);
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
     * Set locked
     *
     * @param boolean $locked
     */
    public function setLocked($locked)
    {
        $this->locked = $locked;
    }

    /**
     * Is locked
     *
     * @return boolean
     */
    public function isLocked()
    {
        return $this->locked;
    }

    /**
     * Get locked
     *
     * @return boolean 
     */
    public function getLocked()
    {
        return $this->locked;
    }

    /**
     * Set ip
     *
     * @param string $ip
     * @return Remark
     */
    public function setIp($ip)
    {
        $this->ip = $ip;

        return $this;
    }

    /**
     * Get ip
     *
     * @return string
     */
    public function getIp()
    {
        return $this->ip;
    }

    public static function create(Resource $resource, User $user, RemarkDTO $dto)
    {
        $remark = new Remark();
        $remark->user = $user;
        $remark->resource = $resource;
        $remark->text = $dto->text;
        $remark->locked = $dto->locked;

        return $remark;
    }
}
