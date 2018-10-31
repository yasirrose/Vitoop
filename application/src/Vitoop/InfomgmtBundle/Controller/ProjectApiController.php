<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\RelProjectUser;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Vitoop\InfomgmtBundle\Entity\Project;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

/**
 * @Route("api/project/{projectID}")
 * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
 */
class ProjectApiController extends ApiController
{
    /**
     * @Route("", name="get_project_api")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getProject(Project $project)
    {
        $this->checkAccess($project);

        return $this->getApiResponse([
            'project' => $project->getDTO(),
            'isOwner' => $project->getProjectData()->availableForDelete($this->getUser())
        ]);
    }

    /**
     * @Route("", name="delete_project_api")
     * @Method({"DELETE"})
     *
     * @return array
     */
    public function deleteProjectAction(Project $project)
    {
        $this->checkAccess($project);
 
        $em = $this->getDoctrine()->getManager();
        $rels = $em->getRepository('VitoopInfomgmtBundle:RelResourceResource')->findBy(array('resource1' => $project));
        foreach ($rels as $rel) {
            $em->remove($rel);
        }
        $rels = $em->getRepository('VitoopInfomgmtBundle:RelResourceResource')->findBy(array('resource2' => $project));
        foreach ($rels as $rel) {
            $em->remove($rel);
        }
        $em->remove($project);
        $em->flush();

        return $this->getApiResponse(['success' => true]);
    }

    /**
     * @Route("", name="save_project_api")
     * @Method({"POST"})
     *
     * @return array
     */
    public function saveProject(Project $project, Request $request)
    {
        $this->checkAccess($project);
 
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $serializerContext = DeserializationContext::create()
            ->setGroups(['get_project']);
        $updatedProject = $serializer->deserialize(
            $request->getContent(),
            'Vitoop\InfomgmtBundle\Entity\Project',
            'json',
            $serializerContext
        );
        $response = ['status' => 'error', 'message' => 'Project is not found'];
        $project = $em->getRepository('VitoopInfomgmtBundle:Project')->find($updatedProject->getId());
        if ($project) {
            $project->setProjectData($updatedProject->getProjectData());
            $em->merge($project);
            $em->flush();
            $response = ['status' => 'success', 'message' => 'Project saved!'];
        }

        return new JsonResponse($response);
    }

    /**
     * @Route("/user", name="add_user_to_project")
     * @Method({"POST"})
     *
     * @return array
     */
    public function addUserToProject(VitoopSecurity $vitoopSecurity, Project $project, Request $request)
    {
        $currentUser = $vitoopSecurity->getUser();
        $this->checkAccess($project);

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
    public function removeUserFromProject(VitoopSecurity $vitoopSecurity, Project $project, User $user)
    {
        $currentUser = $vitoopSecurity->getUser();
        $this->checkAccess($project);

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
        $this->checkAccess($project);
        
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

    private function checkAccess(Project $project)
    {
        if (!$project->getProjectData()->availableForWriting($this->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }
}
