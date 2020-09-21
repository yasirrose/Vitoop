<?php

namespace App\Form\Adapter;

use App\Form\Type\ConversationType;
use App\Form\Type\ResourceType;
use App\Form\Type\AddressType;
use App\Form\Type\BookType;
use App\Form\Type\PdfType;
use App\Form\Type\TagType;
use App\Form\Type\LinkType;
use App\Form\Type\TeliType;
use App\Form\Type\LexiconType;
use App\Form\Type\ProjectType;

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
        'prj' => ProjectType::class,
        'conversation' => ConversationType::class,
    ];

    public static function getFormType($type)
    {
        return self::$formTypes[$type];
    }
}
