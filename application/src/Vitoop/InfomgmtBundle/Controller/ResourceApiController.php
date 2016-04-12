<?php
namespace Vitoop\InfomgmtBundle\Controller;

use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchColumns;
use Vitoop\InfomgmtBundle\DTO\Paging;

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
       $search = new SearchResource(
            new Paging(
                $request->query->get('start', 0),
                $request->query->get('length')
            ),
            new SearchColumns(
                $request->query->get('columns', array()),
                $request->query->get('order', array())
            ),
            $request->query->has('flagged'),
            $request->query->has('resource')?$request->query->getDigits('resource'):null,
            $request->query->get('taglist', array()),
            $request->query->get('taglist_i', array()),
            $request->query->get('taglist_h', array()),
            $request->query->get('tagcnt', 0),
            $request->query->get('search', null)
        );

        $resources = $this->get('vitoop.resource_manager')
            ->getRepository($resType)
            ->getResources($search);
        $total = $this->get('vitoop.resource_manager')
            ->getRepository($resType)
            ->getResourcesTotal($search);
        
        if ($resType == 'prj') {
            $repo = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:Project');
            foreach ($resources as &$resource) {
                $project = $repo->find($resource['id']);
                $resource['canRead'] = $project->getProjectData()->availableForReading($this->getUser());
            }
        }

        return $this->getApiResponse(array(
            'draw' => $request->query->get('draw'),
            'recordsTotal' => $total,
            'recordsFiltered' => $total,
            'data'=> $resources,
        ));
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
        $info = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:Resource')
            ->getResourceTabsInfo($resource, $this->getUser());
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
