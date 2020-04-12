<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
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
    public $isUserRead;

    public $resourceId;

    public $dateFrom;
    public $dateTo;

    public $art;

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
        $isUserRead = null,
        $resourceId = null,
        $dateFrom = null,
        $dateTo = null,
        $art = null
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
        $this->isUserRead = (int)$isUserRead;
        $this->resourceId = $resourceId;
        $this->dateFrom = $dateFrom;
        $this->dateTo = $dateTo;
        $this->art = $art;
    }

    /**
     * @param Request $request
     * @param User|null $user
     * @param int|null $projectId
     * @return SearchResource
     */
    public static function createFromRequest(Request $request, ?User $user = null, $projectId = null): SearchResource
    {
        return new SearchResource(
            new Paging(
                $request->query->get('start', 0),
                $request->query->get('length', 10)
            ),
            new SearchColumns(
                $request->query->get('columns', array()),
                $request->query->get('order', array())
            ),
            $user,
            $request->query->has('flagged'),
            $projectId,
            $request->query->get('taglist', array()),
            $request->query->get('taglist_i', array()),
            $request->query->get('taglist_h', array()),
            $request->query->get('tagcnt', 0),
            $request->query->get('search', null),
            $request->query->get('isUserHook', null),
            $request->query->get('isUserRead', null),
            $request->query->get('resourceId', null),
            $request->query->get('dateFrom', null),
            $request->query->get('dateTo', null),
            $request->query->get('art', null)
        );
    }
}
