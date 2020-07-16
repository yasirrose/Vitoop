<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\Resource\CommentDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\CreateResourceDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\FlagDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\HideResourceDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\RatingDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\RemarkDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\RemarkPrivateDTO;
use Vitoop\InfomgmtBundle\DTO\Resource\TagDTO;
use Vitoop\InfomgmtBundle\Entity\Comment;
use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Entity\Rating;
use Vitoop\InfomgmtBundle\Entity\Remark;
use Vitoop\InfomgmtBundle\Entity\RemarkPrivate;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\UrlCheck\UrlCheckInterface;
use Vitoop\InfomgmtBundle\Repository\CommentRepository;
use Vitoop\InfomgmtBundle\Repository\FlagRepository;
use Vitoop\InfomgmtBundle\Repository\LexiconRepository;
use Vitoop\InfomgmtBundle\Repository\ProjectRepository;
use Vitoop\InfomgmtBundle\Repository\RatingRepository;
use Vitoop\InfomgmtBundle\Repository\RemarkPrivateRepository;
use Vitoop\InfomgmtBundle\Repository\RemarkRepository;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;
use Vitoop\InfomgmtBundle\Repository\TagRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\EmailSender;
use Vitoop\InfomgmtBundle\Service\ResourceDetailExtractor;
use Vitoop\InfomgmtBundle\Service\Tag\ResourceTagLinker;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

/**
 * @Route("resources")
 */
class ResourceController extends ApiController
{
    /**
     * @var ResourceRepository $resourceRepository
     */
    private $resourceRepository;

    /**
     * @var RatingRepository $ratingRepository
     */
    private $ratingRepository;

    /**
     * @var TagRepository
     */
    private $tagRepository;
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var ResourceDetailExtractor
     */
    private $resourceDetailExtractor;

    /**
     * ResourceController constructor.
     * @param ResourceRepository $resourceRepository
     * @param RatingRepository $ratingRepository
     * @param TagRepository $tagRepository
     * @param ValidatorInterface $validator
     * @param ResourceDetailExtractor $resourceDetailExtractor
     */
    public function __construct(
        ResourceRepository $resourceRepository,
        RatingRepository $ratingRepository,
        TagRepository $tagRepository,
        ValidatorInterface $validator,
        ResourceDetailExtractor $resourceDetailExtractor
    ) {
        $this->resourceRepository = $resourceRepository;
        $this->ratingRepository = $ratingRepository;
        $this->tagRepository = $tagRepository;
        $this->validator = $validator;
        $this->resourceDetailExtractor = $resourceDetailExtractor;
    }

    /**
     * @Route("/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getResource(Resource $resource)
    {
        return new JsonResponse(
            $this->resourceDetailExtractor->getResourceDetailDTO($resource, $this->getUser())
        );
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function createResource(Request $request)
    {
        /**
         * @var CreateResourceDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, CreateResourceDTO::class);
        $errors = $this->validator->validate($dto, null, ['Default', $dto->resourceType]);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $dto->resource->user = $this->getUser();
        $class = Resource\ResourceType::getClassByResourceType($dto->resourceType);
        /**
         * @var Resource $resource
         */
        $resource = call_user_func(array($class, 'createFromResourceDTO'), $dto->resource);
        $this->resourceRepository->save($resource);

