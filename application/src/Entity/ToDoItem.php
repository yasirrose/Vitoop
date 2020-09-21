<?php

namespace App\Entity;

use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * ToDoItem
 *
 * @ORM\Table(name="to_do_item")
 * @ORM\Entity(repositoryClass="App\Repository\ToDoItemRepository")
 */
class ToDoItem
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"list", "edit"})
     * @Serializer\Type("integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=300)
     * @Serializer\Groups({"list", "new", "edit"})
     * @Serializer\Type("string")
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="string", length=10000)
     * @Serializer\Groups({"list", "new", "edit"})
     * @Serializer\Type("string")
     */
    private $text;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="created_at", type="datetime")
     * @Serializer\Groups({"list", "new", "edit"})
     * @Serializer\Type("DateTime<'d.m.Y'>")
     */
    private $createdAt;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updated_at", type="datetime")
     * @Serializer\Groups({"list", "new", "edit"})
     * @Serializer\Type("DateTime<'d.m.Y'>")
     */
    private $updatedAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="toDoItems")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     * @Serializer\Type("App\Entity\User\User")
     * @Serializer\Groups({"edit"})
     */
    private $user;

    /**
     * @var integer
     *
     * @ORM\Column(name="sort_order", type="integer", options={"default"=0})
     * @Serializer\Groups({"list", "edit"})
     * @Serializer\Type("integer")
     */
    private $order;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
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
     * Set title
     *
     * @param string $title
     * @return ToDoItem
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set text
     *
     * @param string $text
     * @return ToDoItem
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     * @return ToDoItem
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     * @return ToDoItem
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set user
     *
     * @param User $user
     * @return ToDoItem
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
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
     * Set order
     *
     * @param integer $order
     * @return ToDoItem
     */
    public function setOrder($order)
    {
        $this->order = $order;

        return $this;
    }

    /**
     * Get order
     *
     * @return integer 
     */
    public function getOrder()
    {
        return $this->order;
    }
}
