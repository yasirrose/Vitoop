<?php
namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

class OptionRepository extends EntityRepository
{
    public function getOption($name) {
        return $this->createQueryBuilder('o')
            ->where('o.name = :name')
            ->setParameter('name', $name)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
