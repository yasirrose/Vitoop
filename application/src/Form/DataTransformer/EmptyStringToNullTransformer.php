<?php
namespace App\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;

class EmptyStringToNullTransformer implements DataTransformerInterface
{
    /**
     * Transforms an empty string ('') to NULL (null).
     *
     * @param string $string
     * @return string null
     */
    public function transform($string): ?string
    {
        if ('' === $string) {

            return null;
        }

        return $string;
    }

    public function reverseTransform($string): string
    {
        /**
         * Transforms NULL (null) to an empty string ('').
         *
         * @param string|null $string
         * @return string
         */
        if (null === $string) {

            return '';
        }

        return $string;
    }
}