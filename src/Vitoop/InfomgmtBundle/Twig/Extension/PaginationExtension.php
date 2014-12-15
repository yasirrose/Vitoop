<?php
namespace Vitoop\InfomgmtBundle\Twig\Extension;

use Vitoop\InfomgmtBundle\Twig\TokenParser\PaginationThemeTokenParser;
use Vitoop\InfomgmtBundle\Twig\TokenParser\PaginationOptionsTokenParser;
use Pagerfanta\Pagerfanta;

use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Bundle\TwigBundle\Loader\FilesystemLoader;
use Symfony\Bundle\FrameworkBundle\Routing\Router;
use Symfony\Component\HttpFoundation\Request;

class PaginationExtension extends \Twig_Extension
{
    protected $environment;

    protected $themes;

    protected $router;

    /**@var $request Request */
    protected $request;

    protected $route;

    public function __construct(Router $router)
    {
        $this->router = $router;
        $this->themes = new \SplObjectStorage();
    }

    /* Request is injected here by DI-Container */
    public function setRequest(Request $request = null)
    {
        $this->request = $request;
    }

    /**
     * {@inheritdoc}
     */
    public function initRuntime(\Twig_Environment $environment)
    {
        $this->environment = $environment;
        $this->environment->getLoader()
                          ->addPath(__DIR__ . '/../Resources/views');
    }

    /**
     * Sets a theme for a given pagination.
     *
     * @param Pagerfanta $pg
     *           A Pagerfanta instance
     * @param $theme_name The
     *           theme-name (e.g. "SomeBundle::my_customized_theme.html.twig")
     */
    public function setTheme($pg, $theme_name)
    {
        $this->themes->attach($pg, $theme_name);
    }

    /**
     * Returns the token parser instance to add to the existing list.
     *
     * @return array An array of Twig_TokenParser instances
     */
    public function getTokenParsers()
    {

        // {% pg_theme pg "SomeBundle::my_customized_theme.html.twig" %}
        // {% pg_options {'pgtemplate' : 'example.html.twig',[...]} %}
        return array(new PaginationThemeTokenParser(), new PaginationOptionsTokenParser());
    }

    public function getName()
    {

        return 'vitoop_infomgmtbundle_twig_pagination_extension';
    }

    public function getFunctions()
    {
        $arr_t_sf_options = array('needs_context' => true, 'is_safe' => array('html'));

        return array(
            new \Twig_SimpleFunction('pg_path', array($this, 'path'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_previous', array($this, 'renderPrevious'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_next', array($this, 'renderNext'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_first', array($this, 'renderFirst'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_last', array($this, 'renderLast'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_proximity', array($this, 'renderProximity'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_current', array($this, 'renderCurrent'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_rowsperpage', array($this, 'renderRowsPerPage'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_totalrows', array($this, 'renderTotalRows'), $arr_t_sf_options),
            new \Twig_SimpleFunction('pg_widget', array($this, 'renderWidget'), $arr_t_sf_options)
        );
    }

    /* for internal use only */
    public function path(array $context, $page = 0, $set_maxperpage = true)
    {
        /* $this->request->attributes gives meta information about the route, controller etc
            [_controller] => Vitoop\InfomgmtBundle\Controller\ResourceController::indexAction
            [res_type] => teli
            [_route] => _resource_list
            [_route_params] => Array
                (
                    [res_type] => teli
                )

        */
        /* @var $pg Pagerfanta */
        $pg = $context['pg'];

        // get the query parameters from the request
        $arr_qs = $this->request->query->all();
        //unset the parameters from request because it is user-input (security reason)
        //they will be reset by values validated and normalized in Resource:list
        unset($arr_qs['page']);
        unset($arr_qs['maxperpage']);

        if (0 != $page) {
            $arr_qs['page'] = $page;
        }

        if ($set_maxperpage) {
            // maxperpage defaults is set in Resource:list
            $arr_qs['maxperpage'] = $pg->getMaxPerPage();
        }

        $path = $this->router->generate($this->request->attributes->get('_route'), array_merge($arr_qs, $this->request->attributes->get('_route_params')), UrlGeneratorInterface::ABSOLUTE_PATH);

        return $path;
    }

    public function renderPrevious(array $context, $pg)
    {

        return $this->render($context, $pg, 'previous');
    }

    public function renderNext(array $context, $pg)
    {

        return $this->render($context, $pg, 'next');
    }

    public function renderFirst(array $context, $pg)
    {

        return $this->render($context, $pg, 'first');
    }

    public function renderLast(array $context, $pg)
    {

        return $this->render($context, $pg, 'last');
    }

    public function renderProximity(array $context, $pg)
    {

        return $this->render($context, $pg, 'proximity');
    }

    public function renderCurrent(array $context, $pg)
    {

        return $this->render($context, $pg, 'current');
    }

    public function renderRowsPerPage(array $context, $pg)
    {

        return $this->render($context, $pg, 'rowsperpage');
    }

    public function renderTotalRows(array $context, $pg)
    {

        return $this->render($context, $pg, 'totalrows');
    }

    public function renderWidget(array $context, $pg)
    {

        return $this->render($context, $pg, 'widget');
    }

    public function render(array $context, $pg, $block)
    {
        $template_name = ($this->themes->offsetExists($pg) ? $this->themes->offsetGet($pg) : 'pg_default.html.twig');
        // @var $template \Twig_Template
        $template = $this->environment->loadTemplate($template_name);
        $context = array_merge($context, array('pg' => $pg, 'pg_block' => 'pg_' . $block));

        return $template->render($context);;
    }
}
