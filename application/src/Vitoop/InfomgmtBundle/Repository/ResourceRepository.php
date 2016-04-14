<?php
namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Pagination\ResourceListWithTagCountAdapter;
use Vitoop\InfomgmtBundle\Pagination\ResourceListAdapter;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

/*
 * ResourceRepository
 */
class ResourceRepository extends EntityRepository
{
    //\Doctrine\Common\Util\Debug::dump($result);die();

    /**
     * @param SearchResource $search
     * @return QueryBuilder
     */
    public function getResourcesQuery(SearchResource $search)
    {
        
    }
    
    protected function map_resource_type_to_classname($resource_type)
    {

        $map_resource_type_to_classname_arr = array(
            'res' => 'Resource',
            'pdf' => 'Pdf',
            'adr' => 'Address',
            'link' => 'Link',
            'teli' => 'Teli',
            'lex' => 'Lexicon',
            'prj' => 'Project',
            'book' => 'Book'
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
                        WHERE f.id IS NULL
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
                       ->where('f.id IS NULL')
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
     * @param QueryBuilder $qb
     * @param SearchResource $search
     *
     * @return QueryBuilder
     */
    public function prepareListByTagsQueryBuilder(QueryBuilder $qb, SearchResource $search)
    {
        $max_tags = count($search->tags);
        if (is_null($search->countTags) || $search->countTags > $max_tags || $search->countTags < 0) {
            $search->countTags = $max_tags;
        }

        $qb->addSelect('COUNT(DISTINCT t.text) as count_different', 'COUNT(t.text) AS HIDDEN quantity_all')
           ->innerJoin('r.rel_tags', 'rt')
           ->andWhere('t.text IN (:tags)')
           ->andWhere('rt.deletedByUser is null')
           ->groupBy('r.id')
           ->setParameters(array(
                'tags' => $search->tags
           ));

        if ($search->countTags != 0) {
            $qb->having('COUNT(DISTINCT t.text) = :tag_cnt');
            $qb->setParameter('tag_cnt', $search->countTags);
        }

        if (!empty($search->ignoredTags)) {
            $qb->innerJoin('rt.tag', 't', 'WITH', 't.text NOT IN (:tags_ignore)')
                ->setParameter('tags_ignore', $search->ignoredTags);
            $queryExist = $this->getEntityManager()->createQueryBuilder()
                ->select('rrt')
                ->from('VitoopInfomgmtBundle:RelResourceTag', 'rrt')
                ->innerJoin('rrt.tag', 't2', 'WITH', 't2.text IN (:tags_ignore)')
                ->where('rrt.resource = r.id');
            $qb->andWhere($qb->expr()->not($qb->expr()->exists($queryExist->getDQL())));
        } else {
            $qb->innerJoin('rt.tag', 't');
        }

        if (!empty($search->highlightTags)) {
            $qb->leftJoin('rt.tag', 'th', 'WITH', 'th.text IN (:tags_highlight)')
                ->addSelect('COUNT(DISTINCT th.text) AS HIDDEN sort_order')
                ->addSelect('COUNT(th.text) AS HIDDEN quantity_highlight')
                ->orderBy('sort_order', 'DESC')
                ->addOrderBy('quantity_highlight', 'DESC');
            if ($search->countTags == 0) {
                $qb->addOrderBy('count_different', 'DESC');
            }
                $qb->addOrderBy('quantity_all', 'DESC')
                ->setParameter('tags_highlight', $search->highlightTags);
        } else {
            $qb->orderBy('count_different', 'DESC');
            $qb->addOrderBy('quantity_all', 'DESC');
        }
        $qb->addOrderBy('r.name', 'ASC');

        return $qb;
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
                        AND f.id IS NULL
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
                                    AND f.id IS NULL
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
                        AND f.id IS NULL
                        AND rr.deletedByUser is null
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
                6 => "Project",
                7 => "Book"
            );

            return $arr_element->getName() . ' - ' . $arr_resource_name[$arr_element->getResourceTypeIdx()];
        }, $array_result);
        $string_result = implode('","', $string_result);
        $string_result = '["' . $string_result . '"]';

