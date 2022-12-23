<?php
namespace App\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class IntegerToBooleanTransformer implements DataTransformerInterface
{
    /**
     * Transforms integer (or null) to boolean
     *
     * @param integer $int
     * @return $boolean
     */
    public function transform($int): bool
    {
        if (false == $int) {

            return false;
        }

        return true;
    }

    /**
     * Transforms boolean to integer
     */
    public function reverseTransform($bool): int
    {
        if ($bool) {
            return 1;
        }

        return 0;
    }
}