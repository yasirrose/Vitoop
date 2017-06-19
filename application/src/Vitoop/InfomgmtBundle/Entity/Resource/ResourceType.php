<?php

namespace Vitoop\InfomgmtBundle\Entity\Resource;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Address;
use Vitoop\InfomgmtBundle\Entity\Link;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\Book;

class ResourceType
{
    const RESOURCE_TYPES = [
        'res' => Resource::class,
        'pdf' => Pdf::class,
        'adr' => Address::class,
        'link' => Link::class,
        'teli' => Teli::class,
        'lex' => Lexicon::class,
        'prj' => Project::class,
        'book' => Book::class
    ];

    const RESOURCE_INDEXES = [
        0 => 'res',
        1 => 'pdf',
        2 => 'adr',
        3 => 'link',
        4 => 'teli',
        5 => 'lex',
        6 => 'prj',
        7 => 'book'
    ];

    const RESOURCE_NAMES = [
        "0" => "Resource",
        "1" => "Pdf",
        "2" => "Adresse",
        "3" => "Link",
        "4" => "Textlink",
        "5" => "Lexikon",
        "6" => "Projekt",
        "7" => "Buch"
    ];

    /**
     * @param $type
     * @return mixed|string
     */
    public static function getClassByResourceType($type)
    {
        return self::RESOURCE_TYPES[$type]??'';
    }

    /**
     * @param $index
     * @return mixed|string
     */
    public static function getTypeByIndex($index)
    {
        return self::RESOURCE_INDEXES[$index]??'';
    }

    /**
     * @param $index
     * @return mixed|string
     */
    public static function getResourceNameByIndex($index)
    {
        return self::RESOURCE_NAMES[$index]??'';
    }
}