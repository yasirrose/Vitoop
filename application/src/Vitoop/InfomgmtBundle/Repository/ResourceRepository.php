<?php
namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Vitoop\InfomgmtBundle\Entity\Flag;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Link;
use Vitoop\InfomgmtBundle\Entity\Book;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Teli;
use Vitoop\InfomgmtBundle\Entity\Address;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Pagination\ResourceListWithTagCountAdapter;
use Vitoop\InfomgmtBundle\Pagination\ResourceListAdapter;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\Pagerfanta;
use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;

/*
 * ResourceRepository
 */
class ResourceRepository extends ServiceEntityRepository
{
    /**
     * ResourceRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, $this->getEntityClass());
    }

    /**
     * @return string
     */
    public function getEntityClass()
    {
        return Resource::class;
    }

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
            'book' => 'Book',
            'conversation' => 'Conversation'
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

        $qb->addSelect('COUNT(DISTINCT rt.id) as count_different', 'COUNT(t.text) AS HIDDEN quantity_all')
           ->innerJoin('r.rel_tags', 'rt')
           ->andWhere('t.text IN (:tags)')
           ->andWhere('rt.deletedByUser is null')
           ->addGroupBy('r.id')
           ->setParameter('tags', $search->tags);

        if ($search->countTags != 0) {
            $qb->having('COUNT(DISTINCT t.text) >= :tag_cnt');
            $qb->setParameter('tag_cnt', $search->countTags);
        }

        if (!empty($search->ignoredTags)) {
            $queryExist = $this->getEntityManager()->createQueryBuilder()
                ->select('rrt')
                ->from('VitoopInfomgmtBundle:RelResourceTag', 'rrt')
                ->innerJoin('rrt.tag', 't2', 'WITH', 't2.text IN (:tags_ignore)')
                ->where('rrt.resource = r.id')
                ->setParameter('tags_ignore', $search->ignoredTags);;
            
            $qb->innerJoin('rt.tag', 't', 'WITH', 't.text NOT IN (:tags_ignore)')
                ->setParameter('tags_ignore', $search->ignoredTags);

            $qb->andWhere($qb->expr()->not($qb->expr()->exists($queryExist->getDQL())));
        } else {
            $qb->innerJoin('rt.tag', 't');
        }

        if (!empty($search->highlightTags)) {
            $qb->leftJoin('rt.tag', 'th', 'WITH', 'th.text IN (:tags_highlight)')
                ->addSelect('COUNT(DISTINCT th.text) AS HIDDEN sort_order')
                ->addSelect('COUNT(th.text) AS HIDDEN quantity_highlight')
                ->addOrderBy('sort_order', 'DESC')
                ->addOrderBy('quantity_highlight', 'DESC');
            if ($search->countTags == 0) {
                $qb->addOrderBy('count_different', 'DESC');
            }
            $qb->addOrderBy('quantity_all', 'DESC')
                ->setParameter('tags_highlight', $search->highlightTags);
        } else {
            $qb->addOrderBy('count_different', 'DESC');
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

        return array_column($arr_result, 'id');
    }

    /**
     * Retrieves all Resources1 with id and count and notset is_own fields
     * @param Resource $resource2
     * @return array
     */

