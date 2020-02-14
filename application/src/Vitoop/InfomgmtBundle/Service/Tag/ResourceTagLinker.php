<?php

namespace Vitoop\InfomgmtBundle\Service\Tag;

use Vitoop\InfomgmtBundle\Entity\RelResourceTag;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Exception\Tag\TagRelationExistsException;
use Vitoop\InfomgmtBundle\Repository\RelResourceTagRepository;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

class ResourceTagLinker
{
    const TAG_MAX_ALLOWED_ADDING = 5;
    const TAG_MAX_ALLOWED_REMOVING = 2;

    /**
     * @var RelResourceTagRepository
     */
    private $relResourceRepository;

    /**
     * @var TagCreator
     */
    private $tagCreator;

    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;

    /**
     * ResourceTagLinker constructor.
     * @param RelResourceResourceRepository $relResourceRepository
     * @param TagCreator $tagCreator
     * @param VitoopSecurity $vitoopSecurity
     */
    public function __construct(
        RelResourceTagRepository $relResourceRepository,
        TagCreator $tagCreator,
        VitoopSecurity $vitoopSecurity
    ) {
        $this->relResourceRepository = $relResourceRepository;
        $this->vitoopSecurity = $vitoopSecurity;
        $this->tagCreator = $tagCreator;
    }

    /**
     * @param Resource $resource
     * @param $tagName
     * @return mixed
     * @throws \Exception
     */
    public function linkTagToResource(Resource $resource, $tagName)
    {
        if (!$this->isTagsAddingAvailable($resource)) {
            throw new \Exception('Sie können nur fünf Schlagwörter zuweisen');
        }

        return $this->addTagToResource($resource, $tagName);
    }

    /**
     * @param Resource $resource
     * @param $tagName
     * @return mixed
     * @throws \Exception
     */
    public function addTagToResource(Resource $resource, $tagName)
    {
        $tag = $this->tagCreator->createTag($tagName);
        $relation = new RelResourceTag($resource, $tag, $this->vitoopSecurity->getUser());

        $linkedRelation = $this->relResourceRepository->exists($relation);
        if (!$linkedRelation) {
            $this->relResourceRepository->add($relation);
        }
        if ($linkedRelation && $linkedRelation->getDeletedByUser()) {
            throw new \Exception('You had already added this tag, but it was removed by another user.');
        }
        if ($linkedRelation) {
            throw new TagRelationExistsException('Du hast den Datensatz schon mit '.$tagName.' getagt.');
        }

        return $tagName;
    }

    /**
     * @param Resource $resource
     * @param $tagName
     * @throws \Exception
     */
    public function unlinkTagFromResource(Resource $resource, $tagName)
    {
        if (!$this->isTagsRemovingAvailable($resource)) {
            throw new \Exception('Es können pro Datensatz nur zwei Tags gelöscht werden.');
        }

        $tag = $this->tagCreator->getTagByTagName($tagName);
        if (!$tag) {
            throw new \Exception('There is not such tag');
        }
        $rel = $this->relResourceRepository->getOneFirstRel($tag, $resource);
        if (!$rel) {
            throw new \Exception('There is not such tag on this resource');
        }
        $rel->unlinkTag($this->vitoopSecurity->getUser());
    }

    /**
     * @param Resource $resource
     * @return bool
     */
    public function isTagsAddingAvailable(Resource $resource)
    {
        $user = $this->vitoopSecurity->getUser();

        return ($this->relResourceRepository->getCountOfAddedTags($user->getId(), $resource->getId()) < self::TAG_MAX_ALLOWED_ADDING);
    }

    /**
     * @param Resource $resource
     * @return bool
     */
    public function isTagsRemovingAvailable(Resource $resource)
    {
        $user = $this->vitoopSecurity->getUser();

        return ($this->relResourceRepository->getCountOfRemovedTags($user->getId(), $resource->getId()) < self::TAG_MAX_ALLOWED_REMOVING);
    }
}