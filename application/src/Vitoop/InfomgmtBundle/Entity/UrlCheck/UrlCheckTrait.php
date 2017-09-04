<?php

namespace Vitoop\InfomgmtBundle\Entity\UrlCheck;

use Doctrine\ORM\Mapping as ORM;

trait UrlCheckTrait
{
    /**
     * @ORM\Column(name="last_checked_at", type="datetime", nullable=true, options={"default" = null})
     */
    protected $lastCheckAt;

    /**
     * @ORM\Column(name="is_skip", type="boolean", options={"default" = false})
     */
    protected $isSkip;

    public function updateLastCheck()
    {
        $this->lastCheckAt = new \DateTime();
    }

    public function skip()
    {
        $this->isSkip = true;
    }

    public function unskip()
    {
        $this->isSkip = false;
    }

    public function isSkip()
    {
        return $this->isSkip;
    }
}
