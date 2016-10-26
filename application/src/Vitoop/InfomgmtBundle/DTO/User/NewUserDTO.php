<?php

namespace Vitoop\InfomgmtBundle\DTO\User;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Validator\Constraints\User\UserUnique;

/**
 * @UserUnique
 */
class NewUserDTO
{
    /**
     * @Assert\NotBlank()
     */
    public $username;

    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    public $email;

    /**
     * @Assert\NotBlank()
     */
    public $password;

    public function __construct($email = null, $username = null, $password = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}
