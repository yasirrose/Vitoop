<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\DTO\Resource\CommentDTO;
use App\Entity\Comment;
use App\Entity\Resource;
use App\Entity\User\User;

class CommentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Comment::class);
    }

    /**
     * @deprecated getAllCommentDTOFromResource
     */
    public function getAllCommentsFromResource(Resource $resource)
    {
        return $this->getAllCommentsQuery($resource)
            ->getQuery()
            ->getResult();
    }

    public function getAllCommentDTOFromResource(Resource $resource)
    {
        return $this->getAllCommentsQuery($resource)
            ->select('NEW '.CommentDTO::class . '(c.id, c.text, u.id, u.username, c.created_at, c.isVisible)')
            ->getQuery()
            ->getResult();
    }

    public function getAllVisibleCommentDTOFromResource(Resource $resource)
    {
        return $this->getAllCommentsQuery($resource)
            ->select('NEW '.CommentDTO::class . '(c.id, c.text, u.id, u.username, c.created_at, c.isVisible)')
            ->andWhere('c.isVisible = :isVisible')
            ->setParameter('isVisible', true)
            ->getQuery()
            ->getResult();
    }

    public function findResourceComments(Resource $resource, User $user)
    {
        if ($user->isAdmin()) {
            return $this->getAllCommentDTOFromResource($resource);
        }

        return $this->getAllVisibleCommentDTOFromResource($resource);
    }

    public function save(Comment $comment)
    {
        $this->getEntityManager()->persist($comment);
        $this->getEntityManager()->flush();
    }

    /**
     * @deprecated getAllVisibleCommentDTOFromResource
     */
    public function getAllVisibleCommentsFromResource(Resource $resource)
    {
        return $this->getAllCommentsQuery($resource)
            ->andWhere('c.isVisible = :isVisible')
            ->setParameter('isVisible', true)
            ->getQuery()
            ->getResult();
    }

    private function getAllCommentsQuery(Resource $resource)
    {
        return $this->getEntityManager()->createQueryBuilder()
            ->select('c, partial u.{id, username}')
            ->from(Comment::class, 'c')
            ->leftJoin('c.user', 'u')
            ->where('c.resource=:arg_resource')
            ->setParameter('arg_resource', $resource);
    }
}