<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Table(name="tag")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\TagRepository")
 */
class Tag
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(name="text", type="string", length=48, unique=true)
     */
    protected $text;

    /**
     * @ORM\OneToMany(targetEntity="RelResourceTag", mappedBy="tag")
     */
    protected $rel_resources;

    public function __construct()
    {
        $this->rel_resources = new ArrayCollection();
    }

    public function __toString()
    {
        return $this->text;
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
     * Set text
     *
     * @param string $text
     */
    public function setText($text)
    {
        $this->text = $text;
    }

    /**
     * Get text
     *
     * @return string
     */
    public function getText()
    {
        return $this->text;
    }

    /**
     * Add rel_resources
     *
     * @param RelResourceTag $relResources
     */
    public function addRelResourceTag(\Vitoop\InfomgmtBundle\Entity\RelResourceTag $relResources)
    {
        $this->rel_resources[] = $relResources;
    }

    /**
     * Get rel_resources
     *
     * @return ArrayCollection
     */
    public function getRelResources()
    {
        return $this->rel_resources;
    }
}