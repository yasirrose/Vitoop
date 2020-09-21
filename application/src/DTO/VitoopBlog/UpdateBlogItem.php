<?php

namespace App\DTO\VitoopBlog;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\DTO\CreateFromRequestTrait;

/**
 * Class UpdateBlogItem
 * @package App\DTO\VitoopBlog
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