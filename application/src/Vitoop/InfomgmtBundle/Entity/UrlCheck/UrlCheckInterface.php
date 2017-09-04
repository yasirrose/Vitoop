<?php

namespace Vitoop\InfomgmtBundle\Entity\UrlCheck;

interface UrlCheckInterface
{
    public function skip();
    public function unskip();
    public function isSkip();
}
