<?php
namespace Vitoop\InfomgmtBundle\Form\DataTransformer;

use Symfony\Component\Form\DataTransformerInterface;
use Symfony\Component\Form\Exception\TransformationFailedException;

class PublishedToDateStringTransformer implements DataTransformerInterface
{
    /**
     * Transforms DateString (e.g. 2011-02) to Published (e.g. 02-2011)
     *
     * @param string $date_string
     * @return string $string
     */
    public function transform($date_string)
    {
        if ('' === $date_string || null === $date_string) {

            return '';
        }

        $published = date_create_from_format('Y-m-d', $date_string);
        if ($published) {
            return $published->format('j.n.Y');
        }

        $published = date_create_from_format('Y-m', $date_string);
        if ($published) {
            return $published->format('m-Y');
        }

        $published = date_create_from_format('Y', $date_string);
        if ($published) {
            return $published->format('Y');
        }

        throw new TransformationFailedException(sprintf('DateString %s isn\t valid.', $date_string));
    }

    public function reverseTransform($published)
    {
        /**
         * Transforms Published (e.g. 02-2011, 15.3.1998) to DateString (e.g. 2011-02, 1998-03-15)
         *
         * @param string $date_string
         * @return string $date_string
         */
        if ('' === $published || null === $published) {

            return null;
        }

        $date_string = date_create_from_format('j.n.Y', $published);
        if ($date_string) {
            return $date_string->format('Y-m-d');
        }

        $date_string = date_create_from_format('m-Y', $published);
        if ($date_string) {
            return $date_string->format('Y-m');
        }

        $date_string = date_create_from_format('Y', $published);
        if ($date_string) {
            return $date_string->format('Y');
        }

        throw new TransformationFailedException(sprintf('Published %s isn\t valid.', $date_string));
    }
}