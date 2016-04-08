<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * ProjectRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProjectRepository extends ResourceRepository
{
    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('la.code')
            ->join('r.lang', 'la');
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }

    public function getAllProjectsByTermOrAllIfLessThanTen($term, User $user)
    {
        return $this->createQueryBuilder('p')
            ->select('DISTINCT(p.name) as name')
            ->innerJoin('p.project_data', 'pd')
            ->leftJoin('VitoopInfomgmtBundle:RelProjectUser', 'rpu', 'WITH', 'rpu.projectData = pd.id')
            ->where('(p.user = :user OR (rpu.user = :user AND rpu.readOnly = 0)) AND p.name LIKE :term')
            ->setParameter('term', $term."%")
            ->setParameter('user', $user)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function getAllProjectsByUser(User $user)
    {
        return $this->createQueryBuilder('p')
            ->select('DISTINCT(p.name) as name, p.id as id')
            ->innerJoin('p.project_data', 'pd')
            ->leftJoin('VitoopInfomgmtBundle:RelProjectUser', 'rpu', 'WITH', 'rpu.projectData = pd.id')
            ->where('(p.user = :user OR (rpu.user = :user AND rpu.readOnly = 0))')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }

    public function getProjectWithData($id)
    {
        // LEFT JOIN because JOIN would result null if there is no project_data
        return $this->getEntityManager()
                    ->createQuery('SELECT p, pd FROM VitoopInfomgmtBundle:Project p LEFT JOIN p.project_data pd WHERE p.id=:arg_id')
                    ->setParameters(array('arg_id' => $id))
                    ->getOneOrNullResult();
    }
}
