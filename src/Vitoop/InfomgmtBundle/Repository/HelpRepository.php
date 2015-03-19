<?php
namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

class HelpRepository extends EntityRepository
{
    public function getHelp() {
        return $this->createQueryBuilder('h')
            ->select('h')
            ->orderBy('h.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

}
