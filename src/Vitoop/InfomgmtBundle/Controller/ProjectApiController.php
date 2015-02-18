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
 * @Route("api/project/{projectID}")
 * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
 */
class ProjectApiController extends Controller
{
    /**
     * @Route("", name="get_project_api")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getProject(Project $project)
    {
        if ($project->getProjectData()->availableForWriting($this->get('security.context')->getToken()->getUser())) {
            $serializer = $this->get('jms_serializer');
            $serializerContext = SerializationContext::create()
                ->setGroups(array('get_project'));
            $response = $serializer->serialize(
                $project,
                'json',
                $serializerContext
            );
        } else {
            throw new AccessDeniedHttpException;
        }

        return new Response($response);

    }

    /**
     * @Route("", name="save_project_api")
     * @Method({"POST"})
     *
     * @return array
     */
    public function saveProject(Project $project, Request $request)
    {
        if ($project->getProjectData()->availableForWriting($this->get('security.context')->getToken()->getUser())) {
            $serializer = $this->get('jms_serializer');
            $em = $this->getDoctrine()->getManager();
            $serializerContext = DeserializationContext::create()
                ->setGroups(array('get_project'));
            $updatedProject = $serializer->deserialize(
                $request->getContent(),
                'Vitoop\InfomgmtBundle\Entity\Project',
                'json',
                $serializerContext
            );
            $project = $em->getRepository('VitoopInfomgmtBundle:Project')->find($updatedProject->getId());
            if (is_null($project)) {
                $response = array('status' => 'error', 'message' => 'Project is not found');
            } else {
                $project->setProjectData($updatedProject->getProjectData());
                $em->merge($project);
                $em->flush();
                $response = array('status' => 'success', 'message' => 'Project saved!');
            }
        } else {
            throw new AccessDeniedHttpException;
        }

        $response = $serializer->serialize($response, 'json');
        return new Response($response);

    }

    /**
     * @Route("/user", name="add_user_to_project")
     * @Method({"POST"})
     *
     * @return array
     */
    public function addUserToProject(Project $project, Request $request)
    {
        $currentUser = $this->get('vitoop.vitoop_security')->getUser();
        if (!$project->getProjectData()->availableForWriting($currentUser)) {
            throw new AccessDeniedHttpException;
        }
        $response = null;
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $serializerContext = DeserializationContext::create()
            ->setGroups(array('get_project'));
        $user = $serializer->deserialize(
            $request->getContent(),
            'Vitoop\InfomgmtBundle\Entity\User',
            'json',
            $serializerContext
        );
        $user = $em->getRepository('VitoopInfomgmtBundle:User')->find($user->getId());
        if (is_null($user)) {
            $response = array('status' => 'error', 'message' => 'User is not found');
        } elseif ($user->getUsername() == $currentUser->getUsername()) {
            $response = array('status' => 'error', 'message' => 'User is equal to current');
        } else {
            foreach ($project->getProjectData()->getRelUsers() as $relUser) {
                if ($user->getUsername() == $relUser->getUser()->getUsername()) {
                    $response = array('status' => 'error', 'message' => 'User is already added');
                    break;
                }
            }
        }
        if (is_null($response)) {
            $rpu = new RelProjectUser();
            $rpu->setProjectData($project->getProjectData());
            $rpu->setUser($user);
            $rpu->setReadOnly(true);
            $em->persist($rpu);
            $em->flush();
            $response = array('status' => 'success', 'rel' => $rpu, 'message' => 'User added!');
        }
        $serializerContext = SerializationContext::create()
            ->setGroups(array('get_project'));
        $response = $serializer->serialize($response, 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/user/{userID}", name="remove_user_from_project")
     * @Method({"DELETE"})
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function removeUserFromProject(Project $project, User $user)
    {
        $currentUser = $this->get('vitoop.vitoop_security')->getUser();
        if (!$project->getProjectData()->availableForWriting($currentUser)) {
            throw new AccessDeniedHttpException;
        }
        $response = null;
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        if (is_null($user)) {
            $response = array('status' => 'error', 'message' => 'User is not found');
        } elseif ($user->getUsername() == $currentUser->getUsername()) {
            $response = array('status' => 'error', 'message' => 'User is equal to current');
        } else {
                $rel = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:RelProjectUser')->getRel($user, $project);
                if (is_null($rel)) {
                    $response = array('status' => 'error', 'message' => 'User is already deleted');
                } else {
                    $response = array('status' => 'success', 'rel' => clone $rel, 'message' => 'User removed!');
                    $em->remove($rel);
                    $em->flush();
                }
        }
        $serializerContext = SerializationContext::create()
            ->setGroups(array('get_project'));
        $response = $serializer->serialize($response, 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/resource/{resourceID}", name="remove_resource_from_project")
     * @Method({"DELETE"})
     * @ParamConverter("resource", class="Vitoop\InfomgmtBundle\Entity\Resource", options={"id" = "resourceID"})
     *
     * @return array
     */
    public function removeResourceFromProject(Project $project, Resource $resource)
    {
        $currentUser = $this->get('vitoop.vitoop_security')->getUser();
        if (!$project->getProjectData()->availableForWriting($currentUser)) {
            throw new AccessDeniedHttpException;
        }
        $em = $this->getDoctrine()->getManager();
        $rel = $em->getRepository('VitoopInfomgmtBundle:RelResourceResource')->findOneBy(array(
            'resource1' => $project,
            'resource2' => $resource
        ));

        if (!is_null($rel)) {
            $em->remove($rel);
            $em->flush();
            $response = array('status' => 'success', 'message' => 'Resource unlinked!');
        } else {
            $response = array('status' => 'error', 'message' => 'Resource is not found');
        }

        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize($response, 'json');

        return new Response($response);
    }
}