    public function countAllResources1(Resource $resource2, User $user)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT r.id, r.name, COUNT(r.id) AS cnt_res, (CASE WHEN rr.user = :user THEN 1 THEN 0 END) AS is_own
                        FROM ' . $this->getEntityName() . ' r
                        JOIN r.rel_resources1 rr
                        LEFT JOIN r.flags f
                        WHERE rr.resource2=:arg_resource2
                        AND f.id IS NULL
                        AND rr.deletedByUser is null
                        GROUP BY r.id, is_own
                        ORDER BY r.name ASC')
                    ->setParameter('arg_resource2', $resource2)
                    ->setParameter('user', $user)
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
            ->addSelect('r.id, r.name, CONCAT(r.created_at,\'\') AS created_at, u.username, AVG(ra.mark) as avgmark, COUNT(DISTINCT rrr.id) as res12count, COUNT(uh.id) as isUserHook, COUNT(ur.id) as isUserRead')
            ->innerJoin('r.user', 'u')
            ->leftJoin('r.flags', 'f')
            ->leftJoin('r.ratings', 'ra')
            ->leftJoin('r.userHooks', 'uh', 'WITH', 'uh.user = :currentUser')
            ->leftJoin('r.userReads', 'ur', 'WITH', 'ur.user = :currentUser')
            ->groupBy('r.id')
            ->setParameter('currentUser', $search->user);
        $rootEntity = $query->getRootEntities();
        $rootEntity = $rootEntity[0];
        if (($rootEntity == 'Vitoop\InfomgmtBundle\Entity\Lexicon') || ($rootEntity == 'Vitoop\InfomgmtBundle\Entity\Project')) {
            $query->leftJoin('r.rel_resources1', 'rrr');
        } else {
            $query->leftJoin('r.rel_resources2', 'rrr');
        }
        if ($search->flagged) {
            $query->andWhere('f.id IS NOT NULL')
                ->andWhere('f.type != 128');
        } else {
            $query->andWhere('f.id IS NULL');
        }

        if ($search->searchString) {
            $searchString = implode('OR ', array_map(function ($field) use ($rootEntity) {
                $alias =  $this->getResourceFieldAlias($field, $rootEntity);
                
                return $alias.$field . ' LIKE :searchString ';
            }, $search->columns->searchable));

            $query
                ->andWhere($searchString)
                ->setParameter('searchString', '%'.$search->searchString.'%');
        }

        if ($search->columns->sortableColumn) {
            $sortAlias = $this->getResourceFieldAlias($search->columns->sortableColumn, $rootEntity);
            $query
                ->addOrderBy(
                    $sortAlias.$search->columns->sortableColumn,
                    $search->columns->sortableOrder
                );
        }
        
        if (!is_null($search->resource)) {
            $this->prepareListByResourceQueryBuilder($query, $search->resource);
        } elseif (!empty($search->tags)) {
            $this->prepareListByTagsQueryBuilder($query, $search);
        }

        
        if (1 === $search->isUserHook) {
            $query->andHaving('isUserHook > 0');
        }
        if (1 === $search->isUserRead) {
            $query->andHaving('isUserRead > 0');
        }

        if ($search->resourceId) {
            $query->andWhere('r.id = :resourceId')
                  ->setParameter('resourceId', $search->resourceId);
        }

        $query
            ->addOrderBy('r.created_at', 'DESC')
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
            ->addGroupBy('rr2.id')
            ->addGroupBy('rr2.coefficient')
            ->addOrderBy('rr2.coefficient', 'ASC')
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

