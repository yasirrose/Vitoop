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

class ResourceFactory
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

    public static function create($type)
    {
        $class = self::getClassByType($type);
        if (empty($class)) {
            throw new \DomainException('Incorrect resource type');
        }
        return new $class;
    }

    public static function getClassByType($type)
    {
        return self::RESOURCE_TYPES[$type]??'';
    }

    public static function getTypeByIndex($index)
    {
        return self::RESOURCE_INDEXES[$index]??'';
    }
}
