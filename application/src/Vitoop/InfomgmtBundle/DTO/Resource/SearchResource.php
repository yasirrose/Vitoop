<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Vitoop\InfomgmtBundle\DTO\Paging;
use Vitoop\InfomgmtBundle\Entity\User;

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

    /**
     *
     * @var User
     */
    public $user;

    public $isUserHook;

    public $resourceId;

    public function __construct(
        Paging $paging,
        SearchColumns $columns,
        User $user,
        $flagged = false,
        $resource = null,
        $tags = array(),
        $ignoredTags = array(),
        $highlightTags = array(),
        $countTags = array(),
        $search = null,
        $isUserHook = null,
        $resourceId = null
    ) {
        $this->user = $user;
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
        $this->isUserHook = (int)$isUserHook;
        $this->resourceId = $resourceId;
    }
}
