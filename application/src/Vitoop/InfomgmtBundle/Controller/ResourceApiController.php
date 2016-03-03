<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\Resource;


/**
 * @Route("api/")
 */
class ResourceApiController extends Controller
{
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

