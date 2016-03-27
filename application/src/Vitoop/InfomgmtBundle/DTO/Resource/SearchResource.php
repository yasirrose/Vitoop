<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

class SearchResource
{
    /**
     * @var boolean 
     */
    public $flagged = false;

    public $resource = null;

    /**
     * @var array 
     */
    public $tags = array();

    /**
     * @var array 
     */
    public $ignoredTags = array();

    /**
     * @var array 
     */
    public $highlightTags = array();

    /**
     * @var integer 
     */
    public $countTags = 0;

    public function __construct(
        $flagged = false,
        $resource = null,
        $tags = array(),
        $ignoredTags = array(),
        $highlightTags = array(),
        $countTags = array()
    ) {
        $this->flagged = $flagged;
        $this->resource = $resource;
        $this->tags = $tags;
        $this->ignoredTags = $ignoredTags;
        $this->highlightTags = $highlightTags;
        $this->countTags = $countTags;
    }
}
