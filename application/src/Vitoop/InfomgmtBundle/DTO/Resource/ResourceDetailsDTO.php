<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * Class ResourceDetailsDTO
 * @package Vitoop\InfomgmtBundle\DTO\Resource
 */
class ResourceDetailsDTO implements \JsonSerializable
{
    /**
     * @var string
     */
    public $resourceType;

    /**
     * @var ResourceDTO
     */
    public $resource;

    /**
     * @var array
     */
    public $tabs;

    /**
     * @var RatingDTO
     */
    public $rating;

    /**
     * @var ResourceTagsDTO
     */
    public $tags;

    /**
     * @var FlagDTO|null
     */
    public $flags;

    /**
     * ResourceDetailsDTO constructor.
     * @param Resource $resource
     * @param User $user
     * @param array $tabs
     * @param RatingDTO $rating
     * @param ResourceTagsDTO $tags
     * @param FlagDTO|null $flagDTO
     */
    public function __construct(
        Resource $resource,
        User $user,
        array $tabs,
        RatingDTO $rating,
        ResourceTagsDTO $tags,
        ?FlagDTO $flagDTO
    ) {
        $this->resourceType = $resource->getResourceType();
        $this->resource = $resource->toResourceDTO($user);
        $this->tabs = $tabs;
        $this->rating = $rating;
        $this->tags = $tags;
        $this->flags = $flagDTO;
    }

    public function jsonSerialize()
    {
        $detailsArray = [
            'resource_type' => $this->resourceType,
            'resource' => $this->resource,
            'tabs' => $this->tabs,
            'rating' => $this->rating,
            'tags' => $this->tags
        ];

        if ($this->flags) {
            $detailsArray['flags'] = $this->flags;
        }

        return $detailsArray;
    }
}