<?php

namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Table(name="countries")
 * @ORM\Entity()
 */
class Country
{
    /**
     * @var string
     *
     * @ORM\Id()
     * @ORM\Column(name="code", type="string", length=2)
     * @ORM\GeneratedValue(strategy="NONE")
     */
    protected $code;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;

    /**
     * @var int
     *
     * @ORM\Column(name="sort_order", type="integer", nullable=true)
     */
    protected $sortOrder;

    public function __construct($code, $name, $order = null)
    {
        $this->code = $code;
        $this->name = $name;
        $this->sortOrder = $order;
    }

    /**
     * @return string
     */
    public function getCode()
    {
        return $this->code;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getSortOrder()
    {
        return $this->sortOrder;
    }

    public function __toString()
    {
        return $this->code;
    }
}
