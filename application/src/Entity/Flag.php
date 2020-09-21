<?php
namespace App\Entity;

use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;
use App\DTO\GetDTOInterface;
use App\DTO\Resource\FlagDTO;
use App\Entity\UrlCheck\UrlCheckInterface;

/**
 * @ORM\Table(name="flag")
 * @ORM\Entity(repositoryClass="App\Repository\FlagRepository")
 */
class Flag implements GetDTOInterface
{
    const FLAG_DELETE = 1;

    const FLAG_BLAME = 2;

    const FLAG_REVIEW = 4;

    const FLAG_8 = 8;

    const FLAG_16 = 16;

    const FLAG_32 = 32;

    const FLAG_64 = 64;

    const FLAG_GONE = 128;

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
     * @ORM\Column(name="type", type="smallint")
     */
    protected $type;

    /**
     * @ORM\Column(name="info", type="string", length=128)
     */
    protected $info;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="flags")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="flags")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id")
     */
    protected $resource;

    public function __construct()
    {
        $this->created_at = new \DateTime();
    }

    /**
     * @param Resource $resource
     * @param User $user
     * @param int $type
     * @param string $info
     * @return Flag
     */
    public static function create(Resource $resource, User $user, $type, $info)
    {
        $flag = new Flag();
        $flag->resource = $resource;
        $flag->user = $user;
        $flag->type = $type;
        $flag->info = $info;

        return $flag;
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
     * Set type
     *
     * @param integer $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * Get type
     *
     * @return integer
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set info
     *
     * @param string $info
     */
    public function setInfo($info)
    {
        $this->info = $info;
    }

    /**
     * Get info
     *
     * @return string
     */
    public function getInfo()
    {
        return $this->info;
    }

    /**
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addFlag($this);
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
     * @param \App\Entity\Resource $resource
     */
    public function setResource(Resource $resource)
    {
        $this->resource = $resource;
        $resource->addFlag($this);
    }

    /**
     * Get resource
     *
     * @return \App\Entity\Resource
     */
    public function getResource()
    {
        return $this->resource;
    }

    /**
     * @return bool
     */
    public function isSkip()
    {
        if ($this->resource instanceof UrlCheckInterface) {
            return $this->resource->isSkip();
        }

        return false;
    }

    /**
     * @return bool
     */
    public function isBlamed()
    {
        return self::FLAG_BLAME === $this->type;
    }

    public function approve()
    {
        $this->type = self::FLAG_GONE;
    }

    public function updateFromDTO(FlagDTO $flagDTO)
    {
        $this->type = $flagDTO->type;
        $this->info = $flagDTO->info;
    }

    public function getDTO()
    {
        $flagDTO = new FlagDTO(
            $this->id,
            $this->type,
            $this->info,
            $this->created_at,
            $this->user->getId(),
            $this->user->getUsername()
        );

        return $flagDTO->jsonSerialize();
    }
}
