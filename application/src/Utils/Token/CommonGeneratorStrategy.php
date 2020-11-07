<?php

namespace App\Utils\Token;

class CommonGeneratorStrategy implements TokenGeneratorInterface
{
    public function generateToken()
    {
        return sha1(random_bytes(10) . uniqid(mt_srand(), true));
    }
}
