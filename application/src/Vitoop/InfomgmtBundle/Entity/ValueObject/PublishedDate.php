<?php

namespace Vitoop\InfomgmtBundle\Entity\ValueObject;

use Doctrine\ORM\Mapping as ORM;

/**
 * Class PublishedDate
 * @package Vitoop\InfomgmtBundle\Entity\ValueObject
 * @ORM\Embeddable()
 */
class PublishedDate
{
    /**
     * @ORM\Column(name="date", type="string", length=10)
     */
    private $date;

    /**
     * @ORM\Column(name="order", type="bigint", nullable=true)
     */
    private $order;

    /**
     * PublishedDate constructor.
     * @param $date
     */
    public function __construct(string $date)
    {
        $this->date = $date;
        $this->order = self::generateOrderValue($date);
    }

    /**
     * @param $date
     * @return static
     */
    public static function createFromString($date)
    {
        return new static(static::convertStringToFormatted($date));
    }

    /**
     * @return string
     */
    public function getDate() : string
    {
        return $this->date;
    }

    /**
     * @return mixed
     */
    public function getOrder()
    {
        return $this->order;
    }

    /**
     * @return string
     */
    public function __toString()
    {
        return $this->date;
    }

    /**
     * @param $date
     * @return string
     */
    public static function convertStringToFormatted($date) : string
    {
        return self::parseDateString($date);
    }

    public static function convertStringGreedy($date) : string
    {
        return self::parseDateString($date, ['1970', '01', '01']);
    }

    /**
     * @param $date
     * @return string
     */
    public static function generateOrderValue($date) : string
    {
        $offset = '';
        $dateParts = explode('.', $date);

        if ((int)$dateParts[2]<1000 || (int)$dateParts[2]>(self::getMaxYear()+1)) {
            $dateParts[2] = '0000';
        }

        if ('0000' === $dateParts[2]) {
            $dateParts[2] = self::getMaxYear();
            $dateParts[1] = '00';
            $offset = ' +1 second ';
        }

        if ('00' === $dateParts[1]) {
            $dateParts[0] = '31';
            $dateParts[1] = '12';
            $offset = ' +1 second ';
        }

        if ('00' === $dateParts[0]) {
            $monthDate = new \DateTime(implode('.', ['01', $dateParts[1], $dateParts[2]]));
            $dayInMonth = date('t', $monthDate->getTimestamp());
            $dateParts[0] = $dayInMonth;
            $offset = ' +1 second ';
        }

        return (new \DateTime(implode('.', $dateParts).$offset))->getTimestamp();
    }

    private static function getMaxYear()
    {
        return (4 === PHP_INT_SIZE)? '2037': '2999';
    }

    private static function parseDateString($date, $dateParts = ['0000','00','00'])
    {
        $maxValues = [2 => 31, 1 => 12];
        if (!empty($date)) {
            foreach (array_reverse(explode('.', $date)) as $index => $part) {
                if ($index > 2) {
                    break;
                }
                $padLength = (0 === $index)? 4:2;
                if (isset($maxValues[$index]) && $part > $maxValues[$index]) {
                    $part = 0;
                }
                $dateParts[$index] = str_pad((int)$part, $padLength, '0', STR_PAD_LEFT);
            }
        }

        return implode('.', array_reverse($dateParts));
    }
}
