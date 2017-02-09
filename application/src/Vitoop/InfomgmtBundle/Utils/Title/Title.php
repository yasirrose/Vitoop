<?php

namespace Vitoop\InfomgmtBundle\Utils\Title;

abstract class Title
{
    protected $title;

    public function __construct($title)
    {
        $this->title = $title;
    }

    abstract public function getTitle();

    protected function teaseTitle($maxlen)
    {
        $text = $this->title;
        if (!mb_check_encoding($text, 'UTF-8')) {
            throw new \Exception('Data must always be provided using encoding UTF-8. Your provided Data is not compatible. Please check you Database for correct settings.');
        }

        $len = mb_strlen($text, 'UTF-8');
        if ($len > $maxlen) {
            $text = mb_substr($text, 0, $maxlen - 4, 'UTF-8') . '...';
        }

        return $text;
    }
}
