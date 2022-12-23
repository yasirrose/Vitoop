<?php

namespace App\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;
use App\Utils\Date\DateTimeFormatter;

/**
 * Class RemarkDTO
 * @package App\DTO\Resource
 */
class RemarkDTO implements \JsonSerializable, CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @var int
     */
    public $id;

    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $text;

    /**
     * @var string
     */
    public $ip;

    /**
     * @var boolean
     */
    public $locked;

    /**
     * @var array
     */
    public $user;

    /**
     * @var \DateTime
     */
    public $createdAt;

    /**
     * RemarkDTO constructor.
     * @param int $id
     * @param string $text
     * @param string $ip
     * @param bool $locked
     * @param $userId
     * @param $username
     * @param \DateTime $createdAt
     */
    public function __construct($id, $text, $ip, $locked, $userId, $username, \DateTime $createdAt)
    {
        $this->id = $id;
        $this->text = $text;
        $this->ip = $ip;
        $this->locked = $locked;
        $this->user = [
            'id' => $userId,
            'username' => $username,
        ];
        $this->createdAt = $createdAt;
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        return new RemarkDTO(
            null,
            array_key_exists('text', $requestData) ? $requestData['text'] : null,
            $request->getClientIp(),
            array_key_exists('locked', $requestData) ? $requestData['locked'] : false,
            null,
            null,
            new \DateTime()
        );
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'ip' => $this->ip,
            'locked' => $this->locked,
            'user' => $this->user,
            'created_at' => DateTimeFormatter::format($this->createdAt),
        ];
    }
}