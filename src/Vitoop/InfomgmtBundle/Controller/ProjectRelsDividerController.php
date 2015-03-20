<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\RelProjectUser;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Vitoop\InfomgmtBundle\Entity\Project;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;



/**
 * @Route("api/project/{projectID}/dividers")
 * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
 */
class ProjectRelsDividerController extends Controller
{
    /**
     * @Route("", name="get_dividers")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getDividers(Project $project)
    {
        if (!$project->getProjectData()->availableForReading($this->get('vitoop.vitoop_security')->getUser())) {
            throw new AccessDeniedHttpException;
        }
        $serializer = $this->get('jms_serializer');
        $dividers = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:ProjectRelsDivider')->findBy(array('projectData' => $project->getProjectData()));
        $divResult = array();
        foreach ($dividers as $divider) {
            $divResult["'".$divider->getCoefficient()."'"] = array('id' => $divider->getId(), 'text' => $divider->getText());
        }
        $response = $serializer->serialize($divResult, 'json');

        return new Response($response);
    }

    /**
     * @Route("", name="add_or_edit_divider")
     * @Method({"POST"})
     *
     * @return array
     */
    public function addOrEditDivider(Project $project, Request $request)
    {
        return array();
    }

}