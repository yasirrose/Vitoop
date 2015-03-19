<?php

namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

/**
 * Help
 *
 * @ORM\Table("help")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\HelpRepository")
 */
class Help
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Serializer\Groups({"get", "edit"})
     * @Serializer\Type("integer")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="text", type="string", length=10000)
     * @Serializer\Groups({"get", "edit"})
     * @Serializer\Type("string")
     */
    private $text;


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
     * @return Help
     */
    public function setText($text)
    {
        $this->text = $text;

        return $this;
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
}
