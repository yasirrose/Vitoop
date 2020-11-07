<?php

namespace App\Service\RelResource;

use App\Entity\Conversation;
use App\Entity\Lexicon;
use App\Entity\Project;
use App\Entity\Resource;
use App\Entity\RelResourceResource;
use App\Entity\User\User;
use App\Exception\Resource\RelResourceExistsException;
use App\Exception\Tag\TagRelationExistsException;
use App\Repository\LexiconRepository;
use App\Repository\ProjectRepository;
use App\Repository\RelResourceResourceRepository;
use App\Service\Tag\ResourceTagLinker;
use App\Service\VitoopSecurity;

/**
 * Class RelResourceLinker
 * @package App\Service\RelResource
 */
class RelResourceLinker
{
    const RESOURCE_MAX_ALLOWED_ADDING = 3;
    const RESOURCE_MAX_ALLOWED_REMOVING = 1;

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
     * @param User $user
     * @return int
     */
    public function getResourceForAddingCount(Resource $resource, User $user): int
    {
        $relResourceAdded = $this->relResourceRepository->getCountOfAddedResources($user->getId(), $resource->getId());
        $resourceCount = self::RESOURCE_MAX_ALLOWED_ADDING - $relResourceAdded;

        return $resourceCount > 0 ? $resourceCount : 0;
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
     * @param Resource $resource
     * @param User $user
     * @return int
     */
    public function getResourceForRemovingCount(Resource $resource, User $user): int
    {
        $relResourceDeleted = $this->relResourceRepository->getCountOfRemovedResources($user->getId(), $resource->getId());
        $resourceCount = self::RESOURCE_MAX_ALLOWED_REMOVING - $relResourceDeleted;

        return $resourceCount > 0 ? $resourceCount : 0;
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
        try {
            $this->tagLinker->addTagToResource($lexicon, $lexicon->getName());
        } catch (TagRelationExistsException $ex) {
            // It is ok, if lexicon has the tag.
        }

        return $relation;
    }

    /**
     * @param Project $project
     * @param Resource $resource
     * @return RelResourceResource
     * @throws \Exception
     */
    public function linkProjectToResource(Project $project, Resource $resource)
    {
        if ($project->getId() === $resource->getId()) {
            throw new \Exception('Eine Resource kann sich nicht selber zugewiesen werden.');
        }

        // Only the Project Owner is allowed to assign resources to the project
        if (!$project->getProjectData()->availableForWriting($this->vitoopSecurity->getUser())) {
            throw new \Exception(sprintf('Das darf nur der Eigentümer der Resource, nämlich %s. ', $project->getUser()));
        }
        $relation = new RelResourceResource($project, $resource, $this->vitoopSecurity->getUser());
        // Relation must be unique (due to the user)
        if ($this->relResourceRepository->exists($relation)) {
            throw new RelResourceExistsException('You have assigned this resource already with:' . $project->getName());
        }
        $this->relResourceRepository->add($relation);

        return $relation;
    }

    /**
     * @param Conversation $conversation
     * @param Resource $resource
     * @return RelResourceResource
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function linkConversationToResource(Conversation $conversation, Resource $resource): RelResourceResource
    {
        if ($conversation->getId() === $resource->getId()) {
            throw new \Exception('Eine Resource kann sich nicht selber zugewiesen werden.');
        }

        $user = $this->vitoopSecurity->getUser();
        /**
         * @var RelResourceResource $relResource
         */
        $relResource = $this->relResourceRepository->getRelResource(
            $conversation->getId(),
            $resource->getId(),
            $user->getId()
        );
        if ($relResource) {
            $relResource->increaseCountLinks();
        } else {
            $relResource = new RelResourceResource($conversation, $resource, $user);
            $this->relResourceRepository->add($relResource);
        }
        $this->relResourceRepository->save();

        return $relResource;
    }
}
