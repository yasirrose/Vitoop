<?php

namespace App\Controller\V1;

use Symfony\Component\Routing\Annotation\Route;
use App\Controller\ApiController;
use App\Repository\TagRepository;

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
     * TagController constructor.
     * @param TagRepository $tagRepository
     */
    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
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
}
