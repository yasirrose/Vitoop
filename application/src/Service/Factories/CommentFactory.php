<?php

namespace App\Service\Factories;

use App\Entity\Comment;

class CommentFactory
{
    public static function fromCommentRemark(array $comment): Comment {
        $newComment = new Comment();
        $newComment->setUser($comment['remark']->getUser());
        $newComment->setResource($comment['remark']->getResource());
        $newComment->changeVisibity(true);
        $newComment->setText($comment['text']);
        $newComment->setCreatedAt($comment['remark']->getCreatedAt());

        return $newComment;
    }
}