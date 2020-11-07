<?php

namespace App\DTO\User;

use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

class UserNoteDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    public $notes;
}
