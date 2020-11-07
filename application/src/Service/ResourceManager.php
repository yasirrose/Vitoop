<?php
namespace App\Service;

use App\Entity\WikiRedirect;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use App\Entity\Conversation;
use App\Entity\Flag;
use App\Entity\ProjectData;
use App\Entity\Tag;
use App\Entity\Project;
use App\Entity\Lexicon;
use App\Entity\Resource;
use App\Entity\Rating;
use App\Entity\Comment;
use App\Entity\RelResourceResource;
use App\Entity\Watchlist;
use App\Entity\User\User;
use App\Entity\Resource\ResourceType;
use App\DTO\Resource\SearchResource;
use App\DTO\Resource\ResourceDTO;
use App\Service\RelResource\RelResourceLinker;
use App\Service\Tag\ResourceTagLinker;

class ResourceManager
{
    const RESOURCE_MAX_ALLOWED_REMOVING = 2;

    protected $arr_resource_type_to_entityname = array(
        'res' => 'Resource',
        'pdf' => 'Pdf',
        'adr' => 'Address',
        'link' => 'Link',
        'teli' => 'Teli',
        'lex' => 'Lexicon',
        'prj' => 'Project',
        'book' => 'Book',
        'conversation' => "Conversation"
    );

    protected $arr_resource_type_idx_to_entityname = array(
        0 => "Resource",
        1 => "Pdf",
        2 => "Address",
        3 => "Link",
        4 => "Teli",
        5 => "Lexicon",
        6 => "Project",
        7 => "Book",
        8 => "Conversation"
    );

    protected $arr_resource_type_idx_to_resource_type = array(
        0 => "res",
        1 => "pdf",
        2 => "adr",
        3 => "link",
        4 => "teli",
        5 => "lex",
        6 => "prj",
        7 => "book",
        8 => "conversation"
    );

    /*
    protected $assignment_map = array(5 => array(1, 2, 3, 4, 5), 6 => array(1, 2, 3, 4, 6));
    */
    protected $em;

    protected $vsec;

    protected $resourceTagLinker;

    protected $relResourceLinker;
    /**
     * @var LoggerInterface
     */
    private $logger;

    public function __construct(
        EntityManagerInterface $em,
        VitoopSecurity $vsec,
        ResourceTagLinker $tagLinker,
        RelResourceLinker $relResourceLinker,
        LoggerInterface $logger
    ) {
        $this->em = $em;
        $this->vsec = $vsec;
        $this->resourceTagLinker = $tagLinker;
        $this->relResourceLinker = $relResourceLinker;
        $this->logger = $logger;
    }

    protected function getUser()
    {
        return $this->vsec->getUser();
    }

    /**
     * @param $res_type
     * @param $res_id
     * @return Resource the requested Resource or null
     */
    public function getResource($res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        return $this->getRepository($res_type)->find($res_id);
    }

    public function getUsernameByUserId($id)
    {
        return $this->em->getRepository(User::class)->find($id)->getUsername();
    }

    public function getEntityManager()
    {
        return $this->em;
    }

    public function getResourceName($resource_type)
    {
        // Here should be returned a localized String
        return $this->arr_resource_type_to_entityname[$resource_type];
    }

    public function getResourceFormTypeClassname($resource_type)
    {

        return 'App\\Form\\Type\\' . $this->arr_resource_type_to_entityname[$resource_type] . "Type";
    }

    public function getRepository($resource_type)
    {
        try {
            $repo = $this->em->getRepository(ResourceType::getClassByResourceType($resource_type));
        } catch (\Exception $e) {
            throw new \Exception('unknown $resource_type:' . $resource_type);
        }

        return $repo;
    }

    /**
     * @param Resource type $res_type
     * @return Pagerfanta
     */
    public function getFlaggedResources($res_type)
    {
        if ($this->vsec->isAdmin()) {
            return $this->getRepository($res_type)->getFlaggedResources();
        }

        return $this->getRepository($res_type)->getResources(new SearchResource(null, null, $this->vsec->getUser()));
    }

