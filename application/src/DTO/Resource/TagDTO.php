<?php

namespace App\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

class TagDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     */
    public $name;
}