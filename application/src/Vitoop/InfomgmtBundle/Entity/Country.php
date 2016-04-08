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
     * @ORM\Id()
     * @ORM\Column(name="code", type="string", length=2)
     * @ORM\GeneratedValue(strategy="NONE")
     */
    protected $code;

    /**
     * @ORM\Column(name="name", type="string", length=255)
     */
    protected $name;

    /**
     * @ORM\Column(name="sort_order", type="integer", nullable=true)
     */
    protected $sortOrder;

    public function __construct($code, $name, $order = null)
    {
        $this->code = $code;
        $this->name = $name;
        $this->sortOrder = $order;
    }

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
}
