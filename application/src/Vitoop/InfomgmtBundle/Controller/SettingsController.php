<?php
namespace Vitoop\InfomgmtBundle\Controller;

use JMS\Serializer\DeserializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class SettingsController extends ApiController
{
    /**
     * @Route("/api/terms", name="get_terms")
     * @Method({"GET"})
     *
     * @return array
     */
    public function getTermsAction()
    {
        return $this->getApiResponse(array(
            'terms' => $this->get('vitoop.settings')->getTerms(),
            'isAdmin' => $this->get('vitoop.vitoop_security')->isAdmin()
        ));
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
        $terms = $this->getDTOFromRequest($request);
        $this->get('vitoop.settings')->setTerms($terms->text, (bool) $terms->allUsers);

        return $this->getApiResponse(array('success' => true));
    }

    /**
     * @Route("/api/datap", name="api_datap_edit")
     * @Method({"POST"})
     *
     * @return array
     */
    public function editDataPAction(Request $request)
    {
        if (!$this->get('vitoop.vitoop_security')->isAdmin()) {
            throw new AccessDeniedHttpException;
        }

        $data = $this->getDTOFromRequest($request);
        $this->get('vitoop.settings')->setDataP($data->text);

        return $this->getApiResponse(array('success' => true));
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

        return $this->getApiResponse(array(
            'help' => $help?$help->toDTO():null,
            'isAdmin' => $this->get('vitoop.vitoop_security')->isAdmin()
        ));
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
