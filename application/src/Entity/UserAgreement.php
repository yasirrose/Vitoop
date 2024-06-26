<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\User\User;

/**
 * @ORM\Table(name="vitoop_user_agreement")
 * @ORM\Entity(repositoryClass="App\Repository\UserAgreementRepository")
 */
class UserAgreement
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
     * @ORM\Column(name="ip", type="string", length=30, nullable=true)
     */
    private $ip;

    /**
     * @ORM\Column(name="created_at", type="datetime")
     */
    private $createdAt;

    public function __construct(User $user, $ip)
    {
        $this->user = $user;
        $this->ip = $ip;
        $this->createdAt = new \DateTime();
    }

    public function getcreatedAt()
    {
        return $this->createdAt;
    }
}
