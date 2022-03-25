<?php

namespace App\Controller\V1;

use App\DTO\Resource\TagDTO;
use App\Entity\Tag;
use App\Repository\RelResourceTagRepository;
use App\Response\Json\ErrorResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\ApiController;
use App\Repository\TagRepository;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("tags")
 */
class TagController extends ApiController
{
    /**
     * @var TagRepository
     */
    private $tagRepository;
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var RelResourceTagRepository
     */
    private $resourceTagRepository;

    public function __construct(
        TagRepository $tagRepository,
        ValidatorInterface $validator,
        RelResourceTagRepository $resourceTagRepository
    ) {
        $this->tagRepository = $tagRepository;
        $this->validator = $validator;
        $this->resourceTagRepository = $resourceTagRepository;
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function getTags()
    {
        return $this->getApiResponse(
            $this->tagRepository->getAllTagsWithRelResourceTagCount()
        );
    }

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, methods={"POST"})
     */
    public function editTag(Tag $tag, Request $request)
    {
        /** @var TagDTO $dto */
        $dto = $this->getDTOFromRequest($request, TagDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $tag->setText($dto->name);
        $this->tagRepository->addAndSave($tag);

        return $this->getApiResponse($tag);
    }

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, methods={"DELETE"})
     */
    public function deleteTag(Tag $tag)
    {
        //remove rel
        $this->resourceTagRepository->removeTagRelationByTagId($tag->getId());
        $this->tagRepository->remove($tag);

        return $this->getApiResponse([], 204);
    }
}
