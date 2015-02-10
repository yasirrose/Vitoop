<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Buzz\Browser;
use Symfony\Component\HttpKernel\KernelEvents;
use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Entity\UserData;
use Vitoop\InfomgmtBundle\Entity\VitoopBlog;
use Vitoop\InfomgmtBundle\Service\ResourceManager;

use Vitoop\InfomgmtBundle\Entity\Resource;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Form\Type\TagType;

use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Form\Type\ProjectType;
use Vitoop\InfomgmtBundle\Form\Type\ProjectNameType;

use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Form\Type\LexiconType;
use Vitoop\InfomgmtBundle\Form\Type\LexiconNameType;

use Vitoop\InfomgmtBundle\Entity\Rating;
use Vitoop\InfomgmtBundle\Form\Type\RatingType;

use Vitoop\InfomgmtBundle\Entity\Comment;
use Vitoop\InfomgmtBundle\Form\Type\CommentType;

use Vitoop\InfomgmtBundle\Entity\RelResourceTag;

use Vitoop\InfomgmtBundle\Entity\Remark;
use Vitoop\InfomgmtBundle\Form\Type\RemarkType;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Security\Core\SecurityContext;

use Symfony\Component\Form\Exception;
use Symfony\Component\Form\Form;

use Symfony\Component\HttpKernel\HttpKernelInterface;

use JMS\SecurityExtraBundle\Annotation\Secure;
use JMS\SecurityExtraBundle\Security\Authorization\Expression\Expression;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

use Doctrine\Common\Collections\Criteria;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;


use Pagerfanta\Pagerfanta;

