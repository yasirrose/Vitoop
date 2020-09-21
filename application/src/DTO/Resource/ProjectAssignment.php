<?php

namespace App\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

/**
 * Class ProjectAssignment
 * @package App\DTO\Resource
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
