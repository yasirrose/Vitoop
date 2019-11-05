<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\VitoopBlog\UpdateBlogItem;
use Vitoop\InfomgmtBundle\Entity\VitoopBlog;
use Vitoop\InfomgmtBundle\Repository\VitoopBlogRepository;

/**
 * @Route("vitoop-blog")
 */
class VitoopBlogController extends ApiController
{
    /**
     * @var VitoopBlogRepository
     */
    private $vitoopBlogRepository;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * VitoopBlogController constructor.
     * @param VitoopBlogRepository $vitoopBlogRepository
     * @param ValidatorInterface $validator
     */
    public function __construct(VitoopBlogRepository $vitoopBlogRepository, ValidatorInterface $validator)
    {
        $this->vitoopBlogRepository = $vitoopBlogRepository;
        $this->validator = $validator;
    }

    /**
     * @Route("", methods={"GET"})
     */
    public function getVitoopBlog()
    {
        $blog = $this->vitoopBlogRepository->findCurrent();
        if (!$blog) {
            $blog = new VitoopBlog();
            $this->vitoopBlogRepository->save($blog);
        }

        return $this->getApiResponse($blog);
    }

    /**
     * @param VitoopBlog $vitoopBlog
     * @Route("/{id}", methods={"PUT"})
     */
    public function editVitoopBlog(VitoopBlog $vitoopBlog, Request $request)
    {
        /**
         * @var UpdateBlogItem $dto
         */
        $dto = $this->getDTOFromRequest($request, UpdateBlogItem::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            $response['success'] = false;
            $response['messages'] = [];
            foreach ($errors as $error) {
                $response['messages'][] = $error->getPropertyPath() . ': '. $error->getMessage();
            }

            return new JsonResponse($response, 400);
        }

        $vitoopBlog->updateSheet($dto->sheet);
        $this->vitoopBlogRepository->save($vitoopBlog);

        return $this->getApiResponse($vitoopBlog);
    }
}