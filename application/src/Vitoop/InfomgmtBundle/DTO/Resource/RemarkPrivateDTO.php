<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;
use Vitoop\InfomgmtBundle\Utils\Date\DateTimeFormatter;

class RemarkPrivateDTO implements \JsonSerializable, CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    public $id;

    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $text;

    /**
     * @var array
     */
    public $user;

    /**
     * @var \DateTime
     */
    public $createdAt;

    /**
     * RemarkPrivateDTO constructor.
     * @param $id
     * @param $text
     * @param $userId
     * @param $username
     * @param $createdAt
     */
    public function __construct($id, $text, $userId, $username, $createdAt)
    {
        $this->id = $id;
        $this->text = $text;
        $this->user = [
            'id' => $userId,
            'username' => $username,
        ];
        $this->createdAt = $createdAt;
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        return new RemarkPrivateDTO(
            null,
            array_key_exists('text', $requestData) ? $requestData['text'] : null,
            null,
            null,
            new \DateTime()
        );
    }

    public function jsonSerialize()
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'user' => $this->user,
            'created_at' => DateTimeFormatter::format($this->createdAt),
        ];
    }
}