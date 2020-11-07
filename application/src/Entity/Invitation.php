<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\DTO\GetDTOInterface;
use App\Entity\ValueObject\DateTime;
use App\Entity\User\User;

/**
 * @ORM\Table(name="vitoop_user_invitation")
 * @ORM\Entity()
 */
class Invitation implements GetDTOInterface
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="subject", type="string", length=64)
     */
    protected $subject;

    /**
     * @ORM\Column(name="mail", type="string", length=4096)
     */
    protected $mail;

    /**
     * @ORM\Column(name="email", type="string", length=60, unique=true)
     */
    protected $email;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="invitations")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id", nullable=true)
     */
    protected $user;

    /**
     * @ORM\Column(name="secret", type="string", length=32, unique=true)
     */
    protected $secret;

    /**
     * @ORM\Column(name="until", type="datetime")
     */
    protected $until;

    public function __construct($email = null)
    {
        $this->email = $email;
        $this->subject = 'Einladung zum Informationsportal vitoop';
        $this->secret = md5(bin2hex(random_bytes(22)));
        $this->updateUntil();
    }

    public function __toString()
    {
        return $this->secret;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addInvitation($this);
    }

    /**
     * @param mixed $mail
     */
    public function setMail($mail)
    {
        $this->mail = $mail;
    }

    /**
     * @return mixed
     */
    public function getMail()
    {
        return $this->mail;
    }

    /**
     * @param mixed $subject
     */
    public function setSubject($subject)
    {
        $this->subject = $subject;
    }

    /**
     * @return mixed
     */
    public function getSubject()
    {
        return $this->subject;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    /**
     * @return mixed
     */
    public function getSecret()
    {
        return $this->secret;
    }

    /**
     * @param mixed $until
     */
    public function setUntil($until)
    {
        $this->until = $until;
    }

    /**
     * @return mixed
     */
    public function getUntil()
    {
        return $this->until;
    }

    public function updateUntil()
    {
        $this->until = new \DateTime();
        $this->until->add(new \DateInterval('P3D'));
    }

    public function isActual()
    {
        return (new \DateTime() <= $this->until);
    }

    public function getDTO()
    {
        return [
            'id' => $this->id,
            'email' => $this->email,
            'until' => new DateTime($this->until),
        ];
    }
}
