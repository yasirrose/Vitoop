<?php

namespace Vitoop\InfomgmtBundle\DTO;

use Symfony\Component\HttpFoundation\Request;

interface CreateFromRequestInterface
{
    public static function createFromRequest(Request $request);
}
