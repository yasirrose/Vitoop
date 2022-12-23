<?php

namespace App\DTO\Resource;

use App\Entity\User\User;

/**
 * Class RelResourceDTO
 * @package App\DTO\Resource
 */
class RelResourceDTO implements \JsonSerializable
{
    /**
     * @var int
     */
    public $id;

    /**
     * @var int
     */
    public $resourceId;

    /**
     * @var int
     */
    public $linkedResourceId;

    /**
     * @var float
     */
    public $coefficient;

    /**
     * @var int
     */
    public $userId;

    /**
     * RelResourceDTO constructor.
     * @param int $id
     * @param int $resourceId
     * @param int $linkedResourceId
     * @param float $coefficient
     * @param int $user
     */
    public function __construct($id, $resourceId, $linkedResourceId, $coefficient, $user)
    {
        $this->id = $id;
        $this->resourceId = $resourceId;
        $this->linkedResourceId = $linkedResourceId;
        $this->coefficient = $coefficient;
        $this->userId = $user;
    }

    public function jsonSerialize(): array
    {
        return [
            'id' => $this->id,
            'resourceId' => $this->resourceId,
            'linkedResourceId' => $this->linkedResourceId,
            'coefficient' => $this->coefficient,
            'userId' => $this->userId,
        ];
    }
}
