<?php

namespace App\Service;

use Symfony\Component\Form\FormError;
use App\DTO\Resource\ResourceDTO;
use App\DTO\Resource\ResourceTagsDTO;
use App\Entity\ConversationMessage;
use App\Entity\Resource;
use App\Entity\Resource\ResourceFactory;
use App\Entity\Resource\ResourceType;
use App\Entity\Tag;
use App\Entity\Rating;
use App\Entity\Remark;
use App\Entity\RemarkPrivate;
use App\Entity\Comment;
use App\Entity\Lexicon;
use App\Entity\Project;
use App\Entity\Flag;
use App\Entity\User\User;
use App\Form\Adapter\ResourceFormAdapter;
use App\Form\Type\CommentType;
use App\Form\Type\FlagInfoType;
use App\Form\Type\RatingType;
use App\Form\Type\RemarkType;
use App\Form\Type\RemarkPrivateType;
use App\Repository\ConversationMessageRepository;
use App\Service\FormCreator;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Request;
use App\Service\RelResource\RelResourceLinker;
use App\Service\Tag\ResourceTagLinker;
use App\Utils\Title\PopupTitle;
use Twig\Environment;
use App\Utils\Date\DateTimeFormatter;
use App\Entity\User\UserNotes;
use App\Form\Type\UserNotesType;

class ResourceDataCollector
{
    protected $rm;

    protected $vsec;

    protected $lqm;

    protected $ff;

    protected $twig;

    protected $router;

    protected $formCreator;

    /* @var $res \App\Entity\Resource */
    protected $res;

    protected $res_type;

    protected $initialized;
    protected $isValid;

    protected $method;

    protected $request;

    protected $handleData;

    protected $conversationMessageRepository;
    /**
     * @var ResourceTagLinker
     */
    private $tagLinker;
    /**
     * @var RelResourceLinker
     */
    private $relResourceLinker;

    public function __construct(
        ResourceManager $rm,
        VitoopSecurity $vsec,
        LexiconQueryManager $lqm,
        FormFactoryInterface $ff,
        Environment $twig,
        UrlGeneratorInterface $router,
        FormCreator $formCreator,
        ConversationMessageRepository $conversationMessageRepository,
        ResourceTagLinker $tagLinker,
        RelResourceLinker $relResourceLinker
    ) {
        $this->rm = $rm;
        $this->vsec = $vsec;
        $this->lqm = $lqm;
        $this->ff = $ff;
        $this->twig = $twig;
        $this->router = $router;
        $this->formCreator = $formCreator;

        $this->initialized = false;
        $this->isNewValid = true;
        $this->conversationMessageRepository = $conversationMessageRepository;
        $this->tagLinker = $tagLinker;
        $this->relResourceLinker = $relResourceLinker;
    }

    public function prepare($res_type, Request $request)
    {
        $this->res_type = $res_type;
        $this->request = $request;
        if ('GET' !== $request->getMethod()) {
            $this->setDataHandling();
        }
    }

    public function init(Resource $res)
    {
        if ($this->initialized) {
            throw new \Exception('Error: RDC-Service is already initialized.');
        }
        $this->res = $res;
        $this->vsec->setResource($res);
        $this->initialized = true;
    }

    public function isInitialized()
    {
        return $this->initialized;
    }

    public function setDataHandling()
    {
        $this->handleData = true;
    }

    public function getResourceManager()
    {
        return $this->rm;
    }

    public function getResource()
    {
        return $this->res;
    }

    /**
     * @return mixed
     */
    public function getResourceType()
    {
        return $this->res_type;
    }

    public function getRequest()
    {
        return $this->request;
    }

    protected function getFormData()
    {
        return $this->ff->create(
            ResourceFormAdapter::getFormType($this->res->getResourceType()),
            $this->res->toResourceDTO($this->vsec->getUser()),
            [
                'action' => $this->router->generate(
                    '_xhr_resource_data',
                    [
                        'res_type' => $this->res->getResourceType(),
                        'res_id' => $this->res->getId()
                    ]
                ),
                'method' => 'POST'
        ]);
    }

