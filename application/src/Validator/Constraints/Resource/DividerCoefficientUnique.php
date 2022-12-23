<?php

namespace App\Validator\Constraints\Resource;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class DividerCoefficientUnique extends Constraint
{
    public $message = 'Diese Nummer ist schon besetzt.';

    public function getTargets(): string
    {
        return self::CLASS_CONSTRAINT;
    }
}
