<?php

namespace Vitoop\InfomgmtBundle\DTO\User;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

class ForgotPasswordDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @var string
     * @Assert\Email()
     * @Assert\NotBlank()
     */
    public $email;
}
