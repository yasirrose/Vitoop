<?php
namespace App\Entity;

use App\Entity\User\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(
 *      name="user_mail_detail",
 *      uniqueConstraints={
 *        @ORM\UniqueConstraint(
 *          name="uniqueusersres_idx", columns={"resource_id", "user_id"}
 *        )
 *      }
 * )
 * @ORM\Entity()
 */
class UserEmailDetailResource
{

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="userSetEmail")
     * @ORM\JoinColumn(name="resource_id", referencedColumnName="id")
     */
    private $resource;

    /**
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @ORM\Column(name="send_mail", type="string", length=255, nullable=true, options={"default":"0"})
     */
    protected $sendMail;

    public function __construct(User $user, Resource $resource, string $sendMail)
    {
        $this->user = $user;
        $this->resource = $resource;
        $this->sendMail = $sendMail;
        $this->createdAt = new \DateTime();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUser()
    {
        return $this->user;
    }

    public function getResource()
    {
        return $this->resource;
    }

    /**
     * Set sendMail
     *
     * @param string $sendMail
     */
    public function updateSendEmail(string $sendMail) : UserEmailDetailResource
    {
        $this->sendMail = $sendMail;
        return $this;
    }

    public function getSendEmail() : string
    {
        return $this->sendMail;
    }
}
