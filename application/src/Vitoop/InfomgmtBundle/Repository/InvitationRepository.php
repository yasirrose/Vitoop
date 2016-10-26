<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityManagerInterface;
use Vitoop\InfomgmtBundle\Entity\Invitation;

/**
 * InvitationRepository
 */
class InvitationRepository
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function add(Invitation $invitation)
    {
        $this->entityManager->persist($invitation);
    }

    public function remove(Invitation $invitation)
    {
        $this->entityManager->remove($invitation);
    }

    public function findOneByEmail($email)
    {
        return $this->entityManager->getRepository(Invitation::class)->findOneByEmail($email);
    }
}