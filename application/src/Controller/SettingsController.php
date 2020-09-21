<?php

namespace App\Controller;

use App\Entity\Help;
use App\Repository\HelpRepository;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Service\SettingsService;
use App\Service\VitoopSecurity;

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
    public function getHelpAction(VitoopSecurity $vitoopSecurity, HelpRepository $helpRepository)
    {
        $help = $helpRepository->getHelp();

        return $this->getApiResponse([
            'help' => $help?$help->getDTO():null,
            'isAdmin' => $vitoopSecurity->isAdmin()
        ]);
    }

    /**
     * @Route("/api/help", name="edit_help", methods={"POST"})
     *
     * @param VitoopSecurity $vitoopSecurity
     * @param Request $request
     * @param HelpRepository $helpRepository
     * @param Serializer $serializer
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function editHelpAction(
        VitoopSecurity $vitoopSecurity,
        Request $request,
        HelpRepository $helpRepository,
        Serializer $serializer
    ) {
        if (!$vitoopSecurity->isAdmin()) {
            throw new AccessDeniedHttpException;
        }
        $serializerContext = DeserializationContext::create()->setGroups(array('edit'));
        $help = $serializer->deserialize($request->getContent(), 'App\Entity\Help', 'json', $serializerContext);
        $helpRepository->save($help);

        return $this->getApiResponse(['success' => true]);
    }
}
