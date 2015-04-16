<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * ProjectRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProjectRepository extends ResourceRepository
{
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

    public function getProjectWithData($id)
    {
        // LEFT JOIN because JOIN would result null if there is no project_data
        return $this->getEntityManager()
                    ->createQuery('SELECT p, pd FROM VitoopInfomgmtBundle:Project p LEFT JOIN p.project_data pd WHERE p.id=:arg_id')
                    ->setParameters(array('arg_id' => $id))
                    ->getOneOrNullResult();
    }

    public function getCountOfRelatedResources(Project $project)
    {
        return $this->getEntityManager()->createQueryBuilder()
            ->select('count(prj.id) as prjc')
            ->addSelect('count(lex.id) as lexc')
            ->addSelect('count(pdf.id) as pdfc')
            ->addSelect('count(teli.id) as telic')
            ->addSelect('count(link.id) as linkc')
            ->addSelect('count(adr.id) as adrc')
            ->addSelect('count(book.id) as bookc')
            ->from('VitoopInfomgmtBundle:RelResourceResource', 'rrr')
            ->leftJoin('VitoopInfomgmtBundle:Project', 'prj', 'WITH', 'rrr.resource2 = prj.id')
            ->leftJoin('VitoopInfomgmtBundle:Lexicon', 'lex', 'WITH', 'rrr.resource2 = lex.id')
            ->leftJoin('VitoopInfomgmtBundle:Pdf', 'pdf', 'WITH', 'rrr.resource2 = pdf.id')
            ->leftJoin('VitoopInfomgmtBundle:Teli', 'teli', 'WITH', 'rrr.resource2 = teli.id')
            ->leftJoin('VitoopInfomgmtBundle:Link', 'link', 'WITH', 'rrr.resource2 = link.id')
            ->leftJoin('VitoopInfomgmtBundle:Address', 'adr', 'WITH', 'rrr.resource2 = adr.id')
            ->leftJoin('VitoopInfomgmtBundle:Book', 'book', 'WITH', 'rrr.resource2 = book.id')
            ->where('rrr.resource1 = :project')
            ->setParameter('project', $project)
            ->getQuery()
            ->getOneOrNullResult();
    }
}