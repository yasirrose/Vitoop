<?php


namespace App\Repository;

use App\Entity\UserAgreement;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserAgreementRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UserAgreement::class);
    }

    public function save(UserAgreement $userAgreement)
    {
        $this->getEntityManager()->persist($userAgreement);
        $this->getEntityManager()->flush($userAgreement);
    }
}
