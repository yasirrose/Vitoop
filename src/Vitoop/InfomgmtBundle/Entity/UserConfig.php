<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

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

    public function __construct(User $user)
    {
        $this->setUser($user);
        $this->setMaxPerPage(10);
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
}