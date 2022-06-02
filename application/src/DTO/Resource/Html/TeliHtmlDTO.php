<?php

namespace App\DTO\Resource\Html;

use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

class TeliHtmlDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    public $html;
}