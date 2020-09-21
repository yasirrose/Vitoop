<?php

namespace App\Validator\Constraints\Resource;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class DividerCoefficientUnique extends Constraint
{
    public $message = 'Die Nummer ist schon belegt.';

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}
