<?php
namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\ORM\NoResultException;

use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Entity\ProjectData;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Rating;
use Vitoop\InfomgmtBundle\Entity\Comment;
use Vitoop\InfomgmtBundle\Entity\RelResourceTag;
use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Entity\Watchlist;
use Doctrine\Common\Persistence\ObjectManager;

class ResourceManager
{
    protected $arr_resource_type_to_entityname = array(
        'res' => 'Resource',
        'pdf' => 'Pdf',
        'adr' => 'Address',
        'link' => 'Link',
        'teli' => 'Teli',
        'lex' => 'Lexicon',
        'prj' => 'Project'
    );

    protected $arr_resource_type_idx_to_entityname = array(
        0 => "Resource",
        1 => "Pdf",
        2 => "Address",
        3 => "Link",
        4 => "Teli",
        5 => "Lexicon",
        6 => "Project"
    );

    protected $arr_resource_type_idx_to_resource_type = array(
        0 => "res",
        1 => "pdf",
        2 => "adr",
        3 => "link",
        4 => "teli",
        5 => "lex",
        6 => "prj"
    );

    /*
    protected $assignment_map = array(5 => array(1, 2, 3, 4, 5), 6 => array(1, 2, 3, 4, 6));
    */
    protected $em;

    protected $vsec;

    public function __construct(ObjectManager $em, VitoopSecurity $vsec)
    {
        $this->em = $em;
        $this->vsec = $vsec;
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

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $this->getRepository($res_type)
                    ->find($res_id);

        return $res;
    }

