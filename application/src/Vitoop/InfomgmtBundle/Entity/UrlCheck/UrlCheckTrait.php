<?php

namespace Vitoop\InfomgmtBundle\Entity\UrlCheck;

use Doctrine\ORM\Mapping as ORM;

trait UrlCheckTrait
{
    /**
     * @ORM\Column(name="last_checked_at", type="datetime", nullable=true, options={"default" = null})
     */
    protected $lastCheckAt;

    public function updateLastCheck()      
    {
        $this->lastCheckAt = new \DateTime();
    }
}
