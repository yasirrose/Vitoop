<?php

namespace App\Utils\Date;

class DateTimeFormatter
{
    public static function format(?\DateTime $date) 
    {
        return $date ? $date->format(\DateTime::RFC3339): null;
    }
}