    public function getUsernameByUserId($id)
    {
        $repo = $this->em->getRepository('Vitoop\\InfomgmtBundle\\Entity\\User');

        return $repo->findOneById($id)
                    ->getUsername();
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

    public function createResource($resource_type)
    {
        $resource_class = 'Vitoop\\InfomgmtBundle\\Entity\\' . $this->arr_resource_type_to_entityname[$resource_type];

        return new $resource_class();
    }

    public function getResourceFormTypeClassname($resource_type)
    {

        return 'Vitoop\\InfomgmtBundle\\Form\\Type\\' . $this->arr_resource_type_to_entityname[$resource_type] . "Type";
    }

    public function getRepository($resource_type)
    {
        try {
            $repo = $this->em->getRepository('Vitoop\\InfomgmtBundle\\Entity\\' . $this->arr_resource_type_to_entityname[$resource_type]);
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
            return $this->getRepository($res_type)
                        ->getFlaggedResources();
        } else {
            return $this->getRepository($res_type)
                        ->getResources();
        }
    }

    public function saveResource(Resource $resource, $new = false)
    {
        if (!$new && (!$this->vsec->isOwner() && !$this->vsec->isAdmin())) {
            throw new \Exception('Sicherheitsfehler!');
        }

        if ($new && !$this->vsec->isUser()) {
            throw new \Exception('Sicherheitsfehler!');
        }

        if (5 == $resource->getResourceTypeIdx()) {
            throw new \Exception('Please use saveLexicon() for saving Lexicon.');
        }
        $repo = $this->getRepository($this->arr_resource_type_idx_to_resource_type[$resource->getResourceTypeIdx()]);
        $arr_resources = $repo->getResourceByName($resource->getName());

        if (count($arr_resources) > 1) {
            throw new \Exception('Database Integrity Fail: Resourcenames must be unique. (Id#' . $arr_resources[0]->getId() . ', Id#' . $arr_resources[1]->getId() . ' [...])');
        }
        if ($new) {
            $resource->setUser($this->vsec->getUser());
            $resource->setCreatedAt(new \DateTime());
        } else {
            $resource->setUpdatedAt(new \DateTime());
        }
       /* if ($arr_resources) {            
            if ($arr_resources[0]->getId() != $resource->getId()) {
                throw new \Exception(sprintf('Dieser Name existiert schon. (Id#%s). Füge einen Zusatz hinzu.', $arr_resources[0]->getId()));
            }
        }*/
        try {
            $this->em->persist($resource);
            $this->em->flush();
        } catch (\Exception $e) {
            $existing_resource = $repo->findOneBy(array('url' => $resource->getUrl()));
            if (null === $existing_resource) {
                throw new \Exception('EIn Fehler ist aufgetreten, sorry!');
            }
            throw new \Exception(sprintf('Diese Url existiert schon. (Id#%s "%s")', $existing_resource->getId(), $existing_resource->getName()));
        }

        return $resource->getId();
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
            If (!$this->em->getRepository('Vitoop\InfomgmtBundle\Entity\WikiRedirect')
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

        return $lexicon->getId();
    }

    public function setTag(Tag $tag, Resource $res)
    {
        $repo = $this->em->getRepository('VitoopInfomgmtBundle:Tag');
        $tag_exists = $repo->findOneByText($tag->getText());

        if (!$tag_exists) {
            $this->em->persist($tag);
        } else {
            $tag = $tag_exists;
        }

        //count tag
        $qb = $this->em->createQueryBuilder();
        $qb->select('count(r.id)');
        $qb->from('VitoopInfomgmtBundle:RelResourceTag','r');
        $qb->where('r.resource = '.$res->getId().'And r.user = '.$this->vsec->getUser()->getId());

        $relResTagCount = $qb->getQuery()->getSingleScalarResult();

        //$relResTagCount count tag

        if($relResTagCount >= 5)
        {
            throw new \Exception('Sie können nur fünf Schlagwörter zuweisen');
        }

        $relation = new RelResourceTag();
        $relation->setResource($res);
        $relation->setTag($tag);
        $relation->setUser($this->vsec->getUser());
        $this->em->persist($relation);

        // $relation can't exist in DB when the tag doesn't exist.
        if (($tag_exists) && ($this->em->getRepository('VitoopInfomgmtBundle:RelResourceTag')
                                       ->exists($relation))
        ) {
            throw new \Exception('Diese Resource wurde von Dir bereits mit ":' . $tag . '" gettaggt!');
        }
        $this->em->flush();

        return $tag->getText();
    }

    public function setRating(Rating $rating, Resource $res)
    {
        $repo = $this->em->getRepository('VitoopInfomgmtBundle:Rating');
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
        $repo = $this->em->getRepository('VitoopInfomgmtBundle:Rating');
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
     * setResource1
     *
     * Assign the Resource $resource to a Resource $resource1 (a Project or a Lexicon)
     *
     * @param Resource $resource1 ,
     *           Resource $resource
     *
     * @return string The Name of the resource1
     */

    public function setResource1(Resource $resource1, Resource $resource)
    {
        $repo = $this->em->getRepository('VitoopInfomgmtBundle:' . $this->arr_resource_type_to_entityname[$resource1->getResourceType()]);

        // The resource1 must already exist in the DB, it CANNOT be created on the fly
        $res1_exists = $repo->getResourceWithUsernameByName($resource1->getName());
        if (!$res1_exists) {
            throw new \Exception('Die zugewiesene Resource (z.B. ein Projekt oder Lexikonartikel) existiert nicht.');
        }

        $resource1 = $res1_exists;

        if ($resource1->getId() === $resource->getId()) {
            throw new \Exception('Eine Resource kann sich nicht selber zugewiesen werden.');
        }

        // Only the Project Owner is allowed to assign resources to the project
        if (('prj' == $resource1->getResourceType() && (!$this->vsec->isEqualToCurrentUser($resource1->getUser())))
        ) {
            throw new \Exception(sprintf('Das darf nur der Eigentümer der Resource, nämlich %s. ', $resource1->getUser()));
        }
        /* Check if assignment is allowed by the assignment_map
        if (!((array_key_exists($resource1->getResourceTypeIdx(), $this->assignment_map)) && (array_key_exists($resource->getResourceTypeIdx(), $this->assignment_map[$resource1->getResourceTypeIdx()])))
        ) {
            throw new \Exception('You can\'t assign a ' . $this->arr_resource_type_to_entityname[$resource->getResourceType()] . ' to a ' . $this->arr_resource_type_to_entityname[$resource1->getResourceType()] . '!');
        }*/
        // Create new Relation RelResourceResource

        $relation = new RelResourceResource();
        $relation->setResource1($resource1);
        $relation->setResource2($resource);
        $relation->setUser($this->vsec->getUser());
        // Relation must be unique (due to the user)
        if ($this->em->getRepository('VitoopInfomgmtBundle:RelResourceResource')
                     ->exists($relation)
        ) {
            // TODO wikiredirects shown only on user input. Here they are retrieved
            // from DB :-(
            // $arr_wiki_redirects = $resource1->getWikiRedirects();
            // if (!$arr_wiki_redirects->isEmpty()) {
            // $wiki_redirect = '(' . $arr_wiki_redirects[0]->getWikiTitle() . ')';
            // } else {
            // $wiki_redirect = '';
            // }
            throw new \Exception('You have assigned this resource already with:' . $resource1); // .
            // $wiki_redirect);
        }

        $this->em->persist($relation);
        $this->em->flush();

        // If (5 == $resource1->getResourceTypeIdx()) {
        // $lexicon = $resource1;
        // $arr_wiki_redirects = $lexicon->getWikiRedirects();
        // if ( ! $arr_wiki_redirects->isEmpty()) {
        // return $resource1->getName() . '(' .
        // $arr_wiki_redirects[0]->getWikiTitle() . ')';
        // }
        // }

        return $resource1->getName();
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
        $flags = $this->em->getRepository('VitoopInfomgmtBundle:Flag')
                          ->getFlags($res);
        if (empty($flags)) {
            return null;
        }

        return $flags;
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
        } elseif (null === $project->getProjectData()) {
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
        $project = $this->em->getRepository('VitoopInfomgmtBundle:Project')
                            ->find($id);

        return $project;
    }

    /**
     * @param $id
     * @return Lexicon|null
     */
    public function getLexicon($id)
    {
        $lexicon = $this->em->getRepository('VitoopInfomgmtBundle:Lexicon')
                            ->find($id);

        return $lexicon;
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
}