class ResourceController extends Controller
{
    public function homeAction($project_id = 0, $lexicon_id = 0)
    {
        $rm = $this->get('vitoop.resource_manager');
        $request = $this->getRequest();
        $tpl_vars = array();

        $is_user_home = false;
        $is_project_home = false;
        $is_lexicon_home = false;

        /* Project Home */
        if ($request->query->has('project')) {
            $project_id = $request->query->get('project');
        }

        /* Lexicon Home */
        if ($request->query->has('lexicon')) {
            $lexicon_id = $request->query->get(lexicon);
        }

        /* flagged */
        $flagged = $request->query->get('flagged');

        // Decide which home
        if (0 != $project_id) {
            $project = $rm->getProjectWithData($project_id);
            if (null !== $project) {
                $is_project_home = true;
            }
        } elseif (0 != $lexicon_id) {
            $lexicon = $this->getDoctrine()
                            ->getRepository('VitoopInfomgmtBundle:Lexicon')
                            ->getLexiconWithWikiRedirects($lexicon_id);
            if (null !== $lexicon) {
                $is_lexicon_home = true;
            }
        } else {
            $is_user_home = true;
        }

        if ($is_user_home) {
            $vsec = $this->get('vitoop.vitoop_security');
            if ($vsec->isUser()) {
                $user = $vsec->getUser();
                $user_data = $user->getUserData();
                if (null === $user_data) {
                    $user_data = new UserData($user);
                }
                $info_user_data = '';
                $form_user_data = $this->createForm('user_data', $user_data, array(
                    'action' => $this->generateUrl('_home'),
                    'method' => 'POST'
                ));
                if ($request->isMethod('POST')) {
                    $form_user_data->handleRequest($request);
                    if ($form_user_data->isValid()) {
                        $em = $this->getDoctrine()
                                   ->getManager();
                        $em->persist($user_data);
                        $em->flush();
                        $info_user_data = 'Änderungen wurden erfolgreich gespeichert';
                    }
                }

                if ($flagged) {
                    $tpl_vars = array_merge($tpl_vars, array(
                        'flagged' => 1
                    ));
                }

                $fv_user_data = $form_user_data->createView();

                $tpl_vars = array_merge($tpl_vars, array(
                    'fvuserdata' => $fv_user_data,
                    'infouserdata' => $info_user_data
                ));

                $tpl_vars = array_merge($tpl_vars, array(
                    'user' => $user
                ));
            }
            $home_content_tpl = 'VitoopInfomgmtBundle:Resource:home.user.html.twig';
        } elseif ($is_project_home) {
            $show_as_projectowner = false;
            $vsec = $this->get('vitoop.vitoop_security');
            if (($project->getIsPrivate()) && ($project->getUser()->getId() != $vsec->getUser()->getId())) {
                throw new AccessDeniedHttpException;
            }
            if ($vsec->isEqualToCurrentUser($project->getUser())) {
                $show_as_projectowner = true;
                // Show the form for project data
                $project_data = $project->getProjectData();
                $info_project_data = '';
                $form_project_data = $this->createForm('project_data', $project_data, array(
                    'action' => $this->generateUrl('_home_project', array('project_id' => $project->getId())),
                    'method' => 'POST'
                ));
                if ($request->isMethod('POST')) {
                    $form_project_data->handleRequest($request);
                    if ($form_project_data->isValid()) {
                        $rm->saveProjectData($project_data);
                        $info_project_data = 'Änderungen wurden erfolgreich gespeichert';
                    }
                }

                $fv_project_data = $form_project_data->createView();

                $tpl_vars = array_merge($tpl_vars, array(
                    'fvprojectdata' => $fv_project_data,
                    'infoprojectdata' => $info_project_data
                ));
            }
            $projectInfo = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:Project')->getCountOfRelatedResources($project);
            $tpl_vars = array_merge($tpl_vars, array(
                'project' => $project,
                'projectInfo' => $projectInfo,
                'showasprojectowner' => $show_as_projectowner
            ));
            $home_content_tpl = 'VitoopInfomgmtBundle:Resource:home.project.live.html.twig';
        } elseif ($is_lexicon_home) {
            $tpl_vars = array_merge($tpl_vars, array(
                'lexicon' => $lexicon
            ));
            $home_content_tpl = 'VitoopInfomgmtBundle:Resource:home.lexicon.html.twig';
        }
        //$tpl_vars = array_merge($tpl_vars, array());

        if ($this->getRequest()
                 ->isXmlHttpRequest()
        ) {
            $home_tpl = $home_content_tpl;
        } else {
            $home_tpl = 'VitoopInfomgmtBundle:Resource:home.html.twig';
            $tpl_vars = array_merge($tpl_vars, array('homecontenttpl' => $home_content_tpl));
        }

        return $this->render($home_tpl, $tpl_vars);
    }

