<?php
namespace App\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * Class DateFormat
 * @package App\Validator\Constraints
 * @Annotation
 */
class DateFormat extends Constraint
{
    public $message = "Das Datum kann nur in den folgenden Formaten eingegeben werden: TT.MM.JJJJ oder MM.JJJJ oder JJJJ oder 0";
} 