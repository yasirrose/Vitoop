<?php

namespace Vitoop\InfomgmtBundle\Service;

use Vitoop\InfomgmtBundle\DTO\Resource\RatingDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDetailsDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceTagsDTO;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Repository\FlagRepository;
use Vitoop\InfomgmtBundle\Repository\RatingRepository;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;
use Vitoop\InfomgmtBundle\Repository\TagRepository;
use Vitoop\InfomgmtBundle\Service\Tag\ResourceTagLinker;

class ResourceDetailExtractor
{
    /**
     * @var ResourceTagLinker
     */
    private $tagLinker;

    /**
     * @var RatingRepository $ratingRepository
     */
    private $ratingRepository;

    /**
     * @var TagRepository
     */
    private $tagRepository;
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;
    /**
     * @var FlagRepository
     */
    private $flagRepository;

    /**
     * ResourceDetailExtractor constructor.
     * @param ResourceTagLinker $tagLinker
     * @param RatingRepository $ratingRepository
     * @param TagRepository $tagRepository
     * @param ResourceRepository $resourceRepository
     * @param FlagRepository $flagRepository
     */
    public function __construct(
        ResourceTagLinker $tagLinker,
        RatingRepository $ratingRepository,
        TagRepository $tagRepository,
        ResourceRepository $resourceRepository,
        FlagRepository $flagRepository
    ) {
        $this->tagLinker = $tagLinker;
        $this->ratingRepository = $ratingRepository;
        $this->tagRepository = $tagRepository;
        $this->resourceRepository = $resourceRepository;
        $this->flagRepository = $flagRepository;
    }

    public function getResourceDetailDTO(Resource $resource, User $user)
    {
        $flags = null;
        if ($user->isAdmin()) {
            $flags = $this->flagRepository->getFlagDTO($resource);
        }

        return new ResourceDetailsDTO(
            $resource,
            $user,
            $this->resourceRepository->getResourceTabsInfo($resource, $user),
            $this->getRatingDTO($resource, $user),
            $this->getResourceTagsDTO($resource, $user),
            $flags
        );
    }

    /**
     * @param Resource $resource
     * @param User $user
     * @return ResourceTagsDTO
     */
    public function getResourceTagsDTO(Resource $resource, User $user)
    {
        $tags = $this->tagRepository->countAllTagsFromResource($resource);
        $tagIds = $this->tagRepository->getTagIdListByUserFromResource($resource, $user);
        $resourceTagDTO = new ResourceTagsDTO(
            $tags,
            $this->tagLinker->getTagRestForAddingCount($resource, $user),
            $this->tagLinker->getTagRestForRemovingCount($resource, $user)
        );
        $resourceTagDTO->setOwnership($tagIds);

        return $resourceTagDTO;
    }

    /**
     * @param Resource $resource
     * @param User $user
     * @return RatingDTO
     */
    public function getRatingDTO(Resource $resource, User $user)
    {
        return new RatingDTO(
            $this->ratingRepository->getMarkFromResourceByUser($resource, $user),
            $this->ratingRepository->getAverageMarkFromResource($resource)
        );
    }
}
