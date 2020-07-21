<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;
use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Utils\Date\DateTimeFormatter;

/**
 * Class FlagDTO
 * @package Vitoop\InfomgmtBundle\DTO\Resource
 */
class FlagDTO implements CreateFromRequestInterface, \JsonSerializable
{
    use CreateFromRequestTrait;

    /**
     * @var int
     */
    public $id;

    /**
     * @Assert\NotBlank()
     * @Assert\Choice(callback="getFlagTypes")
     * @var int
     */
    public $type;

    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $info;

    /**
     * @var \DateTime
     */
    public $createdAt;

    /**
     * @var array
     */
    public $user;

    /**
     * FlagDTO constructor.
     * @param int $id
     * @param int $type
     * @param string $info
     * @param \DateTime $createdAt
     * @param array $user
     */
    public function __construct($id, $type, $info, \DateTime $createdAt, $userId, $username)
    {
        $this->id = $id;
        $this->type = $type;
        $this->info = $info;
        $this->createdAt = $createdAt;
        $this->user = [
            'id' => $userId,
            'username' => $username,
        ];
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'info' => $this->info,
            'user' => $this->user,
            'created_at' => DateTimeFormatter::format($this->createdAt),
        ];
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        return new FlagDTO(
            null,
            array_key_exists('type', $requestData) ? $requestData['type'] : null,
            array_key_exists('info', $requestData) ? $requestData['info'] : null,
            new \DateTime(),
            null,
            null
        );
    }

    public static function getFlagTypes()
    {
        return [Flag::FLAG_DELETE, Flag::FLAG_BLAME];
    }
}
