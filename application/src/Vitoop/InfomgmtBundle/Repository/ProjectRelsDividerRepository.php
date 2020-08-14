<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Vitoop\InfomgmtBundle\DTO\Resource\DividerDTO;
use Vitoop\InfomgmtBundle\Entity\ProjectData;
use Vitoop\InfomgmtBundle\Entity\ProjectRelsDivider;

/**
 * Class ProjectRelsDividerRepository
 * @package Vitoop\InfomgmtBundle\Repository
 */
class ProjectRelsDividerRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProjectRelsDivider::class);
    }

    /**
     * @param int $projectDataId
     * @return int|mixed|string
     */
    public function findProjectDividerDTO($projectDataId)
    {
        return $this->createQueryBuilder('prd')
            ->select('NEW '.DividerDTO::class.'(prd.id, prd.text, prd.coefficient)')
            ->where('prd.projectData = :projectData')
            ->setParameter('projectData', $projectDataId)
            ->getQuery()
            ->getResult();
    }

    public function findProjectDividerByCoeff($projectDataId, $coeff)
    {
        return $this->createQueryBuilder('prd')
            ->where('prd.projectData = :projectData')
            ->andWhere('prd.coefficient = :coeff')
            ->setParameter('projectData', $projectDataId)
            ->setParameter('coeff', $coeff)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @param ProjectRelsDivider $projectRelsDivider
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function save(ProjectRelsDivider $projectRelsDivider)
    {
        $this->getEntityManager()->persist($projectRelsDivider);
        $this->getEntityManager()->flush();
    }
}
