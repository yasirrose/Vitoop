<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Component\HttpKernel\KernelEvents;
use Vitoop\InfomgmtBundle\Entity\Comment;
use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Entity\UserConfig;
use Vitoop\InfomgmtBundle\Entity\UserData;
use Vitoop\InfomgmtBundle\Entity\VitoopBlog;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Exception;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class ResourceController extends ApiController
{
    /**
     * @Route("/userhome", name="_home")
     * @Route("/project/{project_id}", name="_home_project", requirements={"project_id": "\d+"})
     * @Route("/lexicon/{lexicon_id}", name="_home_lexicon", requirements={"lexicon_id": "\d+"})
     */
    public function homeAction($project_id = 0, $lexicon_id = 0)
    {
        //@TODO: Fat controller - need refactoring
        $rm = $this->get('vitoop.resource_manager');
        $em = $this->getDoctrine()->getManager();
        $request = $this->getRequest();
        $tpl_vars = array();

        $is_user_home = false;
        $is_project_home = false;
        $is_lexicon_home = false;
        $isEditMode = false;

        /* Project Home */
        if ($request->query->has('project')) {
            $project_id = $request->query->get('project');
        }

        if (($request->query->has('edit')) && ($request->query->get('edit') == 1)) {
            $isEditMode = true;
        }

        /* Lexicon Home */
        if ($request->query->has('lexicon')) {
            $lexicon_id = $request->query->get('lexicon');
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
                if (is_null($user->getUserConfig())) {
                    $user->setUserConfig(new UserConfig($user));
                    $em->merge($user);
                    $em->flush();
                }
                $info_user_data = '';
                $form_user_data = $this->createForm('user_data', $user_data, array(
                    'action' => $this->generateUrl('_home'),
                    'method' => 'POST'
                ));
                if ($request->isMethod('POST')) {
                    $form_user_data->handleRequest($request);
                    if ($form_user_data->isValid()) {
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
            $vsec = $this->get('vitoop.vitoop_security');
            if (!$project->getProjectData()->availableForReading($vsec->getUser())) {
                throw new AccessDeniedHttpException;
            }
            $resourceInfo = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:Resource')->getCountOfRelatedResources($project);
            $show_as_projectowner = $project->getProjectData()->availableForWriting($vsec->getUser());
            if (!$show_as_projectowner) {
                $isEditMode = false;
            }
            if ($isEditMode && $show_as_projectowner) {
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
            $tpl_vars = array_merge($tpl_vars, array(
                'project' => $project,
                'resourceInfo' => $resourceInfo,
                'editMode' => $isEditMode,
                'showasprojectowner' => $show_as_projectowner
            ));
            if (!$isEditMode) {
                $home_content_tpl = 'VitoopInfomgmtBundle:Resource:home.project.html.twig';
            } else {
                $home_content_tpl = 'VitoopInfomgmtBundle:Resource:home.project.edit.html.twig';
            }
        } elseif ($is_lexicon_home) {
            $diff = date_diff(new \DateTime(), $lexicon->getUpdated());
            if (($diff->m > 2)||($diff->y > 0)) {
                $description = $this->get('vitoop.lexicon_query_manager')->getDescriptionFromWikiApi($lexicon->getName());
                if (!array_key_exists(-1, $description)) {
                    $lexicon->setDescription($description[$lexicon->getWikiPageId()]['extract']);
                    $lexicon->setUpdated(new \DateTime());
                    $lexicon = $em->merge($lexicon);
                    $em->flush();
                }
            }
            $resourceInfo = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:Resource')->getCountOfRelatedResources($lexicon);
            $tpl_vars = array_merge($tpl_vars, array(
                'lexicon' => $lexicon,
                'resourceInfo' => $resourceInfo
            ));
            $rdc = $this->get('vitoop.resource_data_collector');
            $rdc->prepare('lex', $request);
            $rdc->init($lexicon);
            $lexiconsPart = $rdc->getLexicon(true);
            $tpl_vars = array_merge($tpl_vars, array('lexicons' => $lexiconsPart));

            $home_content_tpl = 'VitoopInfomgmtBundle:Resource:home.lexicon.html.twig';
        }

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

    /**
     * @Route("/{res_type}/", name="_resource_list", requirements={"res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function listAction($res_type)
    {
        $rm = $this->get('vitoop.resource_manager');
        $request = $this->getRequest();
        $user = $this->get('vitoop.vitoop_security')->getUser();
        $block_content_tpl = 'VitoopInfomgmtBundle:Resource:table.resource.html.twig';

        $url = $this->generateUrl('api_resource_list', array('resType' => $res_type));

        $mode_search_by_tags = false;
        $mode_filter_by_project_id = false;
        $mode_filter_by_lexicon_id = false;
        $mode_normal = false;
        $isEditMode = false;

        $project_id = $request->query->get('project');
        $lexicon_id = $request->query->get('lexicon');
        $flagged = $request->query->get('flagged');
        $tag_list = $request->query->get('taglist');
        $tag_list_ignore = $request->query->get('taglist_i');
        $tag_list_highlight = $request->query->get('taglist_h');
        $tag_cnt = $request->query->get('tagcnt');

        $tag_list_ignore = (is_null($tag_list_ignore))?(array()):($tag_list_ignore);
        $tag_list_highlight = (is_null($tag_list_highlight))?(array()):($tag_list_highlight);

        if (($request->query->has('edit')) && ($request->query->get('edit') == 1)) {
            $isEditMode = true;
        }

        if (!empty($tag_list) && is_array($tag_list)) {
            $mode_search_by_tags = true;
        } elseif (null !== $project_id) {
            $mode_filter_by_project_id = true;
         } elseif (null !== $lexicon_id) {
            $mode_filter_by_lexicon_id = true;
        } else {
            $mode_normal = true;
        }

        $tpl_vars = array(
            'restype' => $res_type,
            'resname' => $rm->getResourceName($res_type),
            'user' => $user
        );

        if ($mode_search_by_tags) {
            $url .= '?'.htmlspecialchars_decode($request->server->get('QUERY_STRING'));

            $tpl_vars = array_merge($tpl_vars, array(
                'taglist' => array_diff($tag_list, $tag_list_highlight),
                'taglist_for_links' => $tag_list,
                'taglist_h' => $tag_list_highlight,
                'taglist_i' => $tag_list_ignore
            ));

            $tag_cnt = intval($tag_cnt);
            $tpl_vars = array_merge($tpl_vars, array(
                'tagcnt' => $tag_cnt
            ));
        } elseif ($mode_filter_by_project_id) {
            $url .= '?resource='.$project_id;
            $tpl_vars = array_merge($tpl_vars, array('isCoef' => true, 'isEdit' => $isEditMode));
        } elseif ($mode_filter_by_lexicon_id) {
            $url .= '?resource='.$lexicon_id;
        } elseif ($mode_normal) {
            if ($flagged) {
                $url .= '?flagged=1';
                $tpl_vars = array_merge($tpl_vars, array(
                    'flagged' => 1
                ));
            }
        }

        $tpl_vars = array_merge($tpl_vars, array('ajaxUrl' => $url));

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

    /**
     * @Route("/edit-vitoop-blog", name="_edit_vitoop_blog")
     */
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

    /**
     * @Route("/", name="_base_url")
     */
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

    /**
     * @Route("/{res_type}/{res_id}/data", name="_xhr_resource_data", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
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

    /**
     * @Route("/{res_type}/new", name="_xhr_resource_new", requirements={"res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
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

    /**
     * @Route("/{res_type}/{res_id}/tags", name="_xhr_resource_tags", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function tagAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse(array(
            'resource-tag' => $rdc->getTag()
        ));
    }

    /**
     * @Route("/{res_type}/{res_id}/rating", name="_xhr_resource_rating", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function ratingAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-rating'] = $rdc->getRating();

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/quickview", name="_xhr_resource_quickview", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
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

    /**
     * @Route("/{res_type}/{res_id}/remark", name="_xhr_resource_remark", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function remarkAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-remark'] = $rdc->getRemark();

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/remark_private", name="_xhr_resource_remark_private", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function remarkPrivateAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-remark_private'] = $rdc->getRemarkPrivate();

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/comments", name="_xhr_resource_comments", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function commentAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse(array(
            'resource-comments' => $rdc->getComment()
        ));
    }

    /**
     * @Route(
     *      "/{resType}/{resId}/comments/{comment}",
     *      name="_xhr_resource_comments_hide",
     *      requirements={
     *          "res_id": "\d+",
     *          "res_type": "pdf|adr|link|teli|lex|prj|book",
     *          "comment": "\d+"
     *      }
     * )
     * @Method({"PATCH"})
     */
    public function removeCommentAction(Comment $comment, $resType, $resId)
    {
        if (!$this->get('vitoop.vitoop_security')->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $dto = $this->getDTOFromRequest();
        $comment->changeVisibity($dto->isVisible);
        $this->getDoctrine()->getManager()->flush();

        return $this->getApiResponse($comment);
    }


    /**
     * @Route("/{res_type}/{res_id}/lexicons", name="_xhr_resource_lexicons", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     * @Route("/{res_type}/{res_id}/lexicons/{isLexiconHome}", name="_xhr_resource_lexicons_lexicon", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book", "isLexiconHome": "1"})
     */
    public function lexiconAction($res_type, $res_id, $isLexiconHome = false)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-lexicon'] = $rdc->getLexicon($isLexiconHome);

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/projects", name="_xhr_resource_projects", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function projectAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        /* @var $res \Vitoop\InfomgmtBundle\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-project'] = $rdc->getProject();

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/assignments", name="_xhr_resource_assignments", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
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

    /**
     * @Route("/{res_type}/{res_id}/flag/{flag_type}", name="_xhr_resource_flag", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book", "flag_type": "delete|blame"})
     */
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

    /**
     * @Route("/{res_type}/{res_id}/flaginfo", name="_xhr_resource_flaginfo", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function flagInfoAction($res_type, $res_id)
    {
        /* @var $rdc \Vitoop\InfomgmtBundle\Service\ResourceDataCollector */
        $rdc = $this->get('vitoop.resource_data_collector');

        $content['resource-flags'] = $rdc->getFlags();

        return new Response(json_encode($content));
    }
}
