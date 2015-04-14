<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Table(name="user_config")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\UserConfigRepository")
 */
class UserConfig
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="User", mappedBy="user_config")
     */
    protected $user;

    /**
     * @ORM\Column(name="max_per_page", type="integer")
     */
    protected $max_per_page;

    /**
     * @ORM\Column(name="number_of_todo_elements", type="integer", options={"default" = 12})
     * @Assert\Range(
     *      min = 5,
     *      max = 20,
     *      minMessage = "Count must be more than 4",
     *      maxMessage = "Count must be less than 21"
     * )
     */
    protected $numberOfTodoElements;

    /**
     * @ORM\Column(name="height_of_todo_list", type="integer", options={"default" = 550})
     * @Assert\Range(
     *      min = 150,
     *      max = 5000,
     *      minMessage = "Count must be more than 150",
     *      maxMessage = "Count must be less than 5000"
     * )
     */
    protected $heightOfTodoList;


    public function __construct(User $user)
    {
        $this->setUser($user);
        $this->setMaxPerPage(10);
        $this->heightOfTodoList = 550;
        $this->numberOfTodoElements = 12;
    }

    /**
     * @param mixed $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $user
     */
    public function setUser($user)
    {
        $this->user = $user;
        $user->setUserConfig($this);
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param mixed $max_per_page
     */
    public function setMaxPerPage($max_per_page)
    {
        $this->max_per_page = $max_per_page;
    }

    /**
     * @return mixed
     */
    public function getMaxPerPage()
    {
        return $this->max_per_page;
    }

    /**
     * Set numberOfTodoElements
     *
     * @param integer $numberOfTodoElements
     * @return UserConfig
     */
    public function setNumberOfTodoElements($numberOfTodoElements)
    {
        $this->numberOfTodoElements = $numberOfTodoElements;

        return $this;
    }

    /**
     * Get numberOfTodoElements
     *
     * @return integer 
     */
    public function getNumberOfTodoElements()
    {
        return $this->numberOfTodoElements;
    }

    /**
     * Set heightOfTodoList
     *
     * @param integer $heightOfTodoList
     * @return UserConfig
     */
    public function setHeightOfTodoList($heightOfTodoList)
    {
        $this->heightOfTodoList = $heightOfTodoList;

        return $this;
    }

    /**
     * Get heightOfTodoList
     *
     * @return integer 
     */
    public function getHeightOfTodoList()
    {
        return $this->heightOfTodoList;
    }
}