    public function getData()
    {
        $info_data = '';
        $formData = $this->getFormData();
        if ($this->handleData) {
            $formData->handleRequest($this->request);
            if ($formData->isValid()) {
                $dto = $formData->getData();
                try {
                    $this->rm->checkUniqueResourceName($dto, $this->res->getResourceTypeIdx());
                    $this->res->updateFromResourceDTO($dto);
                    $this->rm->save($this->res);
                    $info_data = $this->res->getResourceName() . ' # ' . $this->res->getId() . ' successfully saved!';
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $formData->addError($form_error);
                }
            }
        }

        return $this->twig->render('Resource/xhr.resource.data.' . $this->res->getResourceType() . '.html.twig', array(
            'res' => $this->res,
            'dto' => $dto ?? $this->res->toResourceDTO($this->vsec->getUser()),
            'fvdata' => $formData->createView(),
            'infodata' => $info_data,
            'isShowSave' => ($this->vsec->isOwner() || $this->vsec->isAdmin()),
            'isNew' => false
        ));
    }

    public function getUserDetail($LastloginDate, $createdDate, $userId){
        $user = $this->rm->getEntityManager()->getRepository(User::class)->findOneBy(['id' => $userId]);
        $UserNotes = $this->rm->getEntityManager()->getRepository(UserNotes::class)->findOneBy(['user' => $user]);
        if (null === $UserNotes) {
            $UserNotes = new UserNotes($user, "");
        }
        $show_form = true;
        $info_user_notes = "";
        $form_user_notes = $this->ff->create(UserNotesType::class, $UserNotes, array(
            'action' => $this->router->generate('_xhr_user_detail', array('res_type' => 'userdetail', 'userId' => $userId)),
            'method' => 'POST'
        ));
        if ($show_form) {
            if ($this->handleData) {
                $form_user_notes->handleRequest($this->request);
                if ($form_user_notes->isValid()) {
                    $UserNotes->updateNotes($form_user_notes->get('notes')->getData());
                    $this->rm->getEntityManager()->persist($UserNotes);
                    $this->rm->getEntityManager()->flush();
                    $info_user_notes = 'Bemerkung wurde erfolgreich gespeichert.';
                }
            }
        }
        $fv_user_notes = $form_user_notes->createView();
        $tpl_vars = array(
            'fvusernotes' => $fv_user_notes,
            'infousernotes' => $info_user_notes
        );
        return $this->twig->render('Resource/xhr.user.detail.html.twig', array_merge($tpl_vars, array(
            'lastlogin' => $LastloginDate,
            'createdDate' => $createdDate,
            'usernotes' => $UserNotes,
            'showform' => $show_form,
        )));
    }

    public function newData()
    {
        $info_data = '';
        $isNew = true;

        $res_type = $this->getResourceType();
        $newResource = ResourceFactory::create($res_type);
        $dto = new ResourceDTO();
        $dto->user = $this->vsec->getUser();
        $formData = $this->ff->create($this->rm->getResourceFormTypeClassname($res_type), $dto, array(
            'action' => $this->router->generate('_xhr_resource_new', array('res_type' => $res_type)),
            'method' => 'POST',
            'is_new' => true
        ));
        if ($this->handleData) {
            $formData->handleRequest($this->request);
            $this->isNewValid = $formData->isValid();
            if ($this->isNewValid) {
                try {
                    $class = ResourceType::getClassByResourceType($res_type);
                    $newResource = $class::createFromResourceDTO($dto);
                    $this->rm->checkUniqueResourceName($dto, $newResource->getResourceTypeIdx());
                    $new_id = $this->rm->save($newResource);

                    if ($res_type == 'conversation') {
                        $conversationMessage = new ConversationMessage($dto->description, $dto->user, $newResource->getConversationData());
                        $this->conversationMessageRepository->save($conversationMessage);
                    }

                    $info_data = $newResource->getResourceName() . ' # ' . $new_id . ' erfolgreich neu angelegt!';
                    // Hmmm. No redirect after POS..... what to do?
                    // Here is the trick: Initialize the RDC with the new Resource
                    $this->init($newResource);
                    // Set the handleData flag to false. The latter calls will be treated as GETs
                    $this->handleData = false;
                    // Show the Form for Data with correct route in action attribute
                    $formData = $this->getFormData();
                    $isNew = false;
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $formData->addError($form_error);
                }
            }
        }

        return $this->twig->render('Resource\xhr.resource.data.' . $res_type . '.html.twig', array(
            'res' => $newResource,
            'dto' => $dto ?? $this->res->toResourceDTO($this->vsec->getUser()),
            'fvdata' => $formData->createView(),
            'infodata' => $info_data,
            'isShowSave' => true,
            'isNew' => $isNew,
        ));
    }

