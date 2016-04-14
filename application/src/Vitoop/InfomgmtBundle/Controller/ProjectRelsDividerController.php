<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\ProjectRelsDivider;
use JMS\Serializer\DeserializationContext;
use Vitoop\InfomgmtBundle\Entity\Project;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * @Route("api/project/{projectID}/divider")
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
        if (!$project->getProjectData()->availableForWriting($this->get('vitoop.vitoop_security')->getUser())) {
            throw new AccessDeniedHttpException;
        }
        $em = $this->getDoctrine()->getManager();
        $serializer = $this->get('jms_serializer');
        $serializerContext = DeserializationContext::create()
            ->setGroups(array('edit'));
        $divider = $serializer->deserialize($request->getContent(), 'Vitoop\InfomgmtBundle\Entity\ProjectRelsDivider', 'json', $serializerContext);
        //var_dump($divider);
        $dividerOrigin = $em->getRepository('VitoopInfomgmtBundle:ProjectRelsDivider')->findOneBy(array('projectData' => $project->getProjectData(), 'coefficient' => $divider->getCoefficient()));
        //var_dump($dividerOrigin);
        //exit(0);
        if (is_null($dividerOrigin)) {
            $dividerOrigin = new ProjectRelsDivider();
            $dividerOrigin->setProjectData($project->getProjectData());
            $dividerOrigin->setCoefficient($divider->getCoefficient());
        }
        $dividerOrigin->setText($divider->getText());
        $em->merge($dividerOrigin);
        $em->flush();
        $response = $serializer->serialize(array('success' => true, 'message' => 'Divider updated!'), 'json');

        return new Response($response);
    }

}