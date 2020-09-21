<?php

namespace App\Validator\Constraints\Resource;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class ResourceNameUnique extends Constraint
{
    public $message = 'Database Integrity Fail: Resourcenames must be unique. (Id#%id1%, Id#%id2% [...])';
}
