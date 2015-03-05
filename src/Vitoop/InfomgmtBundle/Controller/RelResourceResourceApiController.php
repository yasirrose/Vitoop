<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Entity\Resource;


/**
 * @Route("api/rrr")
 */
class RelResourceResourceApiController extends Controller
{
    /**
     * @Route("/{relID}/coefficient", name="edit_coefficient")
     * @Method({"POST"})
     * @ParamConverter("rel", class="Vitoop\InfomgmtBundle\Entity\RelResourceResource", options={"id" = "relID"})
     *
     * @return array
     */
    public function editCoefficient(RelResourceResource $rel, Request $request)
    {
        $serializer = $this->get('jms_serializer');
        $coefficient = $serializer->deserialize($request->getContent(), 'array', 'json');
        $coefficient = $coefficient['value'];
        if ($coefficient < 0) {
            $response = array('success' => false, 'message' => 'Coefficient cannot be negative!');
        } else {
            $rel->setCoefficient($coefficient);
            $em = $this->getDoctrine()->getManager();
            $em->merge($rel);
            $em->flush();
            $response = array('success' => true, 'message' => 'Coefficient updated!');
        }
        $response = $serializer->serialize($response, 'json');

        return new Response($response);
    }
}