    public function save(Resource $resource)
    {
        try {
            $this->em->persist($resource);
            $this->em->flush();
        } catch (\Exception $e) {
            $this->logger->critical($e->getMessage());
            if (!method_exists($resource, 'getUrl')) {
                throw $e;
            }
            $repo = $this->getRepository(ResourceType::getTypeByIndex($resource->getResourceTypeIdx()));
            $existing_resource = $repo->findOneBy(['url' => $resource->getUrl()]);
            if (null === $existing_resource) {
                throw new \Exception('EIn Fehler ist aufgetreten, sorry!');
            }
            throw new \Exception(sprintf('Diese Url existiert schon. (Id#%s "%s")', $existing_resource->getId(), $existing_resource->getName()));
        }

        return $resource->getId();
    }

    public function removeLexicon(Lexicon $lexicon, Resource $res)
    {
        if (!$this->isResourcesRemovingAvailable($res)) {
            throw new \Exception('Es können pro Datensatz nur zwei Lexicons gelöscht werden.');
        }
        $rel = $this->em->getRepository(RelResourceResource::class)->getOneFirstRel($lexicon, $res);
        if (null === $rel) {
            throw new \Exception('There is not such lexicon on this resource');
        }

        $rel->setDeletedByUser($this->vsec->getUser());
        $this->em->persist($rel);
        $this->em->flush();

        return $lexicon->getName();
    }

    public function saveLexicon(Lexicon $lexicon)
    {
        $repo = $this->getRepository('lex');
        $arr_lexicons = $repo->getLexiconByWikiPageId($lexicon->getWikiPageId());

        //

        $arr_wiki_redirects = $lexicon->getWikiRedirects();
        $flush = false;
        if (!$arr_lexicons) {

            $lexicon->setUser($this->vsec->getUser());
            $now = new \DateTime();
            $lexicon->setCreatedAt($now);
            $lexicon->setUpdatedAt($now);
            $this->em->persist($lexicon);
            $flush = true;
        } else {
            $lexicon = $arr_lexicons[0];
        }

        if (!$arr_wiki_redirects->isEmpty()) {
            If (!$this->em->getRepository(WikiRedirect::class)
                          ->getByWikiPageId($arr_wiki_redirects[0]->getWikiPageId())
            ) {
                // sanitize redirect when lexicon exists and were replaced from DB
                if ($arr_lexicons) {
                    $arr_wiki_redirects[0]->setLexicon($lexicon);
                }
                $this->em->persist($arr_wiki_redirects[0]);

                $flush = true;
            }
        }
        if ($flush) {
            $this->em->flush();
        }

        return $lexicon;
    }

    public function isResourcesRemovingAvailable($resource)
    {
        $user = $this->vsec->getUser();

        return ($this->em
                ->getRepository(RelResourceResource::class)
                ->getCountOfRemovedResources($user->getId(), $resource->getId()) < self::RESOURCE_MAX_ALLOWED_REMOVING);
    }

    public function setTag(Tag $tag, Resource $res)
    {
        $this->resourceTagLinker->linkTagToResource($res, $tag->getText());
        $this->em->flush();

        return $tag->getText();
    }

    public function removeTag(Tag $tag, Resource $res)
    {
        $this->resourceTagLinker->unlinkTagFromResource($res, $tag->getText());
        $this->em->flush();

        return $tag->getText();
    }

    public function setRating(Rating $rating, Resource $res)
    {
        $repo = $this->em->getRepository(Rating::class);
        $hasAlreadyRated = $repo->getRatingFromResourceByUser($res, $this->vsec->getUser());
        If (null == $hasAlreadyRated) {
            $rating->setResource($res);
            $rating->setUser($this->vsec->getUser());

            $this->em->persist($rating);
            $this->em->flush();
        } elseif (1 == count($hasAlreadyRated)) {
            throw new \Exception('User ' . $this->vsec->getUser()
                                                      ->getUsername() . ' has already rated this Resource with ' . $hasAlreadyRated[0]->getMark());
        } else {
            throw new \Exception('User ' . $this->vsec->getUser()
                                                      ->getUsername() . ' rated this Resource ' . count($hasAlreadyRated) . ' time. It\'s strongly recommended to chheck the Integrity of you Database!');
        }

        return $rating->getMark();
    }

