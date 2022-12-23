<?php

namespace App\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;
use App\Validator\Constraints\Resource\DividerCoefficientUnique;

/**
 * @DividerCoefficientUnique
 *
 * Class DividerDTO
 * @package App\DTO\Resource
 */
class DividerDTO implements \JsonSerializable, CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    public $id;

    public $text;

    /**
     * @Assert\NotBlank()
     * @Assert\GreaterThanOrEqual(0)
     */
    public $coefficient;

    public $projectDataId;

    /**
     * DividerDTO constructor.
     * @param $id
     * @param $text
     * @param $coefficient
     */
    public function __construct($id, $text, $coefficient)
    {
        $this->id = $id;
        $this->text = $text;
        $this->coefficient = $coefficient;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'coefficient' => $this->coefficient,
        ];
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        return new DividerDTO(
            array_key_exists('id', $requestData) ? $requestData['id'] : null,
            array_key_exists('text', $requestData) ? $requestData['text'] : null,
            array_key_exists('coefficient', $requestData) ? $requestData['coefficient'] : null
        );
    }
}
