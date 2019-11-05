<?php

namespace Vitoop\InfomgmtBundle\DTO\VitoopBlog;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

/**
 * Class UpdateBlogItem
 * @package Vitoop\InfomgmtBundle\DTO\VitoopBlog
 */
class UpdateBlogItem implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     */
    public $id;

    /**
     * @Assert\NotBlank()
     */
    public $sheet;
}