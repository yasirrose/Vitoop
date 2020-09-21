<?php
namespace App\Repository;

use App\Entity\Option;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class OptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Option::class);
    }

    /**
     * @inheritDoc
     */
    public function save(Option $option)
    {
        $this->getEntityManager()->persist($option);
        $this->getEntityManager()->flush($option);
    }

    public function getOption($name)
    {
        return $this->createQueryBuilder('o')
            ->where('o.name = :name')
            ->setParameter('name', $name)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
