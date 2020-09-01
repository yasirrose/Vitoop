<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Service\ProjectDividerChanger;

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
        Request $request,
        ProjectDividerChanger $projectDividerChanger
    ) {
        $serializer = $this->get('jms_serializer');
        $coefficient = $serializer->deserialize($request->getContent(), 'array', 'json');
        $coefficient = $coefficient['value'];
        if ($coefficient < 0) {
            $response = array('success' => false, 'message' => 'Coefficient cannot be negative!');
        } else {
            if (false === strpos($coefficient, '.')) {
                $project = null;
                if ($rel->getResource1() instanceof Project) {
                    $project = $rel->getResource1();
                }
                if (null === $project && $rel->getResource2() instanceof Project) {
                    $project = $rel->getResource2();
                }
                if ($project) {
                    $projectDividerChanger->removeDividerWithoutRelatedRecords(
                        $project->getId(),
                        $project->getProjectData()->getId(),
                        $coefficient
                    );

                    $projectDividerChanger->changeRelatedCoefficients(
                        $rel->getResource1()->getId(),
                        $rel->getCoefficient(),
                        $coefficient
                    );
                }
            }

            $rel->setCoefficient($coefficient);
            $em = $this->getDoctrine()->getManager();
            $em->persist($rel);
            $em->flush();
            $response = array('success' => true, 'message' => 'Coefficient updated!');
        }

        return $this->getApiResponse($response);
    }
}
