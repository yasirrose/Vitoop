<?php

namespace App\DTO\Invitation;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

/**
 * Class NewInvitationDTO
 * @package App\DTO\Invitation
 */
class NewInvitationDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    public $email;
}
