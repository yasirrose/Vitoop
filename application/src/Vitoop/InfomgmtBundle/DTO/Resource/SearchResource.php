<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Vitoop\InfomgmtBundle\DTO\Paging;

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

    /**
     * @var string 
     */
    public $searchString = null;

    /**
     * @var Paging 
     */
    public $paging;

    /**
     * @var SearchColumns 
     */
    public $columns;

    public function __construct(
        Paging $paging,
        SearchColumns $columns,
        $flagged = false,
        $resource = null,
        $tags = array(),
        $ignoredTags = array(),
        $highlightTags = array(),
        $countTags = array(),
        $search = null
    ) {
        $this->flagged = $flagged;
        $this->resource = $resource;
        $this->tags = $tags;
        $this->ignoredTags = $ignoredTags;
        $this->highlightTags = $highlightTags;
        $this->countTags = $countTags;
        if (isset($search['value'])) {
            $this->searchString = $search['value'];
        }
        $this->paging = $paging;
        $this->columns = $columns;
    }
}
