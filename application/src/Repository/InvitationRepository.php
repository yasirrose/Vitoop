<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Invitation;

/**
 * InvitationRepository
 */
class InvitationRepository extends ServiceEntityRepository
{
    /**
     * InvitationRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Invitation::class);
    }

    /**
     * @param Invitation $invitation
     */
    public function add(Invitation $invitation)
    {
        $this->getEntityManager()->persist($invitation);
    }

    /**
     * @param Invitation $invitation
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function save(Invitation $invitation)
    {
        $this->getEntityManager()->persist($invitation);
        $this->getEntityManager()->flush($invitation);
    }

    public function remove(Invitation $invitation)
    {
        $this->getEntityManager()->remove($invitation);
        $this->getEntityManager()->flush($invitation);
    }
}