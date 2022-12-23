<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class DateFormatValidator extends ConstraintValidator
{
    public function validate($value, Constraint $constraint): void
    {
        if (((is_null($value))||($value == '')||((!date_create_from_format('d.m.Y', $value))&&(!date_create_from_format('m.Y', $value))&&(!date_create_from_format('Y', $value)))) && ($value != '0')) {
            $this->context->addViolation(
                $constraint->message
            );
        }
    }
}
