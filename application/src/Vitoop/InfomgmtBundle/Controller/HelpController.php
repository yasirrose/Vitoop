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
 * @Route("/api/help")
 */
class HelpController extends Controller
{

    /**
     * @Route("", name="get_help")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getAction()
    {
        $help = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:Help')->getHelp();
        $serializer = $this->get('jms_serializer');
        $serializerContext = SerializationContext::create()->setGroups(array('get'));
        $response = $serializer->serialize(array('help' => $help, 'isAdmin' => $this->get('vitoop.vitoop_security')->isAdmin()), 'json', $serializerContext);

        return new Response($response);
    }

    /**
     * @Route("", name="edit_help")
     * @Method({"POST"})
     *
     * @return array
     */
    public function editAction(Request $request)
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

