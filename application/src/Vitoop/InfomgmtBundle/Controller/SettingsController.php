<?php
namespace Vitoop\InfomgmtBundle\Controller;

use JMS\Serializer\DeserializationContext;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Vitoop\InfomgmtBundle\Service\SettingsService;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

class SettingsController extends ApiController
{
    /**
     * @Route("/api/terms", name="get_terms", methods={"GET"})
     *
     * @return array
     */
    public function getTermsAction(VitoopSecurity $vitoopSecurity, SettingsService $settings)
    {
        return $this->getApiResponse(array(
            'terms' => $settings->getTerms(),
            'isAdmin' => $vitoopSecurity->isAdmin()
        ));
    }

    /**
     * @Route("/api/terms", name="edit_terms", methods={"POST"})
     *
     * @return array
     */
    public function editTermsAction(VitoopSecurity $vitoopSecurity, SettingsService $settings, Request $request)
    {
        if (!$vitoopSecurity->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $terms = $this->getDTOFromRequest($request);
        $settings->setTerms($terms->text, (bool) $terms->allUsers);

        return $this->getApiResponse(array('success' => true));
    }

    /**
     * @Route("/api/datap", name="api_datap_edit", methods={"POST"})
     *
     * @return array
     */
    public function editDataPAction(VitoopSecurity $vitoopSecurity, SettingsService $settings, Request $request)
    {
        if (!$vitoopSecurity->isAdmin()) {
            throw new AccessDeniedHttpException;
        }

        $data = $this->getDTOFromRequest($request);
        $settings->setDataP($data->text);

        return $this->getApiResponse(array('success' => true));
    }

    /**
     * @Route("/api/help", name="get_help", methods={"GET"})
     *
     * @return array
     */
    public function getHelpAction(VitoopSecurity $vitoopSecurity)
    {
        $help = $this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:Help')->getHelp();

        return $this->getApiResponse([
            'help' => $help?$help->getDTO():null,
            'isAdmin' => $vitoopSecurity->isAdmin()
        ]);
    }

    /**
     * @Route("/api/help", name="edit_help", methods={"POST"})
     *
     * @return array
     */
    public function editHelpAction(VitoopSecurity $vitoopSecurity, Request $request)
    {
        if (!$vitoopSecurity->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $serializer = $this->get('jms_serializer');
        $serializerContext = DeserializationContext::create()->setGroups(array('edit'));
        $em = $this->getDoctrine()->getManager();
        $help = $serializer->deserialize($request->getContent(), 'Vitoop\InfomgmtBundle\Entity\Help', 'json', $serializerContext);
        $em->persist($help);
        $em->flush();
        $response = $serializer->serialize(array('success' => true), 'json');

        return new Response($response);
    }
}
