<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\Routing\Annotation\Route;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\Repository\TagRepository;

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
