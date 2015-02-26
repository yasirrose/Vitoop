<?php
namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Pagination\ResourceListWithTagCountAdapter;
use Vitoop\InfomgmtBundle\Pagination\ResourceListAdapter;

use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

/*
 * ResourceRepository
 */

class ResourceRepository extends EntityRepository
{
    //\Doctrine\Common\Util\Debug::dump($result);die();

    protected function map_resource_type_to_classname($resource_type)
    {

        $map_resource_type_to_classname_arr = array(
            'res' => 'Resource',
            'pdf' => 'Pdf',
            'adr' => 'Address',
            'link' => 'Link',
            'teli' => 'Teli',
            'lex' => 'Lexicon',
            'prj' => 'Project'
        );

        return $map_resource_type_to_classname_arr[$resource_type];
    }

    /**
     * @param $name
     * @return array
     */
    public function getResourceByName($name)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT r FROM ' . $this->getEntityName() . ' r WHERE r.name=:arg_name')
                    ->setParameter('arg_name', $name)
                    ->getResult();
    }

    /**
     * @param $resource_name
     * @return mixed
     */
    public function getResourceWithUsernameByName($resource_name)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT r, partial u.{id, username}
                        FROM ' . $this->getEntityName() . ' r
                        JOIN r.user u
                        LEFT JOIN r.flags f
                        WHERE f IS NULL
                        AND r.name=:arg_resource_name')
                    ->setParameter('arg_resource_name', $resource_name)
                    ->getOneOrNullResult();
    }

    /**
     * @param array $arr_tags
     * @param array $arr_tags_ignore
     * @param int $tag_cnt
     * @return array
     * @throws \Exception
     */
    public function getDataForOverview(Array $arr_tags, Array $arr_tags_ignore, $tag_cnt = 0)
    {
        $max_tags = count($arr_tags);
        if ((null === $tag_cnt) || $tag_cnt > $max_tags || $tag_cnt < 0) {
            throw new \Exception('invalid $tag_cnt: ' . $tag_cnt);
        }
        $map_dst = array_fill(1, $max_tags, 0);
        $map_all = array_fill(1, $max_tags, 0);

        $query = $this->getEntityManager()
                       ->createQueryBuilder()
                       ->select('COUNT(DISTINCT t.text) AS tag_cnt_dst', 'COUNT(t.text) AS tag_cnt_all')
                       ->from($this->getEntityName(), 'r')
                       ->innerJoin('r.rel_tags', 'rt')
                       ->innerJoin('rt.tag', 't')
                       ->leftJoin('r.flags', 'f')
                       ->where('f IS NULL')
                       ->andWhere('t.text IN (:tags)')
                       ->groupBy('r.id')
                       ->orderBy('r.id', 'ASC')
                       ->setParameter('tags', $arr_tags);

        if (!empty($arr_tags_ignore)) {
            $query->andWhere('t.text NOT IN (:tags_ignore)')
                  ->setParameter('tags_ignore', $arr_tags_ignore);
            $queryExist = $this->getEntityManager()->createQueryBuilder()
                ->select('rrt')
                ->from('VitoopInfomgmtBundle:RelResourceTag', 'rrt')
                ->innerJoin('rrt.tag', 't2', 'WITH', 't2.text IN (:tags_ignore)')
                ->where('rrt.resource = r.id');
            $query->andWhere($query->expr()->not($query->expr()->exists($queryExist->getDQL())));
        }

        $result = $query->getQuery()->getResult();

        $arr_tag_cnt_dst = array_map(function ($val) {
            return $val['tag_cnt_dst'];
        }, $result);
        $arr_tag_cnt_all = array_map(function ($val) {
            return $val['tag_cnt_all'];
        }, $result);

        array_map(function ($dst, $all) use (&$map_dst, &$map_all) {
            $map_dst[$dst] += 1;
            $map_all[$dst] += $all;
        }, $arr_tag_cnt_dst, $arr_tag_cnt_all);

        return array($map_dst, $map_all);
    }

    /**
     * getAllResourcesByTags()
     *
     * @param array $arr_tags
     * @param array $arr_tags_ignore
     * @param array $arr_tags_highlight
     * @param int $tag_cnt
     *
     * @return Pagerfanta
     */
    public function getResourcesByTags(Array $arr_tags, Array $arr_tags_ignore, Array $arr_tags_highlight, $tag_cnt = 0)
    {
        $max_tags = count($arr_tags);
        if (is_null($tag_cnt) || $tag_cnt > $max_tags || $tag_cnt <= 0) {
            $tag_cnt = $max_tags;
        }
        /* @var $qb \Doctrine\ORM\Querybuilder */
        $qb = $this->getEntityManager()
                   ->createQueryBuilder();

        $qb->select('r', 'partial u.{id, username}', 'COUNT(DISTINCT t.text)', 'COUNT(t.text) AS HIDDEN quantity_all')
           ->from($this->getEntityName(), 'r')
           ->innerJoin('r.user', 'u')
           ->innerJoin('r.rel_tags', 'rt')
           ->leftJoin('r.flags', 'f')
           ->where('f IS NULL')
           ->andWhere('t.text IN (:tags)')
           ->andWhere('rt.deletedByUser is null')
           ->groupBy('r')
           ->having('COUNT(DISTINCT t.text) = :tag_cnt')
           ->setParameters(array(
                'tags' => $arr_tags,
                'tag_cnt' => $tag_cnt
           ));

        if (!empty($arr_tags_ignore)) {
            $qb->innerJoin('rt.tag', 't', 'WITH', 't.text NOT IN (:tags_ignore)')
                ->setParameter('tags_ignore', $arr_tags_ignore);
            $queryExist = $this->getEntityManager()->createQueryBuilder()
                ->select('rrt')
                ->from('VitoopInfomgmtBundle:RelResourceTag', 'rrt')
                ->innerJoin('rrt.tag', 't2', 'WITH', 't2.text IN (:tags_ignore)')
                ->where('rrt.resource = r.id');
            $qb->andWhere($qb->expr()->not($qb->expr()->exists($queryExist->getDQL())));
        } else {
            $qb->innerJoin('rt.tag', 't');
        }

        if (!empty($arr_tags_highlight)) {
            $qb->leftJoin('rt.tag', 'th', 'WITH', 'th.text IN (:tags_highlight)')
                ->addSelect('COUNT(DISTINCT th.text) AS HIDDEN sort_order')
                ->addSelect('COUNT(th.text) AS HIDDEN quantity_highlight')
                ->orderBy('sort_order', 'DESC')
                ->addOrderBy('quantity_highlight', 'DESC')
                ->addOrderBy('quantity_all', 'DESC')
                ->setParameter('tags_highlight', $arr_tags_highlight);
        } else {
            $qb->orderBy('quantity_all', 'DESC');
        }
        $qb->addOrderBy('r.name', 'ASC');

        $query = $qb->getQuery();

        /* @var $merge_qb \Doctrine\ORM\Querybuilder */
        $merge_qb = $this->getEntityManager()
                         ->createQueryBuilder();

        if (('Vitoop\InfomgmtBundle\Entity\Lexicon' == $this->getEntityName()) or ('Vitoop\InfomgmtBundle\Entity\Project' == $this->getEntityName())) {
            $merge_query = $merge_qb->select('l_or_p.id', 'COUNT(rr1.id) AS res12count')
                                    ->from($this->getEntityName(), 'l_or_p')
                                    ->innerJoin('l_or_p.rel_resources1', 'rr1')
                                    ->innerJoin('rr1.resource2', 'r2')
                                    ->leftJoin('r2.flags', 'f2')
                                    ->where('f2 IS NULL')
                                    ->groupBy('l_or_p.id');
        } else {
            $merge_query = $merge_qb->select('r.id', 'COUNT(rr2.id) AS res12count')
                                    ->from($this->getEntityName(), 'r')
                                    ->innerJoin('r.rel_resources2', 'rr2')
                                    ->innerJoin('rr2.resource1', 'r1')
                                    ->leftJoin('r1.flags', 'f1')
                                    ->where('f1 IS NULL')
                                    ->andWhere('r1 INSTANCE OF Vitoop\InfomgmtBundle\Entity\Lexicon OR r1 INSTANCE OF Vitoop\InfomgmtBundle\Entity\Project')
                                    ->groupBy('r.id');
        }
        $avgmark_qb = $this->getEntityManager()
                           ->createQueryBuilder();
        $avgmark_query = $avgmark_qb->select('r.id', 'AVG(ra.mark) AS avgmark')
                                    ->from($this->getEntityName(), 'r')
                                    ->leftJoin('r.ratings', 'ra')
                                    ->leftJoin('r.flags', 'f')
                                    ->where('f IS NULL')
                                    ->groupBy('r.id');

        $ad = new ResourceListWithTagCountAdapter(new DoctrineORMAdapter($query, false));
        $ad->setMergeQuery($merge_query);
        $ad->setAvgmarkQuery($avgmark_query);

        $pf = new Pagerfanta($ad);

        return $pf;
    }

    /**
     * Retrieve all distinct names of Resources1
     * @param Resource $resource2
     * @return array
     */
    public function getAllNamesOfResources1(Resource $resource2, $user = null)
    {
        $result = $this->getEntityManager()
                       ->createQuery('SELECT DISTINCT(r.name) AS name
                        FROM ' . $this->getEntityName() . ' r
                        JOIN r.rel_resources1 rr
                        LEFT JOIN r.flags f
                        WHERE rr.resource2=:arg_resource2
                        AND f IS NULL
                        ORDER BY r.name ASC')
                       ->setParameter('arg_resource2', $resource2)
                       ->getResult();

        return $result;
    }

    public function getResource1IdListByUser(Resource $resource2, $user)
    {
        $arr_result = $this->getEntityManager()
                           ->createQuery('SELECT r.id
                                    FROM ' . $this->getEntityName() . ' r
                                    JOIN r.rel_resources1 rr
                                    LEFT JOIN r.flags f
                                    WHERE rr.resource2=:arg_resource2
                                    AND rr.user =:arg_user
                                    AND f IS NULL
                                    ORDER BY r.name ASC')
                           ->setParameters(array('arg_resource2' => $resource2, 'arg_user' => $user))
                           ->getResult();

        $arr_result = Helper::flatten_array($arr_result, 'id');

        return $arr_result;
    }

    /**
     * Retrieves all Resources1 with id and count and notset is_own fields
     * @param Resource $resource2
     * @return array
     */

    public function countAllResources1(Resource $resource2)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT r.id, r.name, COUNT(r.id) AS cnt_res, 0 AS is_own
                        FROM ' . $this->getEntityName() . ' r
                        JOIN r.rel_resources1 rr
                        LEFT JOIN r.flags f
                        WHERE rr.resource2=:arg_resource2
                        AND f IS NULL
                        GROUP BY r.id
                        ORDER BY r.name ASC')
                    ->setParameter('arg_resource2', $resource2)
                    ->getResult();
    }

    /*@TODO Where is this used? Is it a Utility for Quicksearch?*/
    public function getAllResourcesByFirstLetter($letter)
    {

        $array_result = $this->getEntityManager()
                             ->createQuery('SELECT r FROM VitoopInfomgmtBundle:Resource r WHERE r.name LIKE :arg_letter ORDER BY r.name ASC')
                             ->setParameter('arg_letter', $letter . "%")
                             ->getResult();

        if (!$array_result) {
            return null;
        }
        /*
         * $array_result is: array(array('text' => 'var1'), array('text' =>
         * 'var2'), ...) and will be transformed with this code to a JavaScript
         * Array Literal: ['var1','var2',...] $string_result = array_map(function
         * ($arr) { $arr = array_values($arr); return $arr[0]; }, $array_result);
         * $string_result = implode('","', $string_result); $string_result = '["'
         * . $string_result . '"]';
         */
        $string_result = array_map(function ($arr_element) {
            $arr_resource_name = array(
                0 => "Resource",
                1 => "Pdf",
                2 => "Address",
                3 => "Link",
                4 => "Teli",
                5 => "Lexicon",
                6 => "Project"
            );

            return $arr_element->getName() . ' - ' . $arr_resource_name[$arr_element->getResourceTypeIdx()];
        }, $array_result);
        $string_result = implode('","', $string_result);
        $string_result = '["' . $string_result . '"]';

        return $string_result;
    }

    /**
     * @param Resource $resource1
     * @return Pagerfanta
     */

    public function getResources2ByResource1(Resource $resource1)
    {
        return $this->versatile_getResources($resource1);
    }

    /**
     * @return Pagerfanta
     */
    public function getResources()
    {
        return $this->versatile_getResources();
    }

    /**
     * @param Resource $resource1
     * @return Pagerfanta
     */
    protected function versatile_getResources(Resource $resource1 = null)
    {
        /* @var $qb \Doctrine\ORM\Querybuilder */
        $qb = $this->getEntityManager()
                   ->createQueryBuilder();

        $qb->select('r', 'partial u.{id, username}', 'AVG(ra.mark) AS avgmark')
           ->from($this->getEntityName(), 'r')
           ->innerJoin('r.user', 'u')
           ->leftJoin('r.ratings', 'ra')
           ->leftJoin('r.flags', 'f')
           ->where('f IS NULL')
           ->groupBy('r.id');
        if ($resource1) {
            $qb->innerJoin('r.rel_resources2', 'rr2')
               ->andWhere('rr2.resource1 = :arg_resource1')
               ->setParameter('arg_resource1', $resource1);
            if ($resource1->getResourceTypeIdx() == 5) {
                $qb->leftJoin('Vitoop\InfomgmtBundle\Entity\RelResourceResource', 'rrrc', 'WITH', 'rrrc.resource2 = r and rrrc.resource1 = :arg_resource1');
                $qb->addSelect('COUNT(DISTINCT rrrc.id) as HIDDEN cn');
                $qb->orderBy('cn', 'DESC');
                $qb->addOrderBy('rr2.coefficient', 'DESC');
            } else {
                $qb->orderBy('rr2.coefficient', 'DESC');
            }
            $qb->addOrderBy('r.created_at', 'DESC');
        } else {
            $qb->orderBy('r.created_at', 'DESC');
        }

        $query = $qb->getQuery();

        /* @var $merge_qb \Doctrine\ORM\Querybuilder */
        $merge_qb = $this->getEntityManager()
                         ->createQueryBuilder();

        if (('Vitoop\InfomgmtBundle\Entity\Lexicon' == $this->getEntityName()) or ('Vitoop\InfomgmtBundle\Entity\Project' == $this->getEntityName())) {
            // @TODO Here is no logic if $resource1 is given... talk to david
            $merge_query = $merge_qb->select('l_or_p.id', 'COUNT(rr1.id) AS res12count')
                                    ->from($this->getEntityName(), 'l_or_p')
                                    ->innerJoin('l_or_p.rel_resources1', 'rr1')
                                    ->innerJoin('rr1.resource2', 'r2')
                                    ->leftJoin('r2.flags', 'f2')
                                    ->where('f2 IS NULL')
                                    ->groupBy('l_or_p.id');
        } else {
            $merge_qb->select('r.id', 'COUNT(rr2.id) AS res12count')
                     ->from($this->getEntityName(), 'r')
                     ->innerJoin('r.rel_resources2', 'rr2')
                     ->innerJoin('rr2.resource1', 'r1')
                     ->leftJoin('r1.flags', 'f1')
                     ->where('f1 IS NULL');

            if ($resource1) {
                $merge_qb->andWhere('rr2.resource1 = :arg_resource1')
                         ->setParameter('arg_resource1', $resource1);
            } else {
                $merge_qb->andWhere('r1 INSTANCE OF Vitoop\InfomgmtBundle\Entity\Lexicon OR r1 INSTANCE OF Vitoop\InfomgmtBundle\Entity\Project');
            }
            $merge_qb->groupBy('r.id');
            // unfortunately the merge_query is a querybuilder ;-)
            $merge_query = $merge_qb;
        }

        $ad = new ResourceListAdapter(new DoctrineORMAdapter($query, false));
        $ad->setMergeQuery($merge_query);
        $pf = new Pagerfanta($ad);

        return $pf;
    }

    /**
     * @return Pagerfanta
     */
    public function getFlaggedResources()
    {
        /* @var $qb \Doctrine\ORM\Querybuilder */
        $qb = $this->getEntityManager()
                   ->createQueryBuilder();

        $qb->select('r', 'partial u.{id, username}', '\'na\'  AS avgmark')
           ->from($this->getEntityName(), 'r')
           ->innerJoin('r.user', 'u')
           ->leftJoin('r.flags', 'f')
           ->where('f IS NOT NULL')
           ->andWhere('f.type != 128')
           ->orderBy('r.created_at', 'DESC');

        $query = $qb->getQuery();

        /* @var $merge_qb \Doctrine\ORM\Querybuilder */
        $merge_qb = $this->getEntityManager()
                         ->createQueryBuilder();

        $merge_query = $merge_qb->select('r.id', '\'na\' AS res12count')
                                ->from($this->getEntityName(), 'r');

        $ad = new ResourceListAdapter(new DoctrineORMAdapter($query, false));
        $ad->setMergeQuery($merge_query);
        $pf = new Pagerfanta($ad);

        return $pf;
    }

    protected function OLDversatile_getResources(Resource $resource1 = null)
    {
        /* @var $qb \Doctrine\ORM\Querybuilder */
        $qb = $this->getEntityManager()
                   ->createQueryBuilder();

        $qb->select('r', 'partial u.{id, username}', 'AVG(ra.mark) AS avgmark')
           ->from($this->getEntityName(), 'r')
           ->innerJoin('r.user', 'u')
           ->leftJoin('r.ratings', 'ra')
           ->leftJoin('r.flags', 'f')
           ->where('f IS NULL');
        If ($resource1) {
            $qb->innerJoin('r.rel_resources2', 'rr2')
               ->andWhere('rr2.resource1 = :arg_resource1')
               ->setParameter('arg_resource1', $resource1);
        }
        $qb->groupBy('r.id')
           ->orderBy('r.created_at', 'DESC');

        $query = $qb->getQuery();

        /* @var $merge_qb \Doctrine\ORM\Querybuilder */
        $merge_qb = $this->getEntityManager()
                         ->createQueryBuilder();

        if (('Vitoop\InfomgmtBundle\Entity\Lexicon' == $this->getEntityName()) or ('Vitoop\InfomgmtBundle\Entity\Project' == $this->getEntityName())) {
            // @TODO Here is no logic if $resource1 is given... talk to david
            $merge_query = $merge_qb->select('l_or_p.id', 'COUNT(rr1.id) AS res12count')
                                    ->from($this->getEntityName(), 'l_or_p')
                                    ->innerJoin('l_or_p.rel_resources1', 'rr1')
                                    ->innerJoin('rr1.resource2', 'r2')
                                    ->leftJoin('r2.flags', 'f2')
                                    ->where('f2 IS NULL')
                                    ->groupBy('l_or_p.id');
        } else {
            $merge_qb->select('r.id', 'COUNT(rr2.id) AS res12count')
                     ->from($this->getEntityName(), 'r')
                     ->innerJoin('r.rel_resources2', 'rr2')
                     ->innerJoin('rr2.resource1', 'r1')
                     ->leftJoin('r1.flags', 'f1')
                     ->where('f1 IS NULL');

            if ($resource1) {
                $merge_qb->andWhere('rr2.resource1 = :arg_resource1')
                         ->setParameter('arg_resource1', $resource1);
            } else {
                $merge_qb->andWhere('r1 INSTANCE OF Vitoop\InfomgmtBundle\Entity\Lexicon OR r1 INSTANCE OF Vitoop\InfomgmtBundle\Entity\Project');
            }
            $merge_qb->groupBy('r.id');
            // unfortunately the merge_query is a querybuilder ;-)
            $merge_query = $merge_qb;
        }

        $ad = new ResourceListAdapter(new DoctrineORMAdapter($query, false));
        $ad->setMergeQuery($merge_query);
        $pf = new Pagerfanta($ad);

        return $pf;
    }

    public function getResourceTabsInfo(Resource $resource, User $user)
    {
        return $this->createQueryBuilder('r')
            ->select('count(DISTINCT rm.id) as remarks')
            ->addSelect('count(DISTINCT rmp.id) as remarks_private')
            ->addSelect('count(DISTINCT cm.id) as comments')
            ->addSelect('count(DISTINCT rrr.id) as rels')
            ->leftJoin('r.remarks', 'rm')
            ->leftJoin('r.remarksPrivate', 'rmp', 'WITH', 'rmp.user = :user')
            ->leftJoin('r.comments', 'cm')
            ->leftJoin('VitoopInfomgmtBundle:RelResourceResource', 'rrr', 'WITH', 'r.id = rrr.resource2')
            ->where('r = :resource')
            ->setParameter('resource', $resource)
            ->setParameter('user', $user)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