        return $this->getApiResponse(
            $this->resourceDetailExtractor->getResourceDetailDTO($resource, $this->getUser()),
            201
        );
    }

    /**
     * @Route("/{id}", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function editResource(Resource $resource, Request $request)
    {
        /**
         * @var CreateResourceDTO $dto
         */
        $dto = CreateResourceDTO::createFromRequestAndType($request,  $resource->getResourceType());
        $dto->resource->user = $this->getUser();
        $errors = $this->validator->validate($dto, null, ['Default', $dto->resourceType]);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $resource->updateFromResourceDTO($dto->resource);
        $this->resourceRepository->save($resource);

        return $this->getApiResponse(
            $this->resourceDetailExtractor->getResourceDetailDTO($resource, $this->getUser()),
            200
        );
    }

    /**
     * @Route("/{id}/remarks", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getRemarks(Resource $resource, RemarkRepository $remarkRepository)
    {
        return $this->getApiResponse($remarkRepository->getAllRemarksDTO($resource));
    }

    /**
     * @Route("/{id}/remarks", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addRemark(Resource $resource, Request $request, RemarkRepository $remarkRepository)
    {
        $dto = $this->getDTOFromRequest($request, RemarkDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }
        $remark = Remark::create($resource, $this->getUser(), $dto);
        $remarkRepository->save($remark);

        return $this->getApiResponse($remarkRepository->getAllRemarksDTO($resource));
    }

    /**
     * @Route("/{id}/private-remarks", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getPrivateRemark(Resource $resource, RemarkPrivateRepository $remarkPrivateRepository)
    {
        return $this->getApiResponse($remarkPrivateRepository->getPrivateRemarkDTO($resource, $this->getUser()));
    }

    /**
     * @Route("/{id}/private-remarks", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addPrivateRemark(Resource $resource, Request $request, RemarkPrivateRepository $remarkPrivateRepository)
    {
        $dto = $this->getDTOFromRequest($request, RemarkPrivateDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }
        $privateRemark = $remarkPrivateRepository->getUserRemarkForResource($resource, $this->getUser());
        if ($privateRemark) {
            $privateRemark->updateFromDTO($dto);
        } else {
            $privateRemark = RemarkPrivate::create($resource, $this->getUser(), $dto);
        }
        $remarkPrivateRepository->save($privateRemark);

        return $this->getApiResponse($remarkPrivateRepository->getPrivateRemarkDTO($resource, $this->getUser()));
    }

    /**
     * @Route("/{id}/comments", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getComments(Resource $resource, CommentRepository $commentRepository)
    {
        return $this->getApiResponse($commentRepository->findResourceComments($resource, $this->getUser()));
    }

    /**
     * @Route("/{id}/comments", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addComment(Resource $resource, Request $request, CommentRepository $commentRepository)
    {
        $dto = $this->getDTOFromRequest($request, CommentDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $comment = Comment::create($resource, $this->getUser(), $dto);
        $commentRepository->save($comment);

        return $this->getApiResponse($commentRepository->findResourceComments($resource, $this->getUser()));
    }

    /**
     * @Route("/{id}/assignments", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getAssignments(
        Resource $resource,
        LexiconRepository $lexiconRepository,
        ProjectRepository $projectRepository
    ) {
        return $this->getApiResponse([
            'lexicons' => $lexiconRepository->countAllResources1($resource, $this->getUser()),
            'projects' => $projectRepository->getAllNamesOfResources1($resource, $this->getUser())
        ]);
    }

    /**
     * @Route("/{id}/tags", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addTag(Resource $resource, Request $request, ResourceTagLinker $tagLinker)
    {
        /**
         * @var TagDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, TagDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        try {
            $tagLinker->addTagToResource($resource, $dto->name);
            $this->resourceRepository->save($resource);
        } catch (\Exception $exception) {
            return $this->getApiResponse(new ErrorResponse([$exception->getMessage()]), 400);
        }

        return $this->getApiResponse(
            $this->resourceDetailExtractor->getResourceTagsDTO($resource, $this->getUser())
        );
    }

    /**
     * @ParamConverter("tag", options={"id" = "tagId"})
     * @Route("/{id}/tags/{tagId}", methods={"DELETE"}, requirements={"id": "\d+", "tagId": "\d+"})
     */
    public function removeTag(Resource $resource, Tag $tag, ResourceTagLinker $tagLinker)
    {
        try {
            $tagLinker->unlinkTagFromResource($resource, $tag->getText());
            $this->resourceRepository->save($resource);
        } catch (\Exception $exception) {
            return $this->getApiResponse(new ErrorResponse([$exception->getMessage()]), 400);
        }

        return $this->getApiResponse(
            $this->resourceDetailExtractor->getResourceTagsDTO($resource, $this->getUser())
        );
    }

    /**
     * @Route("/{id}/flags", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addFlag(
        Resource $resource,
        Request $request,
        FlagRepository $flagRepository,
        EmailSender $emailSender
    ) {
        /**
         * @var $dto FlagDTO
         */
        $dto = $this->getDTOFromRequest($request, FlagDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $flag = $flagRepository->findResourceFlagByUserAndType($resource, $this->getUser()->getId(), $dto->type);
        if (null === $flag) {
            $flag = Flag::create($resource, $this->getUser(), $dto->type, $dto->info);
        } else {
            $flag->updateFromDTO($dto);
        }
        $flagRepository->save($flag);
        $emailSender->sendChangeFlagNotification($resource, $dto->type, $flag);

        return $this->getApiResponse($flag, 201);
    }

    /**
     * @ParamConverter("flag", options={"id" = "flagId"})
     * @Route("/{id}/tags/{flagId}/approvements", methods={"POST"}, requirements={"id": "\d+", "flagId": "\d+"})
     */
    public function approveFlag(
        Resource $resource,
        Flag $flag,
        VitoopSecurity $vitoopSecurity,
        FlagRepository $flagRepository
    ) {
        if (!$vitoopSecurity->isAdmin()) {
            return $this->getApiResponse(new ErrorResponse(['Flag is not found']),  404);
        }
        $flag->approve();
        $flagRepository->save($flag);

        return $this->getApiResponse($flag);
    }

    /**
     * @ParamConverter("flag", options={"id" = "flagId"})
     * @Route("/{id}/tags/{flagId}", methods={"DELETE"}, requirements={"id": "\d+", "flagId": "\d+"})
     */
    public function deleteFlag(
        Resource $resource,
        Flag $flag,
        VitoopSecurity $vitoopSecurity,
        FlagRepository $flagRepository
    ) {
        if (!$vitoopSecurity->isAdmin()) {
            return $this->getApiResponse(new ErrorResponse(['Flag is not found']),  404);
        }
        $flagRepository->remove($flag);

        return $this->getApiResponse([], 204);
    }

    /**
     * @Route("/{id}/hidings", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function skipResource(Resource $resource, Request $request, VitoopSecurity $vitoopSecurity)
    {
        if (!$vitoopSecurity->isAdmin()) {
            return $this->getApiResponse(new ErrorResponse(['Hiding is not supported']),  404);
        }
        /**
         * @var HideResourceDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, HideResourceDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        if (!$resource instanceof UrlCheckInterface) {
            return $this->getApiResponse($dto);
        }
        if (true === $dto->isSkip) {
            $resource->skip();
        } else {
            $resource->unskip();
        }
        $this->resourceRepository->save($resource);

        return $this->getApiResponse($dto);
    }

    /**
     * @Route("/{id}/ratings", methods={"POST"}, requirements={"id": "\d+"})
     */
    public function addRating(Resource $resource, Request $request)
    {
        /**
         * @var RatingDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, RatingDTO::class);
        $user = $this->getUser();
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }
        $rating = $this->ratingRepository->getRatingFromResourceByUser($resource, $user);
        if (null !== $rating) {
            return $this->getApiResponse($this->resourceDetailExtractor->getRatingDTO($resource, $user));
        }
        $rating = Rating::create($resource, $user, $dto->ownmark);
        $this->ratingRepository->save($rating);

        return $this->getApiResponse($this->resourceDetailExtractor->getRatingDTO($resource, $user));
    }
}
