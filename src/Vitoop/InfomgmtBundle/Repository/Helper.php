<?php
namespace Vitoop\InfomgmtBundle\Repository;

/**
 * Helper - contains static Helper functions
 */
class Helper
{
    /**
     * Flattens an array: array( $key => 'value1', '$key => 'value2', ...) to array('value1', 'value2', ...)
     * @param $arr The array to flatten
     * @param $key The key to extract
     * @return array
     */
    public static function flatten_array($arr, $key)
    {
        return array_map(function ($_arr) use ($key) {
            return $_arr[$key];
        }, $arr);
    }

    /**
     * UNTESTED! Should extract obj->get$key in array of arrays at pos 0 return simple array
     * @param $arr
     * @param $key
     * @return array
     */
    public static function flatten_array_obj_at_0($arr, $key)
    {
        $getKey = 'get' . ucfirst($key);

        return array_map(function ($_arr) use ($getKey) {
            return $_arr->{$getKey}();
        }, $arr);
    }
}