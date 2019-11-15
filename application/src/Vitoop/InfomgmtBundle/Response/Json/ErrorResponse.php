<?php

namespace Vitoop\InfomgmtBundle\Response\Json;

use Symfony\Component\Validator\ConstraintViolationListInterface;

/**
 * Class ErrorResponse
 * @package Vitoop\InfomgmtBundle\Response\Json
 */
class ErrorResponse implements \JsonSerializable
{
    /**
     * @var array
     */
    protected $messages = [];

    /**
     * ErrorResponse constructor.
     * @param array $messages
     */
    public function __construct(array $messages)
    {
        $this->messages = $messages;
    }

    /**
     * @param ConstraintViolationListInterface $errors
     * @return static
     */
    public static function createFromValidator(ConstraintViolationListInterface $errors)
    {
        $messages = [];
        foreach ($errors as $error) {
            $messages[] = $error->getPropertyPath() . ': '. $error->getMessage();
        }

        return new static($messages);
    }

    public function jsonSerialize()
    {
        return [
            'messages' => $this->messages,
            'success' => false,
        ];
    }
}