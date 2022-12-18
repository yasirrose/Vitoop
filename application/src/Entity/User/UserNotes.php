<?php

namespace App\Entity\User;

use App\DTO\GetDTOInterface;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="user_notes")
 * @ORM\Entity(repositoryClass="App\Repository\UserNotesRepository")
 */
class UserNotes implements GetDTOInterface
{
    /**
     * @ORM\Id()
     * @ORM\Column(name="id", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", unique=true)
     */
    private $user;

    /**
     * @ORM\Column(name="notes", type="text", length=65536)
     */
    private $notes;

    /**
     * UserNotes constructor.
     * @param $user
     * @param $notes
     */
    public function __construct($user, $notes)
    {
        $this->user = $user;
        $this->notes = $notes;
    }

    public function updateNotes($notes)
    {
        $this->notes = $notes ?? '';
    }

    public function setNotes($notes)
    {
        $this->notes = $notes;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getNotes()
    {
        return $this->notes;
    }

    public function getDTO()
    {
        return [
            'notes' => $this->notes
        ];
    }
}
