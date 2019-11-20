<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\Routing\Annotation\Route;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;

/**
 * @Route("lexicons")
 */
class LexiconController extends ApiController
{
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;

    /**
     * ProjectController constructor.
     * @param ResourceRepository $resourceRepository
     */
    public function __construct(ResourceRepository $resourceRepository)
    {
        $this->resourceRepository = $resourceRepository;
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getProjectById(Lexicon $lexicon)
    {
        $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($lexicon);

        return $this->getApiResponse([
            'lexicon' => $lexicon->getDTO(),
            'resourceInfo' => $resourceInfo,
        ]);
    }
}
