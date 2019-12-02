<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

/**
 * Class LexiconAssignment
 * @package Vitoop\InfomgmtBundle\DTO\Resource
 */
class LexiconAssignment implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     */
    public $name;
}
