<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\Resource;
use App\Entity\User\User;

/**
 * @ORM\Table(name="watchlist",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniqueentry_idx",
 * columns={"id_resource", "id_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\WatchlistRepository")
 */
class Watchlist
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="watchlist_entries")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="watchlist_entries")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id", onDelete="cascade")
     */
    protected $resource;

    /**
     * @ORM\Column(name="note", type="string", length=255)
     */
    protected $note;

    public function __construct()
    {
        $this->note = '';
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
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addWatchlistEntry($this);
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
     * Set resource
     *
     * @param App\Entity\Resource $resource
     */
    public function setResource(Resource $resource)
    {
        $this->resource = $resource;
        $resource->addWatchlistEntry($this);
    }

    /**
     * Get resource
     *
     * @return App\Entity\Resource
     */
    public function getResource()
    {
        return $this->resource;
    }

    /**
     * Set note
     *
     * @param string $note
     */
    public function setNote($note)
    {
        $this->note = $note;
    }

    /**
     * Get note
     *
     * @return string
     */
    public function getNote()
    {
        return $this->note;
    }
}