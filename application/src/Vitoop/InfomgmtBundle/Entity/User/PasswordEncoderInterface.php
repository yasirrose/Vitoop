<?php

namespace Vitoop\InfomgmtBundle\Entity\User;

interface PasswordEncoderInterface
{
    /**
     * @param string $password
     * @param string $salt
     */
    public function encode($password, $salt = null);
}

