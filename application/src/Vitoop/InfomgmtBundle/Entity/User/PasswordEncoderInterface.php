<?php

namespace Vitoop\InfomgmtBundle\Entity\User;

interface PasswordEncoderInterface
{
    /**
     * @param string $password
     * @param string $salt
     */
    public function encode($password, $salt = null);

    /**
     * @param string $encodedPassword
     * @param string $password
     * @param string $salt
     * @return bool
     */
    public function isPasswordValid($encodedPassword, $password, $salt);
}