        return $string_result;
    }

    /**
     * @param QueryBuilder $query
     * @param bool $flagged
     * @return QueryBuilder
     */
    protected function prepareListQueryBuilder(QueryBuilder $query, SearchResource $search)
    {
        $query
            ->addSelect('r.id, r.name, CONCAT(r.created_at,\'\') AS created_at, u.username, AVG(ra.mark) as avgmark, COUNT(DISTINCT rrr.id) as res12count')
            ->innerJoin('r.user', 'u')
            ->leftJoin('r.flags', 'f')
            ->leftJoin('r.ratings', 'ra')
            ->groupBy('r.id')
            ->addOrderBy('r.created_at', 'DESC');
        $rootEntity = $query->getRootEntities();
        $rootEntity = $rootEntity[0];
        if (($rootEntity == 'Vitoop\InfomgmtBundle\Entity\Lexicon') || ($rootEntity == 'Vitoop\InfomgmtBundle\Entity\Project')) {
            $query->leftJoin('r.rel_resources1', 'rrr');
        } else {
            $query->leftJoin('r.rel_resources2', 'rrr');
        }
        if ($search->flagged) {
            $query->where('f.id IS NOT NULL')
                ->andWhere('f.type != 128');
        } else {
            $query->where('f.id IS NULL');
        }

        if ($search->searchString) {
            $searchString = implode('OR ', array_map(function ($field) {
                $alias = 'username'==$field?'u.':'r.';
                return $alias.$field . ' LIKE :searchString ';
            }, $search->columns->searchable));

            $query
                ->andWhere($searchString)
                ->setParameter('searchString', '%'.$search->searchString.'%');
        }

        if (!is_null($search->resource)) {
            $this->prepareListByResourceQueryBuilder($query, $search->resource);
        } elseif (!empty($search->tags)) {
            $this->prepareListByTagsQueryBuilder($query, $search);
        }

        if ($search->columns->sortableColumn) {
            $sortAlias = $this->getResourceFieldAlias($search->columns->sortableColumn, $rootEntity);
            $query
                ->orderBy(
                    $sortAlias.$search->columns->sortableColumn,
                    $search->columns->sortableOrder
                );
        }
        
        $query
            ->setFirstResult($search->paging->offset)
            ->setMaxResults($search->paging->limit);

        return $query;
    }

    /**
     * @param QueryBuilder $query
     * @return QueryBuilder
     */
    protected function prepareListByResourceQueryBuilder(QueryBuilder $query, $resource)
    {
        return $query->innerJoin('r.rel_resources2', 'rr2', 'WITH', 'rr2.deletedByUser is null')
            ->addSelect('rr2.coefficient as coef')
            ->addSelect('rr2.id as coefId')
            ->andWhere('rr2.resource1 = :resource')
            ->orderBy('rr2.coefficient', 'ASC')
            ->addOrderBy('r.created_at', 'DESC')
            ->setParameter('resource', $resource);
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
           ->where('f.id IS NOT NULL')
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

    public function getCountOfRelatedResources(Resource $resource)
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
            ->where('rrr.resource1 = :resource')
            ->setParameter('resource', $resource)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getResources(SearchResource $search)
    {
        return $this->getResourcesQuery($search)
            ->getQuery()
            ->setHint(
                \Doctrine\ORM\Query::HINT_CUSTOM_OUTPUT_WALKER,
                'Vitoop\\InfomgmtBundle\\Doctrine\\Walkers\\MysqlPaginationWalker'
            )
            ->setHint("mysqlWalker.sqlCalcFoundRows", true)
            ->getResult();
    }
    public function getResourcesTotal(SearchResource $search)
    { 
        return $this->_em->getConnection()->query('SELECT FOUND_ROWS()')->fetchColumn(0);
    }

    private function getResourceFieldAlias($field, $rootEntity)
    {
        switch ($field){
            case 'username':
                return 'u.';
            case 'avgmark':
            case 'res12count':
                return '';
            case 'url':
                if ($rootEntity == 'Vitoop\InfomgmtBundle\Entity\Lexicon') {
                    return '';
                }
            default:
                return 'r.';
        }
    }
}