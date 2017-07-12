<?php

namespace Vitoop\InfomgmtBundle\Tests\Entity\ValueObject;

use PHPUnit\Framework\TestCase;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;

class PublishedDateTest extends TestCase
{
    /**
     * @dataProvider convertFormatedDataProvider
     */
    public function testConvertFormatedDate($string, $expected)
    {
        $this->assertEquals($expected, PublishedDate::convertStringToFormatted($string));
    }

    public function convertFormatedDataProvider()
    {
        return [
            ['' , '00.00.0000'],
            [2000, '00.00.2000'],
            ['12.1990', '00.12.1990'],
            [0, '00.00.0000'],
            ['31.12.1900', '31.12.1900'],
            ['wwww', '00.00.0000'],
            ['.', '00.00.0000'],
            ['.1.', '00.01.0000'],
            ['...', '00.00.0000'],
            ['00.00.0000', '00.00.0000'],
            ['10.01.0000', '10.01.0000'],
            ['01.26.0002', '01.00.0002']
        ];
    }

    /**
     * @dataProvider generateOrderValueDataProvider
     */
    public function testGenerateOrderValue($date, $dateFrom, $dateTo)
    {
        $order = PublishedDate::generateOrderValue($date);
        $dateFromOrder = PublishedDate::generateOrderValue($dateFrom);
        $dateToOrder = PublishedDate::generateOrderValue($dateTo);

        $this->assertGreaterThan($dateFromOrder, $order);
        $this->assertLessThan($dateToOrder, $order);
    }

    public function generateOrderValueDataProvider()
    {
        $lastYear = (4 === PHP_INT_SIZE)?'2037':'2999';

        return [
            ['02.01.2001', '01.01.2001', '03.01.2001'],
            ['00.01.2001', '31.01.2001', '01.02.2001'],
            ['00.12.2001', '31.12.2001', '01.01.2002'],
            ['00.00.2001', '31.12.2001', '01.01.2002'],
            ['00.00.0000', '31.12.'.$lastYear, '01.01.'.($lastYear+1)],
            ['01.00.0000', '31.12.'.$lastYear, '01.01.'.($lastYear+1)],
            ['01.12.0000', '31.12.'.$lastYear, '01.01.'.($lastYear+1)],
            ['01.12.0000', '31.12.'.$lastYear, '01.01.'.($lastYear+1)],
            ['00.12.0000', '31.12.'.$lastYear, '01.01.'.($lastYear+1)],
            ['00.12.0000', '31.12.'.$lastYear, '01.01.'.($lastYear+1)],
            ['01.00.0002', '31.12.'.$lastYear, '01.01.'.($lastYear+1)]
        ];
    }

    /**
     * @dataProvider convertStringGreedyDataProvider
     */
    public function testGreedyConvertion($string, $expected)
    {
        $this->assertEquals($expected, PublishedDate::convertStringGreedy($string));
    }

    public function convertStringGreedyDataProvider()
    {
        return [
            [0, '01.01.1970'],
            [2000, '01.01.2000'],
            ['2000', '01.01.2000'],
            ['01.2000', '01.01.2000'],
            ['09.2000', '01.09.2000']
        ];
    }
}