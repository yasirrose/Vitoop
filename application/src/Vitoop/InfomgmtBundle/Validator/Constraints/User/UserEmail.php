<?php

namespace Vitoop\InfomgmtBundle\Validator\Constraints\User;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class UserEmail extends Constraint
{
    public $messageEmail = 'Die eMail %string% wird schon verwendet. Bist Du schon angemeldet?';
}
