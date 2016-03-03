<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 *
 */
class SettingsController extends Controller
{
    /**
     * @Route("/api/terms", name="get_terms")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getTermsAction()
    {
        $serializer = $this->get('jms_serializer');
        $serializerContext = SerializationContext::create();
        $response = $serializer->serialize(array('terms' => $this->get('vitoop.settings')->getTerms(), 'isAdmin' => $this->get('vitoop.vitoop_security')->isAdmin()), 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/api/terms", name="edit_terms")
     * @Method({"POST"})
     *
     * @return array
     */
    public function editTermsAction(Request $request)
    {
        if (!$this->get('vitoop.vitoop_security')->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $serializer = $this->get('jms_serializer');
        $serializerContext = DeserializationContext::create();
        $terms = $serializer->deserialize($request->getContent(), 'array', 'json', $serializerContext);
        $this->get('vitoop.settings')->setTerms($terms['text']);
        $this->get('vitoop.settings')->setNewTermsForUsers((bool) $terms['all-users']);
        $response = $serializer->serialize(array('success' => true), 'json');

        return new Response($response);
    }

    /**
     * @Route("/api/help", name="get_help")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getHelpAction()
    {
        $help = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:Help')->getHelp();
        $serializer = $this->get('jms_serializer');
        $serializerContext = SerializationContext::create()->setGroups(array('get'));
        $response = $serializer->serialize(array('help' => $help, 'isAdmin' => $this->get('vitoop.vitoop_security')->isAdmin()), 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("/api/help", name="edit_help")
     * @Method({"POST"})
     *
     * @return array
     */
    public function editHelpAction(Request $request)
    {
        if (!$this->get('vitoop.vitoop_security')->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $serializer = $this->get('jms_serializer');
        $serializerContext = DeserializationContext::create()->setGroups(array('edit'));
        $em = $this->getDoctrine()->getManager();
        $help = $serializer->deserialize($request->getContent(), 'Vitoop\InfomgmtBundle\Entity\Help', 'json', $serializerContext);
        $em->merge($help);
        $em->flush();
        $response = $serializer->serialize(array('success' => true), 'json');

        return new Response($response);
    }
}
