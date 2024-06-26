<?php

namespace App\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Controller\ApiController;
use App\DTO\Resource\LexiconAssignment;
use App\Entity\Lexicon;
use App\Repository\LexiconRepository;
use App\Repository\ResourceRepository;
use App\Response\Json\ErrorResponse;
use App\Service\LexiconQueryManager;
use App\Service\RelResource\RelResourceLinker;
use App\Service\ResourceManager;

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
     * @var RelResourceLinker
     */
    private $relResourceLinker;

    /**
     * LexiconController constructor.
     * @param ResourceRepository $resourceRepository
     * @param LexiconRepository $lexiconRepository
     * @param LexiconQueryManager $lexiconQueryManager
     * @param RelResourceLinker $relResourceLinker
     * @param ValidatorInterface $validator
     */
    public function __construct(
        ResourceRepository $resourceRepository,
        LexiconRepository $lexiconRepository,
        LexiconQueryManager $lexiconQueryManager,
        RelResourceLinker $relResourceLinker,
        ValidatorInterface $validator
    ) {
        $this->resourceRepository = $resourceRepository;
        $this->lexiconRepository = $lexiconRepository;
        $this->lexiconQueryManager = $lexiconQueryManager;
        $this->validator = $validator;
        $this->relResourceLinker = $relResourceLinker;
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getLexiconById(Lexicon $lexicon)
    {
        $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($lexicon);

        $lexiconDto = $lexicon->getDTO();
        $lexiconDto['can_add'] = $this->relResourceLinker->getResourceForAddingCount($lexicon, $this->getUser());
        $lexiconDto['can_remove'] = $this->relResourceLinker->getResourceForRemovingCount($lexicon, $this->getUser());

        return $this->getApiResponse([
            'lexicon' => $lexiconDto,
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
     * @ParamConverter("removedLexicon", class="App\Entity\Lexicon", options={"id" = "lexId"})
     * @Route("/{id}/assignments/{lexId}", methods={"DELETE"}, requirements={"id": "\d+", "lexId": "\d+"})
     */
    public function removeAssignment(Lexicon $lexicon, Lexicon $removedLexicon, ResourceManager $resourceManager)
    {
        $resourceManager->removeLexicon($removedLexicon, $lexicon);

        return $this->getApiResponse([], 204);
    }
}