    public function getRating(Resource $res)
    {
        $repo = $this->em->getRepository(Rating::class);
        $rating = $repo->getRatingFromResourceByUser($res, $this->vsec->getUser());

        If (!$rating) {
            return null;
        } elseif (1 < count($rating)) {
            throw new \Exception('User ' . $this->vsec->getUser()
                                                      ->getUsername() . ' rated this Resource ' . count($rating) . ' time. It\'s strongly recommended to check the Integrity of you Database!');
        }

        return $rating[0];
    }

    public function saveComment(Comment $comment, Resource $res)
    {

        $comment->setResource($res);
        $comment->setUser($this->vsec->getUser());
        $comment->setCreatedAt(new \DateTime());
        $this->em->persist($comment);
        $this->em->flush();

        return;
    }

    /**
     * @param Lexicon $lexicon
     * @param Resource $resource
     * @return string
     */
    public function linkLexiconToResource(Lexicon $lexicon, Resource $resource)
    {
        $this->relResourceLinker->linkLexiconToResource($lexicon, $resource);
        $this->em->flush();

        return $lexicon->getName();
    }

    /**
     * @param Project $project
     * @param Resource $resource
     * @return string
     * @throws \Exception
     */
    public function linkProjectToResource(Project $project, Resource $resource)
    {
        $this->relResourceLinker->linkProjectToResource($project, $resource);
        $this->em->flush();

        return $project->getName();
    }

    public function saveFlag(Flag $flag, Resource $res = null)
    {
        if (null !== $res) {
            $flag->setResource($res);
            $flag->setUser($this->vsec->getUser());
        }
        $this->em->persist($flag);
        $this->em->flush();

        return;
    }

    public function deleteFlag(Flag $flag)
    {
        $this->em->remove($flag);
        $this->em->flush();

        return;
    }

    public function getFlags(Resource $res)
    {
        return $this->em->getRepository(Flag::class)->getFlags($res);
    }

    /**
     * @param $id
     * @return Project|null
     */
    public function getProjectWithData($id)
    {
        $project = $this->getProject($id);

        if (null === $project) {
            return null;
        }
        if (null === $project->getProjectData()) {
            // Project creation is done without project data, so it's created here on the fly
            $project_data = new ProjectData();
            $this->em->persist($project_data);
            $project->setProjectData($project_data);
            $this->em->flush();
        }

        return $project;
    }

    /**
     * @param ProjectData $project_data
     */
    public function saveProjectData(ProjectData $project_data)
    {
        $this->em->persist($project_data);
        $this->em->flush();
    }

    /**
     * @param $id
     * @return Project|null
     */
    public function getProject($id)
    {
        return $this->em
            ->getRepository(Project::class)
            ->find($id);
    }

    /**
     * @param $id
     * @return Lexicon|null
     */
    public function getLexicon($id)
    {
        return $this->em->getRepository(Lexicon::class)->find($id);
    }

    public function watchResource(Resource $res)
    {
        $watchlist_entry = new Watchlist();
        $watchlist_entry->setResource($res);
        $watchlist_entry->setUser($this->vsec->getUser());

        $this->em->persist($watchlist_entry);
        $this->em->flush();

        return;
    }

    public function checkUniqueResourceName(ResourceDTO $dto, $typeInd)
    {
        $repo = $this->getRepository($this->arr_resource_type_idx_to_resource_type[$typeInd]);
        $arr_resources = $repo->getResourceByName($dto->name);

        if (count($arr_resources) > 1) {
            throw new \Exception('Database Integrity Fail: Resourcenames must be unique. (Id#' . $arr_resources[0]->getId() . ', Id#' . $arr_resources[1]->getId() . ' [...])');
        }
    }
}
