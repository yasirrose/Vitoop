<?php

namespace App\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;
use App\Utils\Date\DateTimeFormatter;

/**
 * Class CommentDTO
 * @package App\DTO\Resource
 */
class CommentDTO implements \JsonSerializable, CreateFromRequestInterface
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
     * @var array
     */
    public $user;

    /**
     * @var \DateTime
     */
    public $createdAt;

    /**
     * @var boolean
     */
    public $isVisible;

    /**
     * CommentDTO constructor.
     * @param int $id
     * @param string $text
     * @param $userId
     * @param $username
     * @param \DateTime $createdAt
     * @param bool $isVisible
     */
    public function __construct($id, $text, $userId, $username, \DateTime $createdAt, bool $isVisible)
    {
        $this->id = $id;
        $this->text = $text;
        $this->user = [
            'id' => $userId,
            'username' => $username
        ];
        $this->createdAt = $createdAt;
        $this->isVisible = $isVisible;
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        return self::createFromArray($requestData);
    }

    public static function createFromArray(array $dataArray)
    {
        return new CommentDTO(
            null,
            array_key_exists('text', $dataArray) ? $dataArray['text'] : null,
            null,
            null,
            array_key_exists('created_at', $dataArray) ? $dataArray['created_at'] : new \DateTime(),
            array_key_exists('is_visible', $dataArray) ? $dataArray['is_visible'] : true
        );
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'text' => $this->text,
            'user' => $this->user,
            'is_visible' => $this->isVisible,
            'created_at' => DateTimeFormatter::format($this->createdAt),
        ];
    }
}
