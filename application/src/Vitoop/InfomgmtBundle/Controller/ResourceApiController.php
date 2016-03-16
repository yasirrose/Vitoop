<?php
namespace Vitoop\InfomgmtBundle\Controller;

use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\Resource;

/**
 * @Route("api/")
 */
class ResourceApiController extends ApiController
{
    /**
     * @Route("resource/{resType}", name="api_resource_list", requirements={"resType": "pdf|adr|link|teli|lex|prj|book"})
     * @Method({"GET"})
     *
     * @return array
     */
    public function listAction($resType, Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $context = new SerializationContext();
        $context->setSerializeNull(true);
        $resource = null;
        $flagged = false;
        $tag_list = array();
        $tag_list_ignore = array();
        $tag_list_highlight = array();
        $tag_cnt = 0;
        if ($request->query->has('resource')) {
            $resource = $request->query->getDigits('resource');
        }
        if ($request->query->has('flagged')) {
            $flagged = true;
        }

        if ($request->query->has('taglist')) {
            $tag_list = $request->query->get('taglist');
            $tag_list_ignore = $request->query->get('taglist_i');
            $tag_list_highlight = $request->query->get('taglist_h');
            $tag_cnt = $request->query->get('tagcnt');
            $tag_list_ignore = (is_null($tag_list_ignore))?(array()):($tag_list_ignore);
            $tag_list_highlight = (is_null($tag_list_highlight))?(array()):($tag_list_highlight);

        }

        $resources = $this->get('vitoop.resource_manager')->getRepository($resType)->getResources($flagged, $resource, $tag_list, $tag_list_ignore, $tag_list_highlight, $tag_cnt);
        if ($resType == 'prj') {
            $repo = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:Project');
            foreach ($resources as &$resource) {
                $project = $repo->find($resource['id']);
                $resource['canRead'] = $project->getProjectData()->availableForReading($this->getUser());
            }
        }
        $resources['data'] = $resources;
        $response = $serializer->serialize($resources, 'json', $context);

        return new Response($response);

    }

    /**
     * @Route("resource/{resourceID}/tabs_info", name="get_resource_tabs_info")
     * @Method({"GET"})
     * @ParamConverter("resource", class="Vitoop\InfomgmtBundle\Entity\Resource", options={"id" = "resourceID"})
     *
     * @return array
     */
    public function getTabsInfo(Resource $resource)
    {
        $serializer = $this->get('jms_serializer');
        $info = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:Resource')->getResourceTabsInfo($resource, $this->get('security.context')->getToken()->getUser());
        $response = $serializer->serialize($info, 'json');

        return new Response($response);
    }

    /**
     * @Route("{resource_type}/url/check",
     * requirements={"resource_type"="pdf|link|teli"},
     * name="check_unique_url")
     * @Method({"POST"})
     *
     * @return array
     */
    public function checkUniqueUrlAction($resource_type, Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $url = $serializer->deserialize(
            $request->getContent(),
            'array',
            'json'
        );
        $url = $url['url'];
        if ((strpos($url, 'http://') === false)&&(strpos($url, 'ftp://') === false)) {
            $url = 'http://'.$url;
        }
        $result = $this->getDoctrine()
            ->getManager()
            ->getRepository('VitoopInfomgmtBundle:'.ucfirst($resource_type))
            ->findOneBy(
                array(
                    'url' => $url
                )
            );
        $response = $serializer->serialize(
            array('success' => true,
                'unique' => (is_null($result)),
                'id' => ((is_null($result))?(null):($result->getId())),
                'title' => ((is_null($result))?(null):($result->getName()))
            ),
            'json'
        );

        return new Response($response);
    }
}
