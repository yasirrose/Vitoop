<?php

namespace Vitoop\InfomgmtBundle\Form\Adapter;

use Vitoop\InfomgmtBundle\Form\Type\ResourceType;
use Vitoop\InfomgmtBundle\Form\Type\AddressType;
use Vitoop\InfomgmtBundle\Form\Type\BookType;
use Vitoop\InfomgmtBundle\Form\Type\PdfType;
use Vitoop\InfomgmtBundle\Form\Type\TagType;
use Vitoop\InfomgmtBundle\Form\Type\LinkType;
use Vitoop\InfomgmtBundle\Form\Type\TeliType;
use Vitoop\InfomgmtBundle\Form\Type\LexiconType;
use Vitoop\InfomgmtBundle\Form\Type\ProjectType;

class ResourceFormAdapter
{
    private static $formTypes = [
        'res' => ResourceType::class,
        'adr' => AddressType::class,
        'pdf' => PdfType::class,
        'tag' => TagType::class,
        'link' => LinkType::class,
        'book' => BookType::class,
        'teli' => TeliType::class,
        'lex' => LexiconType::class,
        'prj' => ProjectType::class
    ];

    public static function getFormType($type)
    {
        return self::$formTypes[$type];
    }
}
