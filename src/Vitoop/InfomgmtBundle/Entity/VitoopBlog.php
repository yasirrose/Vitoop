<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="vitoop_blog")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\VitoopBlogRepository")
 */
class VitoopBlog
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

    public function __construct()
    {
        $this->sheet = '<h1>Willkommen!</h1>';
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
}