    public function getCountByTags(SearchResource $search)
    {
        return [
            'prjc' => $this->getSearchTotal($search, Project::class, Project::getSearcheableColumns()),
            'lexc' => $this->getSearchTotal($search, Lexicon::class, Lexicon::getSearcheableColumns()),
            'pdfc' => $this->getSearchTotal($search, Pdf::class, Pdf::getSearcheableColumns()),
            'telic' => $this->getSearchTotal($search, Teli::class, Teli::getSearcheableColumns()),
            'linkc' => $this->getSearchTotal($search, Link::class, Link::getSearcheableColumns()),
            'adrc' => $this->getSearchTotal($search, Address::class, Address::getSearcheableColumns()),
            'bookc' => $this->getSearchTotal($search, Book::class, Book::getSearcheableColumns())
        ];
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

    public function findResourcesForCheckUrl($limit = 10)
    {
        return $this->createQueryBuilder('r')
            ->innerJoin('r.user', 'u')
            ->leftJoin('r.flags', 'f')
            ->where('f.id IS NULL or (f.type = :blamed and r.lastCheckAt <= :yesterday)')
            ->andWhere('r.isSkip = :isSkip')
            ->orderBy('r.lastCheckAt', 'ASC')
            ->setMaxResults($limit)
            ->setParameter('isSkip', false)
            ->setParameter('blamed', Flag::FLAG_BLAME)
            ->setParameter('yesterday', new \DateTime('yesterday'))
            ->getQuery()
            ->getResult()
        ;
    }

    /**
     * @param array $resourceIds
     * @return array
     */
    public function findSendLinkViewsByResourceIds(array $resourceIds)
    {
        return $this->createQueryBuilder('r')
            ->select('DISTINCT r, rem')
            ->leftJoin('r.remarks', 'rem')
            ->where('r.id IN (:ids)')
            ->setParameter('ids', $resourceIds)
            ->orderBy('field(r.id, '.implode(',', $resourceIds).')')
            ->getQuery()
            ->getResult();
    }

    private function getSearchTotal(SearchResource $search, $class, $columns = null)
    {
        //remove order
        $totalSearch = clone $search;
        $totalSearch->columns->sortableColumn = null;
        $totalSearch->columns->sortableOrder = null;

        if ($columns) {
            $totalSearch->columns->searchable = $columns;
        }
        
        $this->_em->getRepository($class)->getResources($totalSearch);

        return $this->_em->getRepository($class)
            ->getResourcesTotal($totalSearch);
    }
    
    private function getResourceFieldAlias($field, $rootEntity)
    {
        switch ($field){
            case 'username':
                return 'u.';
            case 'avgmark':
            case 'res12count':
            case 'coef':
                return '';
            case 'url':
                if ($rootEntity == 'Vitoop\InfomgmtBundle\Entity\Lexicon') {
                    return '';
                }
            default:
                return 'r.';
        }
    }

    public function getResourcesWithDividers(SearchResource $searchResource)
    {
        /**
         * @var QueryBuilder $queryBuilder
         */
        $queryBuilder = $this->getResourcesQuery($searchResource);
        $queryBuilder->addSelect("'' as text");
        $queryBuilder->resetDQLPart('orderBy');
        $queryBuilder
            ->setFirstResult(null)
            ->setMaxResults(null);

        $innerResourceQuery = $this->getRunnableQueryAndParametersForQuery($queryBuilder->getQuery());

        $sql = sprintf(
            $this->getDividerQuery(),
            $innerResourceQuery['sql'],
            $searchResource->resource,
            $searchResource->paging->limit,
            $searchResource->paging->offset
        );

        $stmt = $this->getEntityManager()->getConnection()->prepare($sql);
        $stmt->execute($innerResourceQuery['params']);

        return $stmt->fetchAll();
    }

    protected function getDividerQuery()
    {
    }

    /**
     * @param Query $query
     * @return array An array with 3 indexes, sql the SQL statement with parameters as ?, params the ordered parameters, and paramTypes as the types each parameter is.
     */
    public static function getRunnableQueryAndParametersForQuery(Query $query)
    {
        $sql = $query->getSQL();
        $c = new \ReflectionClass('Doctrine\ORM\Query');
        $parser = $c->getProperty('_parserResult');
        $parser->setAccessible(true);
        /** @var \Doctrine\ORM\Query\ParserResult $parser */
        $parser = $parser->getValue($query);
        $resultSet = $parser->getResultSetMapping();

        // Change the aliases back to what was originally specified in the QueryBuilder.
        $sql = preg_replace_callback('/AS\s([a-zA-Z0-9_]+)/',function($matches) use($resultSet) {
            $ret = 'AS ';
            if($resultSet->isScalarResult($matches[1]))
                $ret.=$resultSet->getScalarAlias($matches[1]);
            else
                $ret.=$matches[1];
            return $ret;
        },$sql);
        $m = $c->getMethod('processParameterMappings');
        $m->setAccessible(true);
        list($params,$types)= $m->invoke($query,$parser->getParameterMappings());

        return ['sql' => $sql, 'params' => $params,'paramTypes' => $types];
    }
}
