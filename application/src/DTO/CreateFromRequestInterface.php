<?php

namespace App\DTO;

use Symfony\Component\HttpFoundation\Request;

interface CreateFromRequestInterface
{
    public static function createFromRequest(Request $request);
}
