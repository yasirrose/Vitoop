<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Table(name="remark_private")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\RemarkPrivateRepository")
 */
class RemarkPrivate
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
     * @ORM\ManyToOne(targetEntity="User", inversedBy="remarksPrivate")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="remarksPrivate")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id")
     */
    protected $resource;

    public function __construct()
    {
        $this->created_at = new \DateTime();
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
        $user->addRemarkPrivate($this);
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
        $resource->addRemarkPrivate($this);
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
}
   
