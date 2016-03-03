<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user_data")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\UserDataRepository")
 */
class UserData
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="sheet", type="text", length=65536)
     */
    protected $sheet;

    /**
     * @ORM\OneToOne(targetEntity="User", mappedBy="user_data")
     */
    protected $user;

    public function __construct(User $user)
    {
        $this->setUser($user);
        $this->sheet = '<p>Hier kannst Du Deine persönliche Notzen reinschreiben, die nur für Dich sichtbar sind.</p>';
    }

    /**
     * Set id
     *
     * @param integer $id
     */
    public function setId($id)
    {
        $this->id = $id;
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
     * Set sheet
     *
     * @param string $sheet
     */
    public function setSheet($sheet)
    {
        $this->sheet = $sheet;
    }

    /**
     * Get sheet
     *
     * @return string
     */
    public function getSheet()
    {
        return $this->sheet;
    }

    /**
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->setUserData($this);
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
}