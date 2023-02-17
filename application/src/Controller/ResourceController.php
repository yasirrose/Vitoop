<?php
namespace App\Controller;

use App\DTO\HomeDTO;
use App\DTO\Paging;
use App\DTO\Resource\SearchResource;
use App\DTO\Resource\SearchColumns;
use App\Entity\Comment;
use App\Entity\Conversation;
use App\Entity\Pdf;
use App\Entity\Flag;
use App\Entity\User\UserConfig;
use App\Entity\User\UserData;
use App\Entity\UserHookResource;
use App\Entity\VitoopBlog;
use App\Entity\Resource;
use App\Repository\ResourceRepository;
use App\Repository\UserHookResourceRepository;
use App\Repository\VitoopBlogRepository;
use App\Service\UrlGetter;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\Lexicon;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Symfony\Component\HttpFoundation\Request;
use App\Form\Type\UserDataType;
use App\Form\Type\ProjectDataType;
use App\Form\Type\VitoopBlogType;
use App\Form\Type\FlagType;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use App\Entity\Downloadable\DownloadableInterface;
use App\Repository\FlagRepository;
use App\Service\EmailSender;
use App\Service\LexiconQueryManager;
use App\Service\ResourceDataCollector;
use App\Service\ResourceManager;
use App\Service\VitoopSecurity;

class ResourceController extends ApiController
{
    /**
     * @var EmailSender
     */
    private $emailSender;

