<?php

namespace App\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

/**
 * Class LexiconAssignment
 * @package App\DTO\Resource
 */
class LexiconAssignment implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     */
    public $name;
}
