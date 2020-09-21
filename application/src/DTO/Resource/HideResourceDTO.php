<?php

namespace App\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

/**
 * Class HideResourceDTO
 * @package App\DTO\Resource
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