    public function listAction($res_type)
    {
        $rm = $this->get('vitoop.resource_manager');
        $request = $this->getRequest();
        $user = $this->get('vitoop.vitoop_security')->getUser();

        $mode_search_by_tags = false;
        $mode_filter_by_project_id = false;
        $mode_filter_by_lexicon_id = false;
        $mode_normal = false;

        $block_content_tpl = 'VitoopInfomgmtBundle:Resource:table.resource.html.twig';

        /* Search by Tags */
        $tag_list = $request->query->get('taglist');
        $tag_list_ignore = $request->query->get('taglist_i');
        $tag_list_highlight = $request->query->get('taglist_h');
        $tag_cnt = $request->query->get('tagcnt');

        $tag_list_ignore = (is_null($tag_list_ignore))?(array()):($tag_list_ignore);
        $tag_list_highlight = (is_null($tag_list_highlight))?(array()):($tag_list_highlight);

        /* Project View */
        $project_id = $request->query->get('project');
        /* Lexicon View */
        $lexicon_id = $request->query->get('lexicon');

        /* flagged */
        $flagged = $request->query->get('flagged');

        // Decide mode
        if (!empty($tag_list) && is_array($tag_list)) {
            $mode_search_by_tags = true;
        } elseif (null !== $project_id) {
            $project = $rm->getProject($project_id);
            if (null !== $project) {
                $mode_filter_by_project_id = true;
            } else {
                $mode_normal = true;
            }
        } elseif (null !== $lexicon_id) {
            $lexicon = $rm->getLexicon($lexicon_id);
            if (null !== $lexicon) {
                $mode_filter_by_lexicon_id = true;
            } else {
                $mode_normal = true;
            }
        } else {
            $mode_normal = true;
        }

        /* Pagination Parameters */
        $page = $request->query->get('page') ? $request->query->get('page') : 1;
        $max_per_page = $request->query->get('maxperpage') ? $request->query->get('maxperpage') : $request->cookies->get('maxperpage');

        //maxperpage set to a new value by inputbox?
        $_max_per_page = $request->query->get('_maxperpage');
        if (null !== $_max_per_page) {
            $ucm = $this->get('vitoop.user_config_manager');
            $ucm->setMaxPerPage($_max_per_page);
            $max_per_page = $_max_per_page;
            $this->get('event_dispatcher')
                 ->addListener(KernelEvents::RESPONSE, array(($this->get('kernel.listener.login_listener')), 'onFilterResponse'));
        }

        // preparing the template-vars
        $tpl_vars = array(
            'restype' => $res_type,
            'resname' => $rm->getResourceName($res_type),
            'user' => $user
        );

        if ($mode_search_by_tags) {
            // $tag_list="";
            // die("taglist:".$tag_list."-".((''===$tag_list)?'1':'0')."-".(is_null($tag_list)?'1':'0')."-".gettype($tag_list));
            // @TODO tag_list"="^[A-Za-z0-9ÄÖÜäöü,]+[A-Za-z0-9ÄÖÜäöü]$"
            //$arr_tags = explode(',', $tag_list);
            // NEW: We catch the tag_list as an array, no more exploding needed
            $arr_tags = $tag_list; // inject into template vars
            $tpl_vars = array_merge($tpl_vars, array(
                'taglist' => array_diff($tag_list, $tag_list_highlight),
                'taglist_for_links' => $tag_list,
                'taglist_h' => $tag_list_highlight,
                'taglist_i' => $tag_list_ignore
            ));
            // normalize $tag_cnt, injection will follow if it is valid
            $tag_cnt = intval($tag_cnt);

            // if no or invalid $tag_cnt given a special resultpage will be shown
            if ($tag_cnt > count($arr_tags) || $tag_cnt < 1) {
                $data_for_overview = $rm->getRepository($res_type)
                                        ->getDataForOverview($arr_tags, $tag_list_ignore);
                $resources = null;
                $block_content_tpl = 'VitoopInfomgmtBundle:Resource:search.bytags.overview.html.twig';
                $tpl_vars = array_merge($tpl_vars, array('data_for_overview' => $data_for_overview));
            } else {
                $resources = $rm->getRepository($res_type)
                                ->getResourcesByTags($arr_tags, $tag_list_ignore, $tag_list_highlight, $tag_cnt);
                $tpl_vars = array_merge($tpl_vars, array(
                    'tagcnt' => $tag_cnt
                ));
            }
        } elseif ($mode_filter_by_project_id) {
            $resources = $rm->getRepository($res_type)
                            ->getResources2ByResource1($project);
        } elseif ($mode_filter_by_lexicon_id) {
            $resources = $rm->getRepository($res_type)
                            ->getResources2ByResource1($lexicon);
        } elseif ($mode_normal) {
            // NORMAL FLOW
            if (!$flagged) {
                $resources = $rm->getRepository($res_type)
                                ->getResources();
            } else {
                $resources = $rm->getflaggedResources($res_type);
                $tpl_vars = array_merge($tpl_vars, array(
                    'flagged' => 1
                ));
            }
        }

        $tpl_vars = array_merge($tpl_vars, array('resources' => $resources));

        /* @var $resources Pagerfanta */
        if (isset($resources)) {
            $resources->setMaxPerPage($max_per_page)
                      ->setCurrentPage($page);
        }

        $tpl_vars = array_merge($tpl_vars, array('maxperpage' => $max_per_page));

        if ($this->getRequest()
                 ->isXmlHttpRequest()
        ) {
            $list_tpl = $block_content_tpl;
        } else {
            $list_tpl = 'VitoopInfomgmtBundle:Resource:list.html.twig';
            $tpl_vars = array_merge($tpl_vars, array('blockcontenttpl' => $block_content_tpl));
        }

        return $this->render($list_tpl, $tpl_vars);
    }

