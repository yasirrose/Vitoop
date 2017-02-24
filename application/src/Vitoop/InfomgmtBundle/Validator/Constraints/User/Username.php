<?php

namespace Vitoop\InfomgmtBundle\Validator\Constraints\User;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class Username extends Constraint
{
    public $messageUsername = 'Der Username %string% existiert schon. Bitte wähle einen anderen';
}
