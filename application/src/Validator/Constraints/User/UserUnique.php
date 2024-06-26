<?php

namespace App\Validator\Constraints\User;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class UserUnique extends Constraint
{
    public $messageEmail = 'Die eMail %string% wird schon verwendet. Bist Du schon angemeldet?';
    public $messageUsername = 'Der Username %string% existiert schon. Bitte wähle einen anderen';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
