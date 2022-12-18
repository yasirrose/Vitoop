<?php

namespace App\Repository;

use App\Entity\User\UserNotes;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserNotesRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserNotes::class);
    }

    public function save(UserNotes $notes)
    {
        $this->_em->persist($notes);
        $this->_em->flush();
    }
}
