<?php

namespace App\Repository;

use App\DTO\Resource\ProjectShortDTO;
use App\Entity\Project;
use App\Entity\RelProjectUser;
use App\Entity\Resource;
use App\Entity\User\User;
use App\DTO\Resource\SearchResource;

/**
 * ProjectRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProjectRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Project::class;
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('la.code')
            ->leftJoin('r.lang', 'la')
            ->leftJoin('r.project_data', 'projectData')
            ->leftJoin('projectData.relUsers', 'relUsers', 'WITH', 'relUsers.user = :currentUser')
            ->andWhere('projectData.isForRelatedUsers = false OR (projectData.isForRelatedUsers = true AND (relUsers.user = :currentUser OR r.user = :currentUser)) OR true = :isAdmin')
            ->setParameter('isAdmin', $search->user->isAdmin())
        ;
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }

    public function getAllProjectsByTermOrAllIfLessThanTen($term, User $user)
    {
        return $this->createQueryBuilder('p')
            ->select('DISTINCT(p.name) as name')
            ->innerJoin('p.project_data', 'pd')
            ->leftJoin(RelProjectUser::class, 'rpu', 'WITH', 'rpu.projectData = pd.id')
            ->where('(p.user = :user OR (rpu.user = :user AND rpu.readOnly = 0)) AND p.name LIKE :term')
            ->setParameter('term', $term."%")
            ->setParameter('user', $user)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function getProjectWithData($id)
    {
        // LEFT JOIN because JOIN would result null if there is no project_data
        return $this->getEntityManager()
                    ->createQuery('SELECT p, pd FROM App\Entity\Project p LEFT JOIN p.project_data pd WHERE p.id=:arg_id')
                    ->setParameters(array('arg_id' => $id))
                    ->getOneOrNullResult();
    }

    protected function getDividerQuery(): string
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.code, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead, base.color
              FROM (
               %s
               UNION ALL
               SELECT null AS code, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, null as color, null as city1, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
              AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join project pr on pr.id = rrr.id_resource2
                          left JOIN flag fpr ON pr.id = fpr.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND fpr.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }


    /**
     * @param User $user
     * @return int|mixed|string
     */
    public function getMyProjectsShortDTO(User $user)
    {
        return $this->createQueryBuilder('prj')
            ->select('DISTINCT NEW '.ProjectShortDTO::class.'(prj.id, prj.name)')
            ->innerJoin('prj.project_data', 'pd')
            ->leftJoin(RelProjectUser::class, 'rpu', 'WITH',  'rpu.projectData = pd.id')
            ->andWhere('(prj.user = :user OR (rpu.user = :user AND rpu.readOnly = 0))')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();
    }
}
