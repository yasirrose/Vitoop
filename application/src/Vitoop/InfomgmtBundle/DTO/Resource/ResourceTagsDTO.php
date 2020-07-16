<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

class ResourceTagsDTO
{
    /**
     * @var array
     */
    public $tags;

    /**
     * @var int
     */
    public $tagsRestAddedCount;

    /**
     * @var int
     */
    public $tagsRestRemovedCount;

    /**
     * ResourceTagsDTO constructor.
     * @param array $tags
     * @param int $tagsRestAddedCount
     * @param int $tagsRestRemovedCount
     */
    public function __construct(array $tags, $tagsRestAddedCount, $tagsRestRemovedCount)
    {
        $this->tags = $tags;
        $this->tagsRestAddedCount = !empty($tagsRestAddedCount)?$tagsRestAddedCount:'';
        $this->tagsRestRemovedCount = !empty($tagsRestRemovedCount)?$tagsRestRemovedCount:'';
    }

    public function setOwnership(array $idsByUser)
    {
        // Mark every "own" Tag setting the "is_own"-key to '1'
        array_walk($this->tags, function (&$tag, $keyTags, $idsByUser) {
            if (in_array($tag['id'], $idsByUser)) {
                $tag['is_own'] = '1';
            }
        }, $idsByUser);
    }
}
