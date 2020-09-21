<?php

namespace App\Service\Tag;

use App\Entity\Tag;
use App\Repository\TagRepository;

class TagCreator
{
    /**
     * @var TagRepository
     */
    private $tagRepository;

    /**
     * TagCreator constructor.
     * @param TagRepository $tagRepository
     */
    public function __construct(TagRepository $tagRepository)
    {
        $this->tagRepository = $tagRepository;
    }

    /**
     * @param $tagName
     * @return Tag
     */
    public function createTag($tagName)
    {
        $tag = $this->getTagByTagName($tagName);
        if (!$tag) {
            $tag = Tag::create($tagName);
            $this->tagRepository->addAndSave($tag);
        }

        return $tag;
    }

    /**
     * @param $tagName
     * @return mixed
     */
    public function getTagByTagName($tagName)
    {
        return $this->tagRepository->findOneByText($tagName);
    }
}
