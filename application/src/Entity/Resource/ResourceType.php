<?php

namespace App\Entity\Resource;

use App\Entity\Resource;
use App\Entity\Pdf;
use App\Entity\Address;
use App\Entity\Link;
use App\Entity\Teli;
use App\Entity\Lexicon;
use App\Entity\Project;
use App\Entity\Book;
use App\Entity\Conversation;
use App\Entity\User\User;

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
        'book' => Book::class,
        'conversation' => Conversation::class,
        'userlist' => User::class
    ];

    const RESOURCE_INDEXES = [
        0 => 'res',
        1 => 'pdf',
        2 => 'adr',
        3 => 'link',
        4 => 'teli',
        5 => 'lex',
        6 => 'prj',
        7 => 'book',
        8 => 'conversation',
        9 => 'userlist'
    ];

    const RESOURCE_NAMES = [
        "0" => "Resource",
        "1" => "Pdf",
        "2" => "Adresse",
        "3" => "Link",
        "4" => "Textlink",
        "5" => "Lexikon",
        "6" => "Projekt",
        "7" => "Buch",
        "8" => "Conversation",
        "9" => "Userlist"
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