    public function  editVitoopBlogAction()
    {
        $request = $this->getRequest();
        $vsec = $this->get('vitoop.vitoop_security');
        if (!$vsec->isAdmin()) {
            throw new AccessDeniedException();
        }

        $vitoop_blog = $this->getDoctrine()
                            ->getRepository('VitoopInfomgmtBundle:VitoopBlog')
                            ->findAll();
        if (empty($vitoop_blog)) {
            // create initial entry on the fly
            $vitoop_blog = new VitoopBlog();
            $em = $this->getDoctrine()
                       ->getManager();
            $em->persist($vitoop_blog);
            $em->flush();
        } else {
            $vitoop_blog = $vitoop_blog[0];
        }

        $info_vitoop_blog = '';
        $form_vitoop_blog = $this->createForm('vitoop_blog', $vitoop_blog, array(
            'action' => $this->generateUrl('_edit_vitoop_blog'),
            'method' => 'POST'
        ));
        if ($request->isMethod('POST')) {
            $form_vitoop_blog->handleRequest($request);
            if ($form_vitoop_blog->isValid()) {
                $em = $this->getDoctrine()
                           ->getManager();
                $em->persist($vitoop_blog);
                $em->flush();
                $info_vitoop_blog = 'Änderungen wurden erfolgreich gespeichert';
            }
        }

        $fv_vitoop_blog = $form_vitoop_blog->createView();

        return $this->render('VitoopInfomgmtBundle:Resource:edit_vitoop_blog.html.twig', array(
            'fvvitoopblog' => $fv_vitoop_blog,
            'infovitoopblog' => $info_vitoop_blog
        ));
    }

    public function guestAction()
    {

        $vitoop_blog = $this->getDoctrine()
                            ->getRepository('VitoopInfomgmtBundle:VitoopBlog')
                            ->findAll();
        if (empty($vitoop_blog)) {
            // create initial entry on the fly
            $vitoop_blog = new VitoopBlog();
            $em = $this->getDoctrine()
                       ->getManager();
            $em->persist($vitoop_blog);
            $em->flush();
        } else {
            $vitoop_blog = $vitoop_blog[0];
        }

        return $this->render('VitoopInfomgmtBundle:Resource:guest.html.twig', array(
            'vitoopblog' => $vitoop_blog
        ));
    }

    /*
     *
     * RESOURCE Actions
     *
    */

    public function dataAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-data'] = $rdc->getData();
        $content['resource-title'] = $rdc->getTitle();
        $content['resource-buttons'] = $rdc->getButtons();
        $content['resource-metadata'] = $rdc->getMetadata();