    public function getTitle()
    {
        if ($this->initialized) {
            return (new PopupTitle($this->res->getName()))->getTitle();
        }
        $type = $this->getResourceManager()
            ->getResourceName($this->res_type);
        if ($type == "Book") {
            $type = "Buch";
        }
        return $type.' anlegen';
    }

    public function getButtons()
    {
        return ($this->initialized) ? $this->twig->render('Resource\xhr.resource.security.buttons.html.twig', array('res_type' => $this->res_type)) : $this->twig->render('Resource/xhr.resource.security.buttons.new.html.twig');;
    }

    public function getTag($forFullLexiconPage = false, $forPdfPage = false)
    {
        $info_tag = '';
        $tag_text = '';
        $tag = new Tag();

        $action = $this->router->generate('_xhr_resource_tags', array(
            'res_type' => $this->res->getResourceType(),
            'res_id' => $this->res->getId()
        ));
        $template = 'Resource\xhr.resource.tag.html.twig';

        $form_tag = $this->formCreator->createTagForm($tag, $this->res, $action);

        if ($this->handleData) {
            $form_tag->handleRequest($this->request);
            $tag_showown = $form_tag->get('showown')->getData();
            if ($form_tag->isValid()) {
                if ($form_tag->get('remove')->isEmpty()) {
                    try {
                        $tag_text = $this->rm->setTag($tag, $this->res);
                        $info_tag = 'Tag "' . $tag_text . '" zugewiesen/hochgestuft!';
                        $form_tag = $this->formCreator->createTagForm(new Tag(), $this->res, $action);
                        $form_tag->get('showown')->setData($tag_showown);
                    } catch (\Exception $e) {
                        $form_error = new FormError($e->getMessage());
                        $form_tag->get('text')->addError($form_error);
                    }
                } else {
                    try {
                        $tag_text = $this->rm->removeTag($tag, $this->res);
                        $info_tag = 'Tag "' . $tag_text . '" wurde entfernt/runtergestuft!';
                        $form_tag = $this->formCreator->createTagForm(new Tag(), $this->res, $action);
                        $form_tag->get('showown')->setData($tag_showown);
                    } catch (\Exception $e) {
                        $form_error = new FormError($e->getMessage());
                        $form_tag->get('text')->addError($form_error);
                    }
                }
            }
        }

        $tags = $this->rm->getEntityManager()
            ->getRepository(Tag::class)
            ->countAllTagsFromResource($this->res);

        $tagsRestAddedCount = $this->tagLinker->getTagRestForAddingCount($this->res, $this->vsec->getUser());
        $tagsRestRemovedCount = $this->tagLinker->getTagRestForRemovingCount($this->res, $this->vsec->getUser());

        $tag_id_list_by_user = $this->rm->getEntityManager()
            ->getRepository(Tag::class)
            ->getTagIdListByUserFromResource($this->res, $this->vsec->getUser());

        $resourceTagDTO = new ResourceTagsDTO($tags, $tagsRestAddedCount, $tagsRestRemovedCount);
        $resourceTagDTO->setOwnership($tag_id_list_by_user);

        $fv_tag = $form_tag->createView();

        return $this->twig->render($template, array(
            'res' => $this->res,
            'fvtag' => $fv_tag,
            'infotag' => $info_tag,
            'tagtext' => $tag_text,
            'tags' => $resourceTagDTO->tags,
            'tagsRestAddedCount' => $resourceTagDTO->tagsRestAddedCount,
            'tagsRestRemovedCount' => $resourceTagDTO->tagsRestRemovedCount,
            'forPdfPage' => $forPdfPage
        ));
    }