    /**
     * @var ResourceRepository
     */
    private $resourceRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * ResourceController constructor.
     * @param EmailSender $emailSender
     * @param ResourceRepository $resourceRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(
        EmailSender $emailSender,
        ResourceRepository $resourceRepository,
        EntityManagerInterface $entityManager
    ) {
        $this->emailSender = $emailSender;
        $this->resourceRepository = $resourceRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/userhome", name="_home")
     * @Route("/project/{project_id}", name="_home_project", requirements={"project_id": "\d+"})
     * @Route("/lexicon/{lexicon_id}", name="_home_lexicon", requirements={"lexicon_id": "\d+"})
     */
    public function homeAction(
        ResourceManager $rm,
        ResourceDataCollector $rdc,
        VitoopSecurity $vsec,
        LexiconQueryManager $lexiconQueryManager,
        Request $request,
        $project_id = 0,
        $lexicon_id = 0
    ) {
        //@TODO: Fat controller - need refactoring
        $tpl_vars = array();

        $dto = new HomeDTO(
            $request->query->get('project', $project_id),
            $request->query->get('lexicon', $lexicon_id),
            $request->query->get('edit', false)
        );
        
        $is_project_home = false;
        $is_lexicon_home = false;

        /* flagged */
        $flagged = $request->query->get('flagged');

        // Decide which home
        $is_user_home = true;
        if ($dto->isNotEmptyProject()) {
            $project = $rm->getProjectWithData($dto->project);
            if (null !== $project) {
                $is_project_home = true;
                $is_user_home = false;
            }
        }
        if ($dto->isNotEmptyLexicon()) {
            $lexicon = $this->entityManager
                ->getRepository(Lexicon::class)
                ->getLexiconWithWikiRedirects($dto->lexicon);
            if (null !== $lexicon) {
                $is_lexicon_home = true;
                $is_user_home = false;
            }
        }

        if ($is_user_home) {
            if ($vsec->isUser()) {
                $user = $vsec->getUser();
                $user_data = $user->getUserData();
                if (null === $user_data) {
                    $user_data = new UserData($user);
                }
                if (null === $user->getUserConfig()) {
                    $user->setUserConfig(new UserConfig($user));
                    $this->entityManager->persist($user);
                    $this->entityManager->flush();
                }
                $info_user_data = '';
                $form_user_data = $this->createForm(UserDataType::class, $user_data, array(
                    'action' => $this->generateUrl('_home'),
                    'method' => 'POST'
                ));
                if ($request->isMethod('POST')) {
                    $form_user_data->handleRequest($request);
                    if ($form_user_data->isValid()) {
                        $this->entityManager->persist($user_data);
                        $this->entityManager->flush();
                        $info_user_data = 'Änderungen wurden erfolgreich gespeichert';
                    }
                }

                if ($flagged) {
                    $tpl_vars['flagged'] = 1;
                }

                $fv_user_data = $form_user_data->createView();

                $tpl_vars = array_merge($tpl_vars, array(
                    'fvuserdata' => $fv_user_data,
                    'infouserdata' => $info_user_data,
                    'user' => $user
                ));
            }
            $home_content_tpl = 'Resource/home.user.html.twig';
        } elseif ($is_project_home) {
            if (!$project->getProjectData()->availableForReading($vsec->getUser())) {
                throw new AccessDeniedHttpException;
            }
            $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($project);
            $show_as_projectowner = $project->getProjectData()->availableForWriting($vsec->getUser());
            if (!$show_as_projectowner) {
                $dto->isEditMode = false;
            }
            if ($dto->isEditMode && $show_as_projectowner) {
                $project_data = $project->getProjectData();
                $info_project_data = '';
                $form_project_data = $this->createForm(ProjectDataType::class, $project_data, array(
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
                'editMode' => $dto->isEditMode,
                'showasprojectowner' => $show_as_projectowner
            ));
            $home_content_tpl = 'Resource/home.project.edit.html.twig';
            if (!$dto->isEditMode) {
                $home_content_tpl = 'Resource/home.project.html.twig';
            }
        } elseif ($is_lexicon_home) {
            $diff = date_diff(new \DateTime(), $lexicon->getUpdated());
            if (($diff->m > 2)||($diff->y > 0)) {
                $description = $lexiconQueryManager->getDescriptionFromWikiApi($lexicon->getName());
                if (!array_key_exists(-1, $description)) {
                    $lexicon->setDescription($description[$lexicon->getWikiPageId()]['extract']);
                    $lexicon->setUpdated(new \DateTime());
                    $this->entityManager->persist($lexicon);
                    $this->entityManager->flush();
                }
            }
            $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($lexicon);
            $tpl_vars = array_merge($tpl_vars, array(
                'lexicon' => $lexicon,
                'resourceInfo' => $resourceInfo
            ));
            $rdc->prepare('lex', $request);
            $rdc->init($lexicon);
            $lexiconsPart = $rdc->getLexicon(true);
            $tpl_vars['lexicons'] = $lexiconsPart;

            $home_content_tpl = 'Resource/home.lexicon.html.twig';
        }

        $home_tpl = $home_content_tpl;
        if (!$request->isXmlHttpRequest()) {
            $home_tpl = 'Resource/home.html.twig';
            $tpl_vars['homecontenttpl'] = $home_content_tpl;
        }

        return $this->render($home_tpl, $tpl_vars);
    }

    /**
     * @Route("/{res_type}/", name="_resource_list", requirements={"res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function listAction(ResourceManager $rm, VitoopSecurity $vsec, Request $request, $res_type)
    {
        $user = $vsec->getUser();
        $block_content_tpl = 'Resource/table.resource.html.twig';

        $url = $this->generateUrl('api_resource_list', array('resType' => $res_type));

        $search = new SearchResource(
            new Paging(1, 1),
            new SearchColumns([]),
            $this->getUser(),
            $request->query->get('flagged'),
            null,
            $request->query->get('taglist', []),
            $request->query->get('taglist_i', []),
            $request->query->get('taglist_h', []),
            $request->query->get('tagcnt', 0)
        );
        
        $mode_search_by_tags = false;
        $mode_filter_by_project_id = false;
        $mode_filter_by_lexicon_id = false;
        $mode_normal = false;
        $isEditMode = false;

        $project_id = $request->query->get('project');
        $lexicon_id = $request->query->get('lexicon');
        
        if (($request->query->has('edit')) && ($request->query->get('edit') == 1)) {
            $isEditMode = true;
        }

        if (!empty($search->tags) && is_array($search->tags)) {
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
                'taglist' => array_diff($search->tags, $search->highlightTags),
                'taglist_for_links' => $search->tags,
                'taglist_h' => $search->highlightTags,
                'taglist_i' => $search->ignoredTags
            ));

            $tpl_vars = array_merge($tpl_vars, array(
                'tagcnt' => $search->countTags,
                'resourceInfo' => $this->resourceRepository->getCountByTags($search)
            ));
        } elseif ($mode_filter_by_project_id) {
            $url .= '?resource='.$project_id;
            $tpl_vars = array_merge($tpl_vars, array('isCoef' => true, 'isEdit' => $isEditMode));
        } elseif ($mode_filter_by_lexicon_id) {
            $url .= '?resource='.$lexicon_id;
        } elseif ($mode_normal) {
            if ($search->flagged) {
                $url .= '?flagged=1';
                $tpl_vars = array_merge($tpl_vars, array(
                    'flagged' => 1
                ));
            }
        }

        $tpl_vars = array_merge($tpl_vars, array('ajaxUrl' => $url));

        if ($request->isXmlHttpRequest()) {
            $list_tpl = $block_content_tpl;
        } else {
            $list_tpl = 'Resource/list.html.twig';
            $tpl_vars = array_merge($tpl_vars, array('blockcontenttpl' => $block_content_tpl));
        }

        return $this->render($list_tpl, $tpl_vars);
    }

    /**
     * @Route("/resources/{resource}", name="_resource_edit")
     */
    public function editAction(Request $request, Resource $resource)
    {
        return $this->render(
            'Resource/list.html.twig',
            [
                'restype' => $resource->getResourceType(),
                'resname' => $resource->getResourceName(),
                'user' => $this->getUser(),
                'blockcontenttpl' => 'Resource/table.resource.html.twig',
                'ajaxUrl' => $this->generateUrl(
                    'api_resource_list', ['resType' => $resource->getResourceType()]
                ),
                'resourceId' => $resource->getId()
            ]
        );
    }

    /**
     * @deprecated
     * @Route("/edit-vitoop-blog", name="_edit_vitoop_blog")
     */
    public function editVitoopBlogAction(VitoopSecurity $vsec, Request $request, VitoopBlogRepository $blogRepository)
    {
        if (!$vsec->isAdmin()) {
            throw new AccessDeniedException();
        }

        $vitoop_blog = $blogRepository->findAll();
        if (empty($vitoop_blog)) {
            // create initial entry on the fly
            $vitoop_blog = new VitoopBlog();
            $blogRepository->save($vitoop_blog);
        } else {
            $vitoop_blog = $vitoop_blog[0];
        }

        $info_vitoop_blog = '';
        $form_vitoop_blog = $this->createForm(VitoopBlogType::class, $vitoop_blog, array(
            'action' => $this->generateUrl('_edit_vitoop_blog'),
            'method' => 'POST'
        ));
        if ($request->isMethod('POST')) {
            $form_vitoop_blog->handleRequest($request);
            if ($form_vitoop_blog->isValid()) {
                $blogRepository->save($vitoop_blog);
                $info_vitoop_blog = 'Änderungen wurden erfolgreich gespeichert';
            }
        }

        $fv_vitoop_blog = $form_vitoop_blog->createView();

        return $this->render('Resource/edit_vitoop_blog.html.twig', array(
            'fvvitoopblog' => $fv_vitoop_blog,
            'infovitoopblog' => $info_vitoop_blog
        ));
    }

    /**
     * @deprecated use VitoopBlogController
     * @Route("/", name="_base_url")
     */
    public function guestAction(VitoopBlogRepository $blogRepository)
    {
        $vitoop_blog = $blogRepository->findAll();
        if (empty($vitoop_blog)) {
            // create initial entry on the fly
            $vitoop_blog = new VitoopBlog();
            $blogRepository->save($vitoop_blog);
        } else {
            $vitoop_blog = $vitoop_blog[0];
        }

        return $this->render('Resource/guest.html.twig', array(
            'vitoopblog' => $vitoop_blog
        ));
    }

    /**
     * @Route("/{res_type}/{res_id}/data", name="_xhr_resource_data", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function dataAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-data'] = $rdc->getData();
        $content['resource-title'] = $rdc->getTitle();
        $content['resource-buttons'] = $rdc->getButtons();
        $content['resource-metadata'] = $rdc->getMetadata();

        return new JsonResponse($content);
    }

    /**
     * @Route("/{res_type}/new", name="_xhr_resource_new", requirements={"res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function newAction(ResourceDataCollector $rdc, $res_type)
    {
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

        return $this->getApiResponse($content);
    }

    /**
     * @Route("/{res_type}/{res_id}/tags", name="_xhr_resource_tags", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function tagAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse(array(
            'resource-tag' => $rdc->getTag()
        ));
    }

    /**
     * @Route("/{res_type}/{res_id}/rating", name="_xhr_resource_rating", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function ratingAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-rating'] = $rdc->getRating();

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/quickview", name="_xhr_resource_quickview", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function quickviewAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-data'] = $rdc->getData();
        $content['resource-title'] = $rdc->getTitle();
        $content['resource-buttons'] = $rdc->getButtons();
        $content['resource-tag'] = $rdc->getTag();
        $content['resource-rating'] = $rdc->getRating();
        $content['resource-flags'] = $rdc->getFlags();
        $content['resource-metadata'] = $rdc->getMetadata();
        $content['tabs-info'] = $this->resourceRepository->getResourceTabsInfo($res, $this->getUser());
        
        if ('' === $content['resource-flags']) {
            unset($content['resource-flags']);
        }

        return new JsonResponse($content);
    }

    /**
     * @Route("/resources/{id}/quickview", name="_xhr_resource_proxy_quickview", requirements={"id": "\d+"})
     */
    public function resourceQuickView(Resource $resource)
    {
        return $this->forward(
            ResourceController::class.'::quickviewAction',
            ['res_type' => $resource->getResourceType(), 'res_id' => $resource->getId()]
        );
    }

    /**
     * @Route("/{res_type}/{res_id}/remark", name="_xhr_resource_remark", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function remarkAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-title'] = $rdc->getTitle();
        $content['resource-remark'] = $rdc->getRemark();

        return new JsonResponse($content);
    }

    /**
     * @Route("/{res_type}/{res_id}/remark_private", name="_xhr_resource_remark_private", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function remarkPrivateAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        $content['resource-title'] = $rdc->getTitle();
        $content['resource-remark_private'] = $rdc->getRemarkPrivate();

        return new Response(json_encode($content));
    }

    /**
     * @Route("/{res_type}/{res_id}/comments", name="_xhr_resource_comments", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function commentAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse(array(
            'resource-comments' => $rdc->getComment(),
            'resource-title' => $rdc->getTitle(),
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
     *      },
     *     methods={"PATCH"}
     * )
     */
    public function removeCommentAction(VitoopSecurity $vsec, Comment $comment, $resType, $resId, Request $request)
    {
        if (!$vsec->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $dto = $this->getDTOFromRequest($request);
        $comment->changeVisibity($dto->isVisible);
        $this->entityManager->flush();

        return $this->getApiResponse($comment);
    }


    /**
     * @Route("/{res_type}/{res_id}/lexicons", name="_xhr_resource_lexicons", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     * @Route("/{res_type}/{res_id}/lexicons/{isLexiconHome}", name="_xhr_resource_lexicons_lexicon", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation", "isLexiconHome": "1"})
     */
    public function lexiconAction(ResourceDataCollector $rdc, $res_type, $res_id, $isLexiconHome = false)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse([
            'resource-lexicon' => $rdc->getLexicon($isLexiconHome),
            'resource-title' => $rdc->getTitle(),
        ]);
    }

    /**
     * @Route("/{res_type}/{res_id}/projects", name="_xhr_resource_projects", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function projectAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse([
            'resource-project' => $rdc->getProject(),
            'resource-title' => $rdc->getTitle(),
        ]);
    }

    /**
     * @Route("/{res_type}/{res_id}/assignments", name="_xhr_resource_assignments", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function assignmentAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        return $this->getApiResponse([
            'resource-lexicon' => $rdc->getLexicon(),
            'resource-project' => $rdc->getProject(),
            'resource-title' => $rdc->getTitle(),
        ]);
    }

    /**
     * @Route("/{res_type}/{res_id}/flag/{flag_type}", name="_xhr_resource_flag", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation", "flag_type": "delete|blame"})
     */
    public function flagAction(
        ResourceDataCollector $rdc,
        ResourceManager $rm,
        FlagRepository $flagRepository,
        Request $request,
        $res_type,
        $res_id,
        $flag_type
    ) {
        /* @var $res \App\Entity\Resource */
        $res = $rdc->getResource();

        $flag_map_for_title = array('delete' => 'löschen', 'blame' => 'an den Administrator melden');
        $flagMapForConstant = ['delete' => Flag::FLAG_DELETE, 'blame' => Flag::FLAG_BLAME];
        $info_flag = '';
        $flag_title = $res->getResourceName() . ' ' . $flag_map_for_title[$flag_type];

        $flag = $flagRepository->findResourceFlagByUserAndType($res, $this->getUser()->getId(), $flagMapForConstant[$flag_type]);
        if (null === $flag) {
            $flag = new Flag();
        }

        $form_flag = $this->createForm(FlagType::class, $flag, array(
            'action' => $this->generateUrl('_xhr_resource_flag', array('res_type' => $res->getResourceType(), 'res_id' => $res->getId(), 'flag_type' => $flag_type)),
            'method' => 'POST'
        ));
        if ($request->isMethod('POST')) {
            $form_flag->handleRequest($request);
            if ($form_flag->isValid()) {
                $flag->setType($flagMapForConstant[$flag_type]);
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

                $this->emailSender->sendChangeFlagNotification($res, $flag_type, $flag);
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

        return $this->render('Resource/xhr.form.flag.html.twig', array(
            'flag' => $flag,
            'fvflag' => $fv_flag,
            'infoflag' => $info_flag,
            'flagtitle' => $flag_title
        ));
    }

    /**
     * @Route("/{res_type}/{res_id}/flaginfo", name="_xhr_resource_flaginfo", requirements={"res_id": "\d+", "res_type": "pdf|adr|link|teli|lex|prj|book|conversation"})
     */
    public function flagInfoAction(ResourceDataCollector $rdc, $res_type, $res_id)
    {
        return $this->getApiResponse([
            'resource-flags' => $rdc->getFlags()
        ]);
    }

    /**
     * @Route("/{resType}/{resId}/user-hooks", name="_xhr_resource_user_hook", requirements={"resId": "\d+", "resType": "pdf|adr|link|teli|lex|prj|book|conversation"}, methods={"POST"})
     */
    public function userHookAction(string $resType, int $resId, Request $request)
    {
        $resource = $this->entityManager->getRepository(
                Resource\ResourceType::getClassByResourceType($resType)
            )->find($resId);
        if (!$resource) {
            $this->createNotFoundException();
        }
        
        $dto = $this->getDTOFromRequest($request);
        $resourceDTO = new \App\DTO\Resource\ResourceDTO();
        $resourceDTO->user = $this->getUser();
        $resourceDTO->isUserHook = $dto->isUserHook;
        $resourceDTO->selectedColor = $dto->sessionColor;

        $resource->updateUserHook($resourceDTO);
        $this->entityManager->persist($resource);
        $this->entityManager->flush();

        return $this->getApiResponse([]);
    }

    /**
     * @Route("/{resType}/{resId}/user-reads", name="_xhr_resource_user_read", requirements={"resId": "\d+", "resType": "pdf|adr|link|teli|lex|prj|book|conversation"}, methods={"POST"})
     */
    public function userReadsAction(Request $request, $resType, $resId)
    {
        $resource = $this->entityManager->getRepository(
            Resource\ResourceType::getClassByResourceType($resType)
        )->find($resId);
        if (!$resource) {
            $this->createNotFoundException();
        }

        $dto = $this->getDTOFromRequest($request);
        $resourceDTO = new \App\DTO\Resource\ResourceDTO();
        $resourceDTO->user = $this->getUser();
        $resourceDTO->isUserRead = $dto->isUserRead;

        $resource->updateUserRead($resourceDTO);
        $this->entityManager->persist($resource);
        $this->entityManager->flush();

        return $this->getApiResponse([]);
    }

    /**
     * @Route("resources/{id}/meta", methods={"GET"})
     */
    public function metaAction(Pdf $resource)
    {
        return new JsonResponse([
            'id' => $resource->getId(),
            'url' => $resource->getUrl()
        ]);
    }

    /**
     * @Route("resource-files/{id}.pdf", methods={"GET"})
     */
    public function pdfAction(Resource $resource, UrlGetter $urlGetter, Request $request)
    {
        if (!($resource instanceof DownloadableInterface)) {
            throw $this->createNotFoundException();
        }
        $pdfUrl = $resource->getUrl();
        if ('true' === $request->get('local', false)) {
            $pdfUrl = $urlGetter->getLocalUrl($resource);
        }

        return new \App\Response\PDFResponse(
            $resource->getId() . '.pdf',
            $urlGetter->getBinaryContentFromUrl($pdfUrl)
        );
    }

    /**
     * @Route("/conversation/{conversationId}", methods={"GET"})
     * @ParamConverter("conversation", class="App\Entity\Conversation", options={"id" = "conversationId"})
     * @param Conversation $conversation
     * @return object
     */
    public function getConversation(Conversation $conversation)
    {
        $data = [
            'name' => $conversation->getName(),
            'description' => $conversation->getDescription(),
        ];

        return $this->render('Resource/home.html.twig', $data);
    }

    /**
     * @Route("/{resType}/{resId}/update-resource", name="_xhr_update_user_resource")
     * @param Request $request
     * @param $resId
     * @param UserHookResourceRepository $userHookResourceRepository
     * @return JsonResponse
     * @throws Exception
     */
    public function updateResource(Request $request, $resId, UserHookResourceRepository $userHookResourceRepository): JsonResponse
    {
        $resource = $userHookResourceRepository->findOneBy(['resource' => $resId, 'user' => $this->getUser()]);
        if (empty($resource)) {
            return new JsonResponse(['success' => false]);
        }
        try {
            $color = $request->query->get('color');
            if($userHookResourceRepository->checkCorrectColor($color)) {
                $resource->updateColor($color);
            }
            else {
                return new JsonResponse(['success' => false]);
            }
            $userHookResourceRepository->save($resource);
            return new JsonResponse(['success' => true]);
        } catch (Exception $e) {
            throw new Exception($e);
        }
    }

    /**
     * @Route("/{resType}/{resId}/language", name="_xhr_resource_language")
     * @param $resId
     * @return JsonResponse
     * @throws Exception
     */
    public function languageAction($resId): JsonResponse
    {
        try {
            $language = null;
            if ($resId !== "new") {
                $resource = $this->resourceRepository->find($resId);
                if (empty($resource)) {
                    return new JsonResponse(['success' => false]);
                }
                $language = $resource->getLang()->getName();
            }
            return new JsonResponse([
                'langName' => $language,
                'success' => true
            ]);
        } catch (Exception $e) {
            throw new Exception($e);
        }
    }

    /**
     * @Route("/{resId}/lexicon-exist", name="_xhr_resource_lexicon")
     * @param Request $request
     * @param $resId
     * @return JsonResponse
     * @throws Exception
     */
    public function checkLexiconExistAction($resId, Request $request, ResourceDataCollector $rdc): JsonResponse
    {
        $dto = $this->getDTOFromRequest($request);
        if (empty($dto->lexicon_name)) {
            return new JsonResponse(['success' => false]);
        }
        try {
            $resource = $this->resourceRepository->findOneBy(array('name' => $dto->lexicon_name));
            if ($resource) {
                if (!empty($resource->getName())) {
                    return new JsonResponse(['success' => true]);
                }
            } else {
                $lax_details = $rdc->getLexiconDescription($dto->lexicon_name);
                return new JsonResponse(['success' => false, 'description' => $lax_details['description'], 'lexicon_footer' => $lax_details['footer']]);
            }
        } catch (Exception $e) {
            throw new Exception($e);
        }
    }

}
