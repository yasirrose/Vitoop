<?php
/**
 * Created by PhpStorm.
 * User: Master-Tobi
 * Date: 13.02.14
 * Time: 04:14
 */

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Form\FormError;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\Rating;
use Vitoop\InfomgmtBundle\Entity\Remark;
use Vitoop\InfomgmtBundle\Entity\RemarkPrivate;
use Vitoop\InfomgmtBundle\Entity\Comment;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\Flag;

use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Request;

class ResourceDataCollector
{
    protected $rm;

    protected $vsec;

    protected $lqm;

    protected $ff;

    protected $twig;

    protected $router;

    /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
    protected $res;

    protected $res_type;

    protected $initialized;

    protected $method;

    protected $request;

    protected $handleData;

    public function __construct(
        ResourceManager $rm, VitoopSecurity $vsec, LexiconQueryManager $lqm, FormFactoryInterface $ff, \Twig_Environment $twig, UrlGeneratorInterface $router
    ) {
        $this->rm = $rm;
        $this->vsec = $vsec;
        $this->lqm = $lqm;
        $this->ff = $ff;
        $this->twig = $twig;
        $this->router = $router;

        $this->initialized = false;
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
        return $this->ff->create($this->res->getResourceType(), $this->res, array(
            'action' => $this->router->generate('_xhr_resource_data', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
    }

    public function getData()
    {
        $info_data = '';
        $form_data = $this->getFormData();
        if ($this->handleData) {
            $form_data->handleRequest($this->request);
            if ($form_data->isValid()) {
                try {
                    $this->rm->saveResource($this->res, false);
                    $info_data = $this->res->getResourceName() . ' # ' . $this->res->getId() . ' successfully saved!';
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $form_data->addError($form_error);
                }
            }
        }

        $fv_data = $form_data->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.data.' . $this->res->getResourceType() . '.html.twig', array(
            'res' => $this->res,
            'fvdata' => $fv_data,
            'infodata' => $info_data
        ));
    }

    public function newData()
    {
        $info_data = '';

        $res_type = $this->getResourceType();
        $new_res = $this->rm->createResource($res_type);

        $form_data = $this->ff->create($res_type, $new_res, array(
            'action' => $this->router->generate('_xhr_resource_new', array('res_type' => $res_type)),
            'method' => 'POST'
        ));
        if ($this->handleData) {
            $form_data->handleRequest($this->request);
            if ($form_data->isValid()) {
                try {
                    $new_id = $this->rm->saveResource($new_res, true);
                    $info_data = $new_res->getResourceName() . ' # ' . $new_id . ' erfolgreich neu angelegt!';
                    // Hmmm. No redirect after POS..... what to do?
                    // Here is the trick: Initialize the RDC with the new Resource
                    $this->init($new_res);
                    // Set the handleData flag to false. The latter calls will be treated as GETs
                    $this->handleData = false;
                    // Show the Form for Data with correct route in action attribute
                    $form_data = $this->getFormData();
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $form_data->addError($form_error);
                }
            }
        }

        $fv_data = $form_data->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.data.' . $res_type . '.html.twig', array(
            'res' => $new_res,
            'fvdata' => $fv_data,
            'infodata' => $info_data
        ));
    }

    public function getDataTableRow()
    {
        //@TODO THIS DOES NOT WORK: listtagger wants a pagerfanta...
        $single_res = array($this->res);

        return $this->twig->render('VitoopInfomgmtBundle:Resource:table.resource.tdata.' . $this->res_type . '.html.twig', array('resources' => $single_res));
    }

    public function getTitle()
    {
        if ($this->initialized) {
            return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.title.html.twig', array('res' => $this->res));
        } else {
            return $this->getResourceManager()
                        ->getResourceName($this->res_type) . ' anlegen';
        }
    }

    public function getButtons()
    {
        return ($this->initialized) ? $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.security.buttons.html.twig', array('res_type' => $this->res_type)) : $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.security.buttons.new.html.twig');;
    }

    private function addPermissionsToTagForm(FormInterface $form)
    {
        $form->get('can_add')->setData($this->rm->isTagsAddingAvailable($this->res));
        $form->get('can_remove')->setData($this->rm->isTagsRemovingAvailable($this->res));

        return $form;
    }

    private function addPermissionsToLexiconForm(FormInterface $form)
    {
        $form->get('can_add')->setData($this->rm->isResourcesAddingAvailable($this->res));
        $form->get('can_remove')->setData($this->rm->isResourcesRemovingAvailable($this->res));

        return $form;
    }

    public function getTag()
    {
        $info_tag = '';
        $tag_text = '';
        $tag = new Tag();

        $form_tag = $this->ff->create('tag', $tag, array(
            'action' => $this->router->generate('_xhr_resource_tags', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        $form_tag = $this->addPermissionsToTagForm($form_tag);


        if ($this->handleData) {
            $form_tag->handleRequest($this->request);
            $tag_showown = $form_tag->get('showown')
                                    ->getData();
            if ($form_tag->isValid()) {
                if ($form_tag->get('remove')->isEmpty()) {
                    try {
                        $tag_text = $this->rm->setTag($tag, $this->res);
                        $info_tag = 'Tag "' . $tag_text . '" successfully added!';
                        $form_tag = $this->ff->create('tag', new Tag(), array(
                            'action' => $this->router->generate('_xhr_resource_tags', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                            'method' => 'POST'
                        ));
                        $form_tag = $this->addPermissionsToTagForm($form_tag);
                        $form_tag->get('showown')
                            ->setData($tag_showown);
                    } catch (\Exception $e) {
                        $form_error = new FormError($e->getMessage());
                        $form_tag->get('text')
                            ->addError($form_error);
                    }
                } else {
                    try {
                        $tag_text = $this->rm->removeTag($tag, $this->res);
                        $info_tag = 'Tag "' . $tag_text . '" successfully removed!';
                        $form_tag = $this->ff->create('tag', new Tag(), array(
                            'action' => $this->router->generate('_xhr_resource_tags', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                            'method' => 'POST'
                        ));
                        $form_tag = $this->addPermissionsToTagForm($form_tag);
                        $form_tag->get('showown')
                            ->setData($tag_showown);
                    } catch (\Exception $e) {
                        $form_error = new FormError($e->getMessage());
                        $form_tag->get('text')
                            ->addError($form_error);
                    }
                }
            }
        }

        $tags = $this->rm->getEntityManager()
                         ->getRepository('VitoopInfomgmtBundle:Tag')
                         ->countAllTagsFromResource($this->res);

        $tag_id_list_by_user = $this->rm->getEntityManager()
                                        ->getRepository('VitoopInfomgmtBundle:Tag')
                                        ->getTagIdListByUserFromResource($this->res, $this->vsec->getUser());

        // Mark every "own" Tag setting the "is_own"-key to '1'
        array_walk($tags, function (&$val_tags, $key_tags, $_tag_id_list_by_user) {
            if (in_array($val_tags['id'], $_tag_id_list_by_user)) {
                $val_tags['is_own'] = '1';
            }
        }, $tag_id_list_by_user);

        $fv_tag = $form_tag->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.tag.html.twig', array(
            'res' => $this->res,
            'fvtag' => $fv_tag,
            'infotag' => $info_tag,
            'tagtext' => $tag_text,
            'tags' => $tags
        ));
    }

    public function getMetadata()
    {
        return array('id' => $this->initialized ? $this->res->getId() : 'new', 'type' => $this->res_type);
    }

    public function getRating()
    {
        $info_rating = '';
        $fv_rating = null;
        // Show Average Rating 1.) to Anon.2.) to user already rated
        // Get the mark from user and show as a tooltip

        // @TODO Error occurs if database has more than one Mark for this user per Resource (DB-integrity.worstcase)
        $mark = $this->rm->getEntityManager()
                         ->getRepository('VitoopInfomgmtBundle:Rating')
                         ->getMarkFromResourceByUser($this->res, $this->vsec->getUser());
        // Form will be shown and processed when 1.) User hasn't rated AND 2.) User is a logged in User
        if (null === $mark && !$this->vsec->isViewer()) {
            $rating = new Rating();
            $form_rating = $this->ff->create('rating', $rating, array(
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
                             ->getRepository('VitoopInfomgmtBundle:Rating')
                             ->getAverageMarkFromResource($this->res);
        // @TODO Debug-Outputs - is everything correct?
        // for ($i = - 5; $i <= 5; $i += 0.01) {
        // $avg_mark = $i;
        // $avg_mark = round($avg_mark, 2, PHP_ROUND_HALF_EVEN);
        // echo $i . " : " .
        // sprintf('%+03d', (intval(($avg_mark * 10) ) + (intval(($avg_mark * 10) ) % 2))) . "<br>";
        // }
        // die();
        if (!($avg_mark === null)) {
            $avg_mark = round($avg_mark, 2, PHP_ROUND_HALF_EVEN);
            $avg_img = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+03d', (intval(($avg_mark * 10)) + (intval(($avg_mark * 10)) % 2)))) . '.png';
        } else {
            $avg_img = '';
        }

        if (!(null === $mark)) {
            $own_img = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+02d', $mark) . '0.png');
        } else {
            $own_img = '';
        }

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.rating.html.twig', array(
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
        $remark = $this->rm->getEntityManager()
                           ->getRepository('VitoopInfomgmtBundle:Remark')
                           ->getLatestRemark($this->res);
        if (null === $remark) {
            $remark = new Remark();
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

        $form_remark = $this->ff->create('remark', $remark, array(
            'action' => $this->router->generate('_xhr_resource_remark', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        if ($show_form) {
            if ($this->handleData) {
                $form_remark->handleRequest($this->request);
                if ($form_remark->isValid()) {

                    $remark->setResource($this->res);
                    $remark->setUser($this->vsec->getUser());
                    $this->rm->getEntityManager()
                             ->persist($remark);
                    $this->rm->getEntityManager()
                             ->flush();
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
            'inforemark' => $info_remark
        ));

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.remark.html.twig', array_merge($tpl_vars, array(
            'res' => $this->res,
            'remark' => $remark,
            'showform' => $show_form
        )));
    }

    public function getRemarkPrivate()
    {
        $info_remark = '';
        $fv_remark = null;
        $tpl_vars = array();
        $remarkPrivate = $this->rm->getEntityManager()
            ->getRepository('VitoopInfomgmtBundle:RemarkPrivate')
            ->findOneBy(array(
                'user' => $this->vsec->getUser(),
                'resource' => $this->res
            ));

        if (null === $remarkPrivate) {
            $remarkPrivate = new RemarkPrivate();
        }

        $show_form = true;

        $form_remark = $this->ff->create('remark_private', $remarkPrivate, array(
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

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.remark_private.html.twig', array_merge($tpl_vars, array(
            'res' => $this->res,
            'remark' => $remarkPrivate
        )));
    }

    public function getComment()
    {
        $info_comment = '';

        $comment = new Comment();
        $form_comment = $this->ff->create('comment', $comment, array(
            'action' => $this->router->generate('_xhr_resource_comments', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));

        if ($this->handleData) {
            $form_comment->handleRequest($this->request);
            if ($form_comment->isValid()) {
                $this->rm->saveComment($comment, $this->res);
                $info_comment = 'Kommentar erfolgreich gespeichert';

                $comment = new Comment();
                $form_comment = $this->ff->create('comment', $comment, array(
                    'action' => $this->router->generate('_xhr_resource_comments', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                    'method' => 'POST'
                ));
            }
        }

        $comments = $this->rm->getEntityManager()
                             ->getRepository('VitoopInfomgmtBundle:Comment')
                             ->getAllCommentsFromResource($this->res);

        $fv_comment = $form_comment->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.comments.html.twig', array(
            'comments' => $comments,
            'fvcomment' => $fv_comment,
            'infocomment' => $info_comment,
            'comment' => $comment
        ));
    }

    public function getLexicon()
    {

        $info_lex = '';
        $lex_name = '';
        $lex = new Lexicon();
        $form_lex = $this->ff->create('lexicon_name', $lex, array(
            'action' => $this->router->generate('_xhr_resource_lexicons', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        $form_lex = $this->addPermissionsToLexiconForm($form_lex);
        if ($this->handleData) {
            $form_lex->handleRequest($this->request);
            if ($form_lex->isValid()) {
                try {
                    if ($form_lex->get('remove')->isEmpty()) {
                            $lexicon = $this->rm->getRepository('lex')->findOneBy(array('name' => $lex->getName()));
                            if (is_null($lexicon)) {
                                $lexicon = $this->lqm->getLexiconFromSuggestTerm($lex->getName());
                                // @TODO SaveLexicon and setResource1 should be combined for
                                // atomic DB <Transaction. Otherwise a Lexicon is created but
                                // there could occure an error in assigning it to a resource!

                                $this->rm->saveLexicon($lexicon);
                            }
                            $lex_name = $this->rm->setResource1($lexicon, $this->res);

                            $info_lex = 'Lexicon "' . $lex_name . '" successfully added!';
                            $form_lex = $this->ff->create('lexicon_name', new Lexicon(), array(
                                'action' => $this->router->generate('_xhr_resource_lexicons', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                                'method' => 'POST'
                            ));
                            $form_lex = $this->addPermissionsToLexiconForm($form_lex);
                    } else {
                            $lexicon = $this->rm->getRepository('lex')->findOneBy(array('name' => $lex->getName()));
                            if (is_null($lexicon)) {
                                throw new \Exception("Lexicon is not found!");
                            }
                            $lex_name = $this->rm->removeLexicon($lexicon, $this->res);
                            $info_lex = 'Lexicon "' . $lex_name . '" successfully removed!';
                            $form_lex = $this->ff->create('lexicon_name', new Lexicon(), array(
                                'action' => $this->router->generate('_xhr_resource_lexicons', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                                'method' => 'POST'
                            ));
                            $form_lex = $this->addPermissionsToLexiconForm($form_lex);
                    }
                } catch (\Exception $e) {
                    $form_error = new FormError($e->getMessage());
                    $form_lex->get('name')
                        ->addError($form_error);
                }
            }
        }

        $lexicons = $this->rm->getRepository('lex')
                             ->countAllResources1($this->res);
        $lex_id_list_by_user = $this->rm->getRepository('lex')
                                        ->getResource1IdListByUser($this->res, $this->vsec->getUser());
        //print_r( $lex_id_list_by_user);die();
        // Mark every "own" Resource1 setting the "is_own"-key to '1'
        array_walk($lexicons, function (&$_resources, $key_tags, $_lex_id_list_by_user) {
            if (in_array($_resources['id'], $_lex_id_list_by_user)) {
                $_resources['is_own'] = '1';
            }
        }, $lex_id_list_by_user);

        $fv_lex = $form_lex->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.lexicon.html.twig', array('lexname' => $lex_name, 'fvassignlexicon' => $fv_lex, 'lexicons' => $lexicons, 'infoassignlexicon' => $info_lex));
    }

    public function getProject()
    {

        $info_prj = '';
        $prj_name = '';
        $prj = new Project();
        $form_prj = $this->ff->create('project_name', $prj, array(
            'action' => $this->router->generate('_xhr_resource_projects', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        if ($this->handleData) {
            $form_prj->handleRequest($this->request);
            if ($form_prj->isValid()) {
                try {
                    $prj_name = $this->rm->setResource1($prj, $this->res);
                    $info_prj = 'Project "' . $prj_name . '" successfully added!';
                    $form_prj = $this->ff->create('project_name', new Project(), array(
                        'action' => $this->router->generate('_xhr_resource_projects', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
                        'method' => 'POST'
                    ));
                } catch (\Exception $e) {

                    $form_error = new FormError($e->getMessage());
                    $form_prj->get('name')
                             ->addError($form_error);
                }
            }
        }
        $projects = $this->rm->getRepository('prj')
                             ->getAllNamesOfResources1($this->res);
        $fv_prj = $form_prj->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.project.html.twig', array('prjname' => $prj_name, 'projects' => $projects, 'fvassignproject' => $fv_prj, 'infoassignproject' => $info_prj));
    }

    public function getFlags()
    {
        /* SECURITY */
        if (!$this->vsec->isAdmin()) {
            return '';
        }

        $flag_map_for_verbose_names = array(Flag::FLAG_DELETE => 'zu löschende Resource', Flag::FLAG_BLAME => 'gemeldete Resource');

        $flags = $this->rm->getFlags($this->res);
        if (null === $flags) {
            return '';
        }
        /* @var $flag \Vitoop\InfomgmtBundle\Entity\Flag */
        $flag = $flags[0];

        $form_flag_info = $this->ff->create('flaginfo', $flag, array(
            'action' => $this->router->generate('_xhr_resource_flaginfo', array('res_type' => $this->res->getResourceType(), 'res_id' => $this->res->getId())),
            'method' => 'POST'
        ));
        if ($this->handleData) {
            $form_flag_info->handleRequest($this->request);
            $info_delete = 'Vitoooops! Irgendwas ist schief gelaufen!';
            if ($form_flag_info->get('delete_resource')
                               ->isClicked()
            ) {
                $flag->setType(Flag::FLAG_GONE);
                $this->rm->saveFlag($flag);
                $info_delete = 'Die Resource wurde erfolgreich gelöscht!';
            } else {
                if ($form_flag_info->get('delete_flag')
                                   ->isClicked()
                ) {
                    $this->rm->deleteFlag($flag);
                    $info_delete = 'Die Flag wurde entfernt. Die Resource ist jetzt wieder allgemein sichtbar!';
                }
            }

            return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.flags.infobox.html.twig', array('infodelete' => $info_delete));
        }
        $fv_flag_info = $form_flag_info->createView();

        return $this->twig->render('VitoopInfomgmtBundle:Resource:xhr.resource.flags.html.twig', array('flag' => $flag, 'fvflaginfo' => $fv_flag_info, 'flagverbosenames' => $flag_map_for_verbose_names));
    }
}