    public function getMetadata()
    {
        return [
            'id' => $this->initialized ? $this->res->getId() : 'new',
            'type' => $this->res_type,
            'isNewValid' => $this->isNewValid,
            'canRead' => $this->res ? $this->res->toResourceDTO($this->vsec->getUser())->canRead: false,
            'link' => ('lex' === $this->res_type)? $this->res->getViewLink(): ''
        ];
    }

    public function getRating()
    {
        if ($this->res_type == "lex") {
            return null;
        }
        $info_rating = '';
        $fv_rating = null;
        // Show Average Rating 1.) to Anon.2.) to user already rated
        // Get the mark from user and show as a tooltip

        // @TODO Error occurs if database has more than one Mark for this user per Resource (DB-integrity.worstcase)
        $mark = $this->rm->getEntityManager()
                ->getRepository(Rating::class)
                ->getMarkFromResourceByUser($this->res, $this->vsec->getUser());
        // Form will be shown and processed when 1.) User hasn't rated AND 2.) User is a logged in User
        if (null === $mark && !$this->vsec->isViewer()) {
            $rating = new Rating();
            $form_rating = $this->ff->create(RatingType::class, $rating, array(
                'action' => $this->router->generate('_xhr_resource_rating', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                'method' => 'POST'
            ));

            if ($this->handleData) {
                $form_rating->handleRequest($this->request);
                if ($form_rating->isValid()) {
                    // for convenience Mark is returned by ResourceManager::setRating()
                    $mark = $this->rm->setRating($rating, $this->res);
                    $info_rating = 'Du hast diese Resource mit ' . $mark . ' bewertet';
                    // Set the FormView to null so the View is informed not to show it
                    $fv_rating = null;
                } else {
                    $fv_rating = $form_rating->createView();
                }
            } else {
                $fv_rating = $form_rating->createView();
            }
        }

        $avg_mark = $this->rm->getEntityManager()
            ->getRepository(Rating::class)
            ->getAverageMarkFromResource($this->res);
        // @TODO Debug-Outputs - is everything correct?
        // for ($i = - 5; $i <= 5; $i += 0.01) {
        // $avg_mark = $i;
        // $avg_mark = round($avg_mark, 2, PHP_ROUND_HALF_EVEN);
        // echo $i . " : " .
        // sprintf('%+03d', (intval(($avg_mark * 10) ) + (intval(($avg_mark * 10) ) % 2))) . "<br>";
        // }
        // die();
        $avg_img = '';
        if (!($avg_mark === null)) {
            $avg_mark = round($avg_mark, 2, PHP_ROUND_HALF_EVEN);
            $avg_img = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+03d', (intval(($avg_mark * 10)) + (intval(($avg_mark * 10)) % 2)))) . '.png';
        }

        $own_img = '';
        if (!(null === $mark)) {
            $own_img = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+02d', $mark) . '0.png');
        }

        return $this->twig->render('Resource/xhr.resource.rating.html.twig', array(
            'res' => $this->res,
            'fvrating' => $fv_rating,
            'inforating' => $info_rating,
            'ownmark' => $mark,
            'avgmark' => $avg_mark,
            'ownimg' => $own_img,
            'avgimg' => $avg_img
        ));
    }

    public function getRemark()
    {
        $info_remark = '';
        $fv_remark = null;
        $tpl_vars = array();

        $remarkLast = $this->rm->getEntityManager()
            ->getRepository(Remark::class)
            ->getLatestRemark($this->res);
        $remark = new Remark();
        if (!is_null($remarkLast)) {
            $remark->setText($remarkLast->getText());
            $remark->setLocked($remarkLast->getLocked());
        }

        $show_form = false;

        if (!$remark->isLocked()) {
            $show_form = true;
        }
        if ($this->vsec->isAdmin()) {
            $show_form = true;
        }
        if ($remark->isLocked() && $this->vsec->isEqualToCurrentUser($remark->getUser())) {
            $show_form = true;
        }

        $form_remark = $this->ff->create(RemarkType::class, $remark, array(
            'action' => $this->router->generate('_xhr_resource_remark', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        if ($show_form) {
            if ($this->handleData) {
                $form_remark->handleRequest($this->request);
                if ($form_remark->isValid()) {

                    $remark->setResource($this->res);
                    $remark->setUser($this->vsec->getUser());
                    $remark->setIp($this->request->getClientIp());
                    $this->rm->getEntityManager()->persist($remark);
                    $this->rm->getEntityManager()->flush();
                    $info_remark = 'Bemerkung wurde erfolgreich gespeichert.';
                }
            }
        }

        $fv_remark = $form_remark->createView();
        //@TODO disable in listener?
        if (!$show_form) {
            $fv_child = $fv_remark->children['save'];
            $fv_child->vars = array_replace($fv_child->vars, array(
                'disabled' => true,
                'required' => false
            ));
            $fv_child = $fv_remark->children['locked'];
            $fv_child->vars = array_replace($fv_child->vars, array(
                'disabled' => true,
                'required' => false
            ));
        };

        $tpl_vars = array_merge($tpl_vars, array(
            'fvremark' => $fv_remark,
            'inforemark' => $info_remark,
            'needToAccept' => true
        ));

        $remarks = $this->rm->getEntityManager()
            ->getRepository(Remark::class)
            ->getAllRemarks($this->res);

        return $this->twig->render('Resource/xhr.resource.remark.html.twig', array_merge($tpl_vars, array(
            'res' => $this->res,
            'remark' => $remark,
            'remarks' => $remarks,
            'showform' => $show_form
        )));
    }

    public function getRemarkPrivate()
    {
        $info_remark = '';
        $tpl_vars = array();
        $remarkPrivate = $this->rm->getEntityManager()
            ->getRepository(RemarkPrivate::class)
            ->findOneBy(array(
                'user' => $this->vsec->getUser(),
                'resource' => $this->res
            ));

        if (null === $remarkPrivate) {
            $remarkPrivate = new RemarkPrivate();
        }

        $show_form = true;

        $form_remark = $this->ff->create(RemarkPrivateType::class, $remarkPrivate, array(
            'action' => $this->router->generate('_xhr_resource_remark_private', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
            if ($this->handleData) {
                $form_remark->handleRequest($this->request);
                if ($form_remark->isValid()) {

                    $remarkPrivate->setResource($this->res);
                    $remarkPrivate->setUser($this->vsec->getUser());
                    $this->rm->getEntityManager()
                        ->persist($remarkPrivate);
                    $this->rm->getEntityManager()
                        ->flush();
                    $info_remark = 'Bemerkung wurde erfolgreich gespeichert.';
                }
            }

        $fv_remark = $form_remark->createView();

        $tpl_vars = array_merge($tpl_vars, array(
            'fvremarkpr' => $fv_remark,
            'inforemark' => $info_remark
        ));

        return $this->twig->render('Resource/xhr.resource.remark_private.html.twig', array_merge($tpl_vars, array(
            'res' => $this->res,
            'remark' => $remarkPrivate
        )));
    }

    public function getComment()
    {
        $info_comment = '';

        $comment = new Comment();
        $form_comment = $this->ff->create(CommentType::class, $comment, array(
            'action' => $this->router->generate('_xhr_resource_comments', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));

        if ($this->handleData) {
            $form_comment->handleRequest($this->request);
            if ($form_comment->isValid()) {
                $this->rm->saveComment($comment, $this->res);
                $info_comment = 'Kommentar erfolgreich gespeichert';

                $comment = new Comment();
                $form_comment = $this->ff->create(CommentType::class, $comment, array(
                    'action' => $this->router->generate('_xhr_resource_comments', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                    'method' => 'POST'
                ));
            }
        }

        if ($this->vsec->isAdmin()) {
            $comments = $this->rm->getEntityManager()
                ->getRepository(Comment::class)
                ->getAllCommentsFromResource($this->res);
        } else {
            $comments = $this->rm->getEntityManager()
                ->getRepository(Comment::class)
                ->getAllVisibleCommentsFromResource($this->res);
        }

        $fv_comment = $form_comment->createView();

        return $this->twig->render('Resource/xhr.resource.comments.html.twig', array(
            'comments' => $comments,
            'fvcomment' => $fv_comment,
            'infocomment' => $info_comment,
            'comment' => $comment
        ));
    }

    public function getLexicon($isLexiconHome = false)
    {
        if ($isLexiconHome) {
            $action = $this->router->generate('_xhr_resource_lexicons_lexicon', array(
                'res_type' => $this->res->getResourceType(),
                'res_id' => $this->res->getId(),
                'isLexiconHome' => 1
            ));
            $template = 'Resource/lexicon.lexicon.html.twig';
        } else {
            $action = $this->router->generate('_xhr_resource_lexicons', array(
                'res_type' => $this->res->getResourceType(),
                'res_id' => $this->res->getId()
            ));
            $template = 'Resource/xhr.resource.lexicon.html.twig';
        }
        $info_lex = '';
        $lex_name = '';
        $lex = new Lexicon();
        $form_lex = $this->formCreator->createLexiconNameForm($lex, $this->res, $action);
        if ($this->handleData) {
            $form_lex->handleRequest($this->request);
            if ($form_lex->isValid()) {
                try {
                    $lexicon = $this->rm->getRepository('lex')->findOneBy(array('name' => $lex->getName()));
                    if ($form_lex->get('remove')->isEmpty()) {
                        if (null === $lexicon || ($lexicon && strlen($lexicon->getDescription())<5)) {
                            $lexicon = $this->lqm->getLexiconFromSuggestTerm($lex->getName());
                            // @TODO SaveLexicon and setResource1 should be combined for
                            // atomic DB <Transaction. Otherwise a Lexicon is created but
                            // there could occure an error in assigning it to a resource!

                            $lexicon = $this->rm->saveLexicon($lexicon);
                        }


                        $lex_name = $this->rm->linkLexiconToResource($lexicon, $this->res);

                        $info_lex = 'Lexikon "' . $lex_name . '" wurde erfolgreich verknüpft.';
                        $form_lex = $this->formCreator->createLexiconNameForm(new Lexicon(), $this->res, $action);
                    } else {
                        if (is_null($lexicon)) {
                            throw new \Exception("Lexicon is not found!");
                        }
                        $lex_name = $this->rm->removeLexicon($lexicon, $this->res);
                        $info_lex = 'Lexicon "' . $lex_name . '" successfully removed!';
                        $form_lex = $this->formCreator->createLexiconNameForm(new Lexicon(), $this->res, $action);
                    }
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $form_lex->get('name')->addError($form_error);
                }
            }
        }

        $lexicons = $this->rm->getRepository('lex')->countAllResources1($this->res, $this->vsec->getUser());
//        $lex_id_list_by_user = $this->rm->getRepository('lex')
//                                        ->getResource1IdListByUser($this->res, $this->vsec->getUser());
//        //print_r( $lex_id_list_by_user);die();
//        // Mark every "own" Resource1 setting the "is_own"-key to '1'
//        array_walk($lexicons, function (&$_resources, $key_tags, $_lex_id_list_by_user) {
//            if (in_array($_resources['id'], $_lex_id_list_by_user)) {
//                $_resources['is_own'] = '1';
//            }
//        }, $lex_id_list_by_user);

        $fv_lex = $form_lex->createView();

        $relResourceRestAddingCount = $this->relResourceLinker->getResourceForAddingCount($this->res, $this->vsec->getUser());
        $relResourceRestRemovingCount = $this->relResourceLinker->getResourceForRemovingCount($this->res, $this->vsec->getUser());

        return $this->twig->render(
            $template, [
                'lexname' => $lex_name,
                'fvassignlexicon' => $fv_lex,
                'lexicons' => $lexicons,
                'infoassignlexicon' => $info_lex,
                'relsRestAddedCount' => !empty($relResourceRestAddingCount)?$relResourceRestAddingCount:'',
                'relsRestRemovedCount' => !empty($relResourceRestRemovingCount)?$relResourceRestRemovingCount:''
            ]
        );
    }

    public function getLexiconDescription($term = "")
    {
        $data = array();
        $lexicon = $this->lqm->getLexiconDescriptionFromTerm($term);
        $data['description'] = $lexicon['description'];
        $data['footer'] = $this->twig->render('Resource/xhr.resource.lexicon.footer.html.twig', array('lexicon' => $lexicon));
        return $data;
    }

    public function getProject()
    {
        $info_prj = '';
        $prj_name = '';
        $prj = new Project();
        $projectsCollection = $this->rm->getEntityManager()->getRepository(Project::class)->getMyProjectsShortDTO($this->vsec->getUser());
        $projects = array();
        foreach ($projectsCollection as $project) {
            $projects[$project->name] = $project->name;
        }
        $action = $this->router->generate('_xhr_resource_projects', ['res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId()]);
        $form_prj = $this->formCreator->createProjectNameForm($prj, $action, $projects);
        if ($this->handleData) {
            $form_prj->handleRequest($this->request);
            if ($form_prj->isValid()) {
                try {
                    $prj = $this->rm->getRepository('prj')->findOneBy(['name' => $prj->getName()]);
                    $prj_name = $this->rm->linkProjectToResource($prj, $this->res);

                    $info_prj = 'Der Datensatz wurde dem Projekt #' . $prj->getId() . ' erfolgreich hinzugefügt';
                    $form_prj = $this->formCreator->createProjectNameForm(new Project(), $action, $projects);
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $form_prj->get('name')->addError($form_error);
                }
            }
        }
        $projects = $this->rm->getRepository('prj')->getAllNamesOfResources1($this->res);
        $fv_prj = $form_prj->createView();

        return $this->twig->render('Resource/xhr.resource.project.html.twig', array('prjname' => $prj_name, 'projects' => $projects, 'fvassignproject' => $fv_prj, 'infoassignproject' => $info_prj));
    }

    public function getFlags()
    {
        /* SECURITY */
        if (!$this->vsec->isAdmin()) {
            return '';
        }

        $flags = $this->rm->getFlags($this->res);
        if (null === $flags) {
            return '';
        }
        /* @var $flag \App\Entity\Flag */
        $flag = $flags[0];

        $form_flag_info = $this->ff->create(FlagInfoType::class, $flag, array(
            'action' => $this->router->generate('_xhr_resource_flaginfo', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        if ($this->handleData) {
            $form_flag_info->handleRequest($this->request);
            $info_delete = 'Vitoooops! Irgendwas ist schief gelaufen!';
            if (method_exists($this->res, 'skip')) {
                if ($form_flag_info->get('isSkip')->getData()) {
                    $this->res->skip();
                } else {
                    $this->res->unskip();
                }
            }
            if ($form_flag_info->get('delete_resource')->isClicked()) {
                $flag->approve();
                $this->rm->saveFlag($flag);
                $info_delete = 'Die Resource wurde erfolgreich gelöscht!';
            } elseif ($form_flag_info->get('delete_flag')->isClicked()) {
                $this->rm->deleteFlag($flag);
                $info_delete = 'Die Flag wurde entfernt. Die Resource ist jetzt wieder allgemein sichtbar!';
            }

            return $this->twig->render('Resource/xhr.resource.flags.infobox.html.twig', array('infodelete' => $info_delete));
        }
        $fv_flag_info = $form_flag_info->createView();

        return $this->twig->render(
            'Resource/xhr.resource.flags.html.twig',
            array(
                'flag' => $flag,
                'fvflaginfo' => $fv_flag_info,
                'flagverbosename' => $this->getFlagVerboseName($flag->getType())
            )
        );
    }

    private function getFlagVerboseName($flagType)
    {
        $flagMap = [
            Flag::FLAG_DELETE => 'zu löschende Resource',
            Flag::FLAG_BLAME => 'gemeldete Resource'
        ];

        if (array_key_exists($flagType, $flagMap)) {
            return $flagMap[$flagType];
        }

        return '';
    }
}
