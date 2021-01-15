<?php
namespace App\Entity;

use App\DTO\Resource\Export\ExportRatingDTO;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Entity\User\User;

/**
 * @ORM\Table(name="rating",
 * uniqueConstraints={@ORM\UniqueConstraint(name="uniquerating_idx",
 * columns={"id_resource", "id_user"})})
 * @ORM\Entity(repositoryClass="App\Repository\RatingRepository")
 */
class Rating
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="mark", type="integer")
     *
     * @Assert\Range(min = "-5", max = "5", minMessage = "Minimum Rating is -5.", maxMessage = "Maximum Rating is 5.")
     * @Assert\NotNull()
     */
    protected $mark;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User", inversedBy="ratings")
     * @ORM\JoinColumn(name="id_user", referencedColumnName="id")
     */
    protected $user;

    /**
     * @ORM\ManyToOne(targetEntity="Resource", inversedBy="ratings")
     * @ORM\JoinColumn(name="id_resource", referencedColumnName="id")
     */
    protected $resource;

    public function __construct()
    {
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
     * Set mark
     *
     * @param integer $mark
     */
    public function setMark($mark)
    {
        $this->mark = $mark;
    }

    /**
     * Get mark
     *
     * @return integer
     */
    public function getMark()
    {
        return $this->mark;
    }

    /**
     * Set user
     *
     * @param User $user
     */
    public function setUser(User $user)
    {
        $this->user = $user;
        $user->addRating($this);
    }

    /**
     * Get user
     *
     * @return string
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set resource
     *
     * @param Resource $resource
     */
    public function setResource(Resource $resource)
    {
        $this->resource = $resource;
        $resource->addRating($this);
    }

    /**
     * Get resource
     *
     * @return Resource
     */
    public function getResource()
    {
        return $this->resource;
    }

    public static function create(Resource $resource, User $user, $mark)
    {
        $rating = new Rating();
        $rating->resource = $resource;
        $rating->user = $user;
        $rating->mark = $mark;

        return $rating;
    }

    public function toExportRatingDTO()
    {
        return new ExportRatingDTO(
            $this->id,
            $this->resource->getId(),
            $this->mark,
            $this->user->getDTO()
        );
    }
}
