<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

/**
 * Class ProjectAssignment
 * @package Vitoop\InfomgmtBundle\DTO\Resource
 */
class ProjectAssignment implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     * @Assert\Count(min=1)
     */
    public $resourceIds = [];
}
