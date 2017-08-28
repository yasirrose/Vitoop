<?php

namespace Vitoop\InfomgmtBundle\Service\RelResource;

use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Repository\LexiconRepository;
use Vitoop\InfomgmtBundle\Repository\RelResourceResourceRepository;
use Vitoop\InfomgmtBundle\Service\Tag\ResourceTagLinker;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

class RelResourceLinker
{
    const RESOURCE_MAX_ALLOWED_ADDING = 5;
    const RESOURCE_MAX_ALLOWED_REMOVING = 2;

    /**
     * @var RelResourceResourceRepository
     */
    private $relResourceRepository;

    /**
     * @var LexiconRepository
     */
    private $lexiconRepository;

    /**
     * @var ResourceTagLinker
     */
    private $tagLinker;

    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;


    /**
     * RelResourceLinker constructor.
     * @param RelResourceResourceRepository $relResourceRepository
     * @param LexiconRepository $lexiconRepository
     * @param ResourceTagLinker $tagLinker
     * @param VitoopSecurity $vitoopSecurity
     */
    public function __construct(
        RelResourceResourceRepository $relResourceRepository,
        LexiconRepository $lexiconRepository,
        ResourceTagLinker $tagLinker,
        VitoopSecurity $vitoopSecurity
    ) {
        $this->relResourceRepository = $relResourceRepository;
        $this->lexiconRepository = $lexiconRepository;
        $this->tagLinker = $tagLinker;
        $this->vitoopSecurity = $vitoopSecurity;
    }

    /**
     * @param Resource $resource
     * @return bool
     */
    public function isResourcesAddingAvailable(Resource $resource)
    {
        $user = $this->vitoopSecurity->getUser();

        return ($this->relResourceRepository->getCountOfAddedResources($user->getId(), $resource->getId()) < self::RESOURCE_MAX_ALLOWED_ADDING);
    }

    /**
     * @param Resource $resource
     * @return bool
     */
    public function isResourcesRemovingAvailable(Resource $resource)
    {
        $user = $this->vitoopSecurity->getUser();

        return ($this->relResourceRepository->getCountOfRemovedResources($user->getId(), $resource->getId()) < self::RESOURCE_MAX_ALLOWED_REMOVING);
    }

    /**
     * @param Lexicon $lexicon
     * @param Resource $resource
     * @return RelResourceResource
     * @throws \Exception
     */
    public function linkLexiconToResource(Lexicon $lexicon, Resource $resource)
    {
        // The resource1 must already exist in the DB, it CANNOT be created on the fly
        $resource1 = $this->lexiconRepository->getResourceWithUsernameByName($lexicon->getName());
        if (!$resource1) {
            throw new \Exception('Die zugewiesene Resource (z.B. ein Projekt oder Lexikonartikel) existiert nicht.');
        }
        if ($resource1->getId() === $resource->getId()) {
            throw new \Exception('Eine Resource kann sich nicht selber zugewiesen werden.');
        }

        $relation = new RelResourceResource($resource1, $resource, $this->vitoopSecurity->getUser());
        // Relation must be unique (due to the user)
        if ($this->relResourceRepository->exists($relation)) {
            throw new \Exception('You have assigned this resource already with:' . $resource1->getName());
        }
        $this->relResourceRepository->add($relation);

        //Ignore max tags check
        $this->tagLinker->addTagToResource($resource, $lexicon->getName());
        //add tag to lexicon if not exists
        $this->tagLinker->addTagToResource($lexicon, $lexicon->getName());

        return $relation;
    }
}