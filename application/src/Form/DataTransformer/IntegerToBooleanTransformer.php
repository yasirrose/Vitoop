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
    public function transform($int)
    {
        if (false == $int) {

            return false;
        }

        return true;
    }

    public function reverseTransform($bool)
    {
        /**
         * Transforms boolean to integer
         *
         * @param booklean $bool
         * @return integer
         */
        if ($bool) {

            return 1;
        }

        return 0;
    }
}