<?php

namespace App\Repository;

use App\Entity\ToDoItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class ToDoItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ToDoItem::class);
    }

    public function save(ToDoItem $toDoItem)
    {
        $this->getEntityManager()->persist($toDoItem);
        $this->getEntityManager()->flush($toDoItem);
    }
}
