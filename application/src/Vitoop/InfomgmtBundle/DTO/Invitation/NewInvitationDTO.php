<?php

namespace Vitoop\InfomgmtBundle\DTO\Invitation;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

/**
 * Class NewInvitationDTO
 * @package Vitoop\InfomgmtBundle\DTO\Invitation
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
