<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\Resource\LexiconAssignment;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Repository\LexiconRepository;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\LexiconQueryManager;
use Vitoop\InfomgmtBundle\Service\ResourceManager;

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
     * @var LexiconRepository
     */
    private $lexiconRepository;
    /**
     * @var LexiconQueryManager
     */
    private $lexiconQueryManager;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * LexiconController constructor.
     * @param ResourceRepository $resourceRepository
     * @param LexiconRepository $lexiconRepository
     * @param LexiconQueryManager $lexiconQueryManager
     * @param ValidatorInterface $validator
     */
    public function __construct(
        ResourceRepository $resourceRepository,
        LexiconRepository $lexiconRepository,
        LexiconQueryManager $lexiconQueryManager,
        ValidatorInterface $validator
    ) {
        $this->resourceRepository = $resourceRepository;
        $this->lexiconRepository = $lexiconRepository;
        $this->lexiconQueryManager = $lexiconQueryManager;
        $this->validator = $validator;
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getLexiconById(Lexicon $lexicon)
    {
        $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($lexicon);

        return $this->getApiResponse([
            'lexicon' => $lexicon->getDTO(),
            'resourceInfo' => $resourceInfo,
        ]);
    }

    /**
     * @Route("/{id}/assignments", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getRelatedLexicon(Lexicon $lexicon)
    {
        return $this->getApiResponse(
            $this->lexiconRepository->countAllResources1($lexicon, $this->getUser())
        );
    }

    /**
     * @Route("/{id}/assignments", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addAssignment(Lexicon $lexicon, ResourceManager $resourceManager, Request $request)
    {
        /**
         * @var LexiconAssignment $dto
         */
        $dto = $this->getDTOFromRequest($request, LexiconAssignment::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }
        /**
         * @var Lexicon $newLexicon
         */
        $newLexicon = $this->lexiconRepository->findOneBy(['name' => $dto->name]);
        if (null === $newLexicon || ($newLexicon && strlen($newLexicon->getDescription()) < 5)) {
            $newLexicon = $this->lexiconQueryManager->getLexiconFromSuggestTerm($dto->name);
            $resourceManager->saveLexicon($newLexicon);
        }
        $resourceManager->linkLexiconToResource($newLexicon, $lexicon);

        return $this->getApiResponse($newLexicon->getDTO());
    }

    /**
     * @ParamConverter("removedLexicon", class="Vitoop\InfomgmtBundle\Entity\Lexicon", options={"id" = "lexId"})
     * @Route("/{id}/assignments/{lexId}", methods={"DELETE"}, requirements={"id": "\d+", "lexId": "\d+"})
     */
    public function removeAssignment(Lexicon $lexicon, Lexicon $removedLexicon, ResourceManager $resourceManager)
    {
        $resourceManager->removeLexicon($removedLexicon, $lexicon);

        return $this->getApiResponse([], 204);
    }
}
