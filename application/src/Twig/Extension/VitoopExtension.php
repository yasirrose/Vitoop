<?php

namespace App\Twig\Extension;

use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;
use Twig\TwigFilter;
use Twig\TwigFunction;

class VitoopExtension extends AbstractExtension
{
    public function getName()
    {
        return 'vitoop';
    }

    public function getFilters()
    {
        return array(
            new TwigFilter('teaseTitle', array($this, 'teaseTitle')),
            new TwigFilter('teaseUrl', array($this, 'teaseUrl')),
            new TwigFilter('teaseAuthor', array($this, 'teaseAuthor')),
            new TwigFilter('avgmarkhint', array($this, 'avgmarkhint'))
        );
    }

    public function getFunctions()
    {
        return array(
            new TwigFunction('avgimg', array($this, 'avgimg'))
        );
    }

    public function avgimg($avg_mark)
    {
        if (null === $avg_mark) {
            return 'rating_not.png';
        }
        $avg_mark = round($avg_mark, 2, PHP_ROUND_HALF_EVEN);
        $avg_img = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+03d', (intval(($avg_mark * 10)) + (intval(($avg_mark * 10)) % 2)))) . '.png';

        return $avg_img;
    }

    public function avgmarkhint($avg_mark)
    {
        if (null === $avg_mark) {
            return 'Keine Bewertung vorhanden';
        }

        return sprintf('%1.2f', round($avg_mark, 2, PHP_ROUND_HALF_EVEN));
    }

    public function teaseTitle($title)
    {
        return $this->teaseText($title, 40);
    }

    public function teaseUrl($url)
    {
        return $this->teaseText($url, 20);
    }

    public function teaseAuthor($author)
    {
        return $this->teaseText($author, 25);
    }

    private function teaseText($text, $maxlen)
    {
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