        return new Response(json_encode($content));
    }

    public function newAction($res_type)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        // get Data first - when new res is created it will be
        // set per $this->init($res) therefore  title/buttons will return correctly
        $content['resource-data'] = $rdc->newData();
        $content['resource-title'] = $rdc->getTitle();
        $content['resource-buttons'] = $rdc->getButtons();
        // So the newData simulates the Quickviewaction when a new Resource was saved.
        // This is a workaround because there is no redirect on POST implemented.
        if ($rdc->isInitialized()) {
            $content['resource-tag'] = $rdc->getTag();
            $content['resource-rating'] = $rdc->getRating();
        }
        $content['resource-metadata'] = $rdc->getMetadata();

        return new Response(json_encode($content));
    }

    public function tagAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-tag'] = $rdc->getTag();

        return new Response(json_encode($content));
    }

    public function ratingAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-rating'] = $rdc->getRating();

        return new Response(json_encode($content));
    }

    public function quickviewAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-data'] = $rdc->getData();
        $content['resource-title'] = $rdc->getTitle();
        $content['resource-buttons'] = $rdc->getButtons();
        $content['resource-tag'] = $rdc->getTag();
        $content['resource-rating'] = $rdc->getRating();
        $content['resource-flags'] = $rdc->getFlags();
        $content['resource-metadata'] = $rdc->getMetadata();

        if ('' === $content['resource-flags']) {
            unset($content['resource-flags']);
        }

        return new Response(json_encode($content));
    }

    public function remarkAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-remark'] = $rdc->getRemark();

        return new Response(json_encode($content));
    }

    public function remarkPrivateAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-remark_private'] = $rdc->getRemarkPrivate();

        return new Response(json_encode($content));
    }

    public function commentAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-comments'] = $rdc->getComment();

        return new Response(json_encode($content));
    }

    public function lexiconAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-lexicon'] = $rdc->getLexicon();

        return new Response(json_encode($content));
    }

    public function projectAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-project'] = $rdc->getProject();

        return new Response(json_encode($content));
    }

    public function assignmentAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-lexicon'] = $rdc->getLexicon();
        $content['resource-project'] = $rdc->getProject();

        return new Response(json_encode($content));
    }

    public function flagAction($res_type, $res_id, $flag_type)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $rm \Vitoop\InfomgmtBundle\Service\ResourceManager */
        $rm = $this->get('vitoop.resource_manager');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        /* @var $request \Symfony\Component\HttpFoundation\Request */
        $request = $rdc->getRequest();

        $flag_map_for_title = array('delete' => 'löschen', 'blame' => 'an den Administrator melden');
        $flag_map_for_constant = array('delete' => Flag::FLAG_DELETE, 'blame' => Flag::FLAG_BLAME);
        $info_flag = '';
        $flag_title = $res->getResourceName() . ' ' . $flag_map_for_title[$flag_type];
        $flag = new Flag();
        $form_flag = $this->createForm('flag', $flag, array(
            'action' => $this->generateUrl('_xhr_resource_flag', array('res_type' => $res->getResourceType(), 'res_id' => $res->getId(), 'flag_type' => $flag_type)),
            'method' => 'POST'
        ));
        if ($request->isMethod('POST')) {
            $form_flag->handleRequest($request);
            if ($form_flag->isValid()) {
                $flag->setType($flag_map_for_constant[$flag_type]);
                $rm->saveFlag($flag, $res);
                $info_flag = $res->getResourceName() . ' # ' . $res->getId();
                switch ($flag_type) {
                    case 'delete':
                        $info_flag = $info_flag . " erfolgreich zum löschen markiert. Die endgültige Entscheidung liegt beim Administrator.";
                        break;
                    case 'blame':
                        $info_flag = $info_flag . " erfolgreich an den Administrator gemeldet.";
                        break;
                }
            }
        }

        $fv_flag = $form_flag->createView();

        //Show disabled form if flag is set successfully
        if (!empty($info_flag)) {
            foreach ($fv_flag->children as $fv_child) {
                $fv_child->vars = array_replace($fv_child->vars, array(
                    'disabled' => true,
                    'required' => false
                ));
            };
        }

        return $this->render('VitoopInfomgmtBundle:Resource:xhr.form.flag.html.twig', array(
            'flag' => $flag,
            'fvflag' => $fv_flag,
            'infoflag' => $info_flag,
            'flagtitle' => $flag_title
        ));
    }

    public function flagInfoAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        $content['resource-flags'] = $rdc->getFlags();

        return new Response(json_encode($content));
    }
}

