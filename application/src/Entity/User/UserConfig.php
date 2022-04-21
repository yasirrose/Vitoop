<?php
namespace App\Entity\User;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Table(name="user_config")
 * @ORM\Entity(repositoryClass="App\Repository\UserConfigRepository")
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
     *      maxMessage = "Count must be less than 21",
     *      invalidMessage="Count must be a number"
     * )
     * @Serializer\Groups({"edit"})
     * @Serializer\Type("integer")
     */
    protected $numberOfTodoElements;

    /**
     * @ORM\Column(name="height_of_todo_list", type="integer", options={"default" = 550})
     * @Assert\Range(
     *      min = 150,
     *      max = 5000,
     *      minMessage = "Height must be more than 150",
     *      maxMessage = "Height must be less than 5000",
     *      invalidMessage="Height must be a number"
     * )
     * @Serializer\Groups({"edit"})
     * @Serializer\Type("integer")
     */
    protected $heightOfTodoList;

    /**
     * @ORM\Column(name="is_check_max_link", type="boolean", options={"default" = true})
     */
    protected $isCheckMaxLink;

    /**
     * @var int
     * @ORM\Column(name="decrease_font_size", type="smallint", options={"default" = 1})
     */
    protected $decreaseFontSize = 1;

    /**
     * @ORM\Column(type="boolean", options={"default" = false})
     */
    protected $isOpenInSameTabPdf = false;

    /**
     * @ORM\Column(type="boolean", options={"default" = false})
     */
    protected $isOpenInSameTabTeli = false;

    /**
     * @ORM\Column(type="boolean", options={"default" = false})
     */
    protected $isTeliInHtmlEnable = false;

    public function __construct(User $user)
    {
        $this->setUser($user);
        $this->setMaxPerPage(10);
        $this->setIsCheckMaxLink(true);
        $this->heightOfTodoList = 550;
        $this->numberOfTodoElements = 12;
        $this->decreaseFontSize = 1;
        $this->isOpenInSameTab = false;
        $this->isTeliInHtmlEnable = false;
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
     * @return mixed
     */
    public function getIsCheckMaxLink()
    {
        return $this->isCheckMaxLink;
    }

    /**
     * @param mixed $isCheckMaxLink
     */
    public function setIsCheckMaxLink($isCheckMaxLink)
    {
        $this->isCheckMaxLink = $isCheckMaxLink;
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

    /**
     * @return int
     */
    public function getDecreaseFontSize(): int
    {
        return $this->decreaseFontSize;
    }

    /**
     * @return bool
     */
    public function isOpenInSameTabPdf(): bool
    {
        return $this->isOpenInSameTabPdf ?? false;
    }

    /**
     * @return bool
     */
    public function isOpenInSameTabTeli(): bool
    {
        return $this->isOpenInSameTabTeli;
    }

    public function isTeliInHtmlEnable(): bool
    {
        return $this->isTeliInHtmlEnable ?? false;
    }

    public function updateUserSettings(
        $numberElements,
        $heightList,
        $decreaseFontSize,
        $isOpenInSameTabPdf,
        $isOpenInSameTabTeli,
        $isTeliInHtmlEnable
    ) {
        $this->numberOfTodoElements = $numberElements;
        $this->heightOfTodoList = $heightList;
        $this->decreaseFontSize = $decreaseFontSize;
        $this->isOpenInSameTabPdf = $isOpenInSameTabPdf ?? false;
        $this->isOpenInSameTabTeli = $isOpenInSameTabTeli ?? false;
        $this->isTeliInHtmlEnable = $isTeliInHtmlEnable ?? false;
    }
}
