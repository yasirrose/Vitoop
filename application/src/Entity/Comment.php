<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\DTO\GetDTOInterface;
use App\DTO\Resource\CommentDTO;
use App\Entity\User\User;

/**
 * @ORM\Table(name="comment")
 * @ORM\Entity(repositoryClass="App\Repository\CommentRepository")
 */
class Comment implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="text", type="string", length=512)
     */
    protected $text;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    protected $created_at;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="comments")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="comments")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id", onDelete="cascade")
     */
    protected $resource;

    /**
     * @var boolean
     * 
     * @ORM\Column(name="is_visible", type="boolean", options={"default":true})
     */
    protected $isVisible = true;

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
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Set created_at
     *
     * @param \Datetime $created_at
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
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addComment($this);
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
        $resource->addComment($this);
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

    public function getIsVisible()
    {
        return $this->isVisible;
    }

    public function changeVisibity($isVisble)
    {
        $this->isVisible = $isVisble;
    }

    public function getDTO()
    {
        return array(
            'id'=> $this->id,
            'text' => $this->text,
            'user' => array(
                'id' => $this->user->getId(),
                'username' => $this->user->getUsername(),
            ),
            'isVisible' => $this->isVisible,
            'created_at' => $this->created_at->format(\DateTime::ISO8601)
        );
    }

    public static function create(Resource $resource, User $user, CommentDTO $dto)
    {
        $comment = new Comment();
        $comment->resource = $resource;
        $comment->user = $user;
        $comment->text = $dto->text;
        $comment->isVisible = $dto->isVisible;
        $comment->created_at = $dto->createdAt;

        return $comment;
    }
}
