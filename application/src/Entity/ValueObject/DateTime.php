<?php

namespace App\Entity\ValueObject;

/**
 * Class DateTime
 * @package App\Entity\ValueObject
 */
class DateTime implements \JsonSerializable
{
    /**
     * @var \DateTime
     */
    private $date;

    /**
     * DateTime constructor.
     * @param \DateTime $date
     */
    public function __construct(\DateTime $date)
    {
        $this->date = $date;
    }

    /**
     * @return \DateTime
     */
    public function getDate(): \DateTime
    {
        return $this->date;
    }

    public function jsonSerialize(): string
    {
        return $this->date->format(\DateTime::ISO8601);
    }
}