<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

class TestTag
{
    public $name;

    public function __construct($name = '')
    {
        $this->name = $name;
    }
}