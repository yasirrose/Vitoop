<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\RelResourceResource;

/**
 * @Route("api/rrr")
 */
class RelResourceResourceApiController extends ApiController
{
    /**
     * @Route("/{relID}/coefficient", name="edit_coefficient", methods={"POST"})
     * @ParamConverter("rel", class="Vitoop\InfomgmtBundle\Entity\RelResourceResource", options={"id" = "relID"})
     *
     * @return array
     */
    public function editCoefficient(
        RelResourceResource $rel,
        Request $request
    ) {
        $serializer = $this->get('jms_serializer');
        $coefficient = $serializer->deserialize($request->getContent(), 'array', 'json');
        $coefficient = $coefficient['value'];
        if ($coefficient < 0) {
            $response = array('success' => false, 'message' => 'Coefficient cannot be negative!');
        } else {
            $rel->setCoefficient($coefficient);
            $em = $this->getDoctrine()->getManager();
            $em->persist($rel);
            $em->flush();
            $response = array('success' => true, 'message' => 'Coefficient updated!');
        }

        return $this->getApiResponse($response);
    }
}
