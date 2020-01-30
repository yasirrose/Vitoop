<?php

namespace Vitoop\InfomgmtBundle\DTO\User;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

/**
 * Class ProjectUserDTO
 * @package Vitoop\InfomgmtBundle\DTO\User
 */
class ProjectUserDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     */
    public $id;

    /**
     * @Assert\NotBlank()
     */
    public $username;
}
