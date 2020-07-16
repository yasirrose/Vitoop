<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

/**
 * Class HideResourceDTO
 * @package Vitoop\InfomgmtBundle\DTO\Resource
 */
class HideResourceDTO implements CreateFromRequestInterface, \JsonSerializable
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     * @Assert\Type("boolean")
     */
    public $isSkip = false;

    public function jsonSerialize()
    {
        return [
            "isSkip" => $this->isSkip
        ];
    }
}
