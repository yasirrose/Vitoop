<?php

namespace App\DTO\User;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

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
