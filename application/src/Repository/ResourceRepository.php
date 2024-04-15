<?php
namespace App\Repository;

use App\Entity\RelResourceTag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\Conversation;
use App\Entity\Flag;
use App\Entity\RelResourceResource;
use App\Entity\Resource;
use App\Entity\Project;
use App\Entity\Lexicon;
use App\Entity\Link;
use App\Entity\Book;
use App\Entity\Pdf;
use App\Entity\Teli;
use App\Entity\Address;
use App\Entity\User\User;
use App\Pagination\ResourceListWithTagCountAdapter;
use App\Pagination\ResourceListAdapter;
use App\DTO\Resource\SearchResource;
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
    private $registry;
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, $this->getEntityClass());
        $this->registry = $registry;
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
        return $this
            ->getEntityManager()
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
                ->from(RelResourceTag::class, 'rrt')
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
                ->from(RelResourceTag::class, 'rrt')
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
            $qb->addOrderBy('quantity_all', 'DESC');
            $qb->addOrderBy('count_different', 'DESC');
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
                    ->createQuery('SELECT r.id, r.name, COUNT(r.id) AS cnt_res, MAX(CASE WHEN rr.user = :user THEN 1 ELSE 0 END) AS is_own
                        FROM ' . $this->getEntityName() . ' r
                        JOIN r.rel_resources1 rr
                        LEFT JOIN r.flags f
                        WHERE rr.resource2=:arg_resource2
                        AND f.id IS NULL
                        AND rr.deletedByUser is null
                        GROUP BY r.id
                        ORDER BY r.name ASC')
                    ->setParameter('arg_resource2', $resource2)
                    ->setParameter('user', $user)
                    ->getResult();
    }

    /*@TODO Where is this used? Is it a Utility for Quicksearch?*/
    public function getAllResourcesByFirstLetter($letter)
    {

        $array_result = $this->getEntityManager()
                             ->createQuery('SELECT r FROM App\Entity\Resource r WHERE r.name LIKE :arg_letter ORDER BY r.name ASC')
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
            ->addSelect('r.id, r.name, CONCAT(r.created_at,\'\') AS created_at, u.username, AVG(ra.mark) as avgmark')
            ->addSelect('COUNT(rrr.id) as res12count')
            ->addSelect('COUNT(uh.id) as isUserHook')
            ->addSelect('COUNT(ur.id) as isUserRead')
            ->addSelect('COUNT(sm.id) as userSetEmail')
            ->addSelect('uh.color')
            ->innerJoin('r.user', 'u')
            ->leftJoin('r.flags', 'f')
            ->leftJoin('r.ratings', 'ra')
            ->leftJoin('r.userHooks', 'uh', 'WITH', 'uh.user = :currentUser')
            ->leftJoin('r.userReads', 'ur', 'WITH', 'ur.user = :currentUser')
            ->leftJoin('r.userSetEmail', 'sm', 'WITH', 'sm.user = :currentUser')
            ->groupBy('r.id')
            ->setParameter('currentUser', $search->user);
        $rootEntity = $query->getRootEntities();
        $rootEntity = $rootEntity[0];
        $isLexiconAndProject = \in_array($rootEntity, [Lexicon::class, Project::class, Conversation::class]);
        if ($isLexiconAndProject && null === $search->resource) {
            $query->leftJoin('r.rel_resources1', 'rrr');
        } elseif (null !== $search->resource) {
            $query->leftJoin('r.rel_resources2', 'rrr', 'WITH', 'rrr.deletedByUser is null');
        } else {
            $query->leftJoin('r.rel_resources2', 'rrr');
        }
        if ($search->flagged) {
            $query->andWhere('f.id IS NOT NULL')
            ->andWhere('f.type != 128');
        } else {
            $query->andWhere('f.id IS NULL OR f.type = :blamed')
            ->setParameter('blamed', Flag::FLAG_BLAME);
        }
        if ($search->searchString) {
            $searchString = implode('OR ', array_map(function ($field) use ($rootEntity) {
                $alias = $this->getResourceFieldAlias($field, $rootEntity);
                return $alias . $field . ' LIKE :searchString ';
            }, $search->columns->searchable));
            $query->andWhere($searchString)
                ->setParameter('searchString', '%' . $search->searchString . '%');
        }
        if ($search->columns->sortableColumn) {
            $sortAlias = $this->getResourceFieldAlias($search->columns->sortableColumn, $rootEntity);
            $sortableColumn = $search->columns->sortableColumn;
            if ((empty($search->dateTo) && empty($search->dateFrom)) && \in_array($search->columns->sortableColumn, ['pdfDate.order', 'releaseDate.order'])) {
                $sortAlias = '';
                $sortableColumn = 'orderDate';
            }
            $query->addOrderBy(
                $sortAlias . $sortableColumn,
                $search->columns->sortableOrder
            );
        }
        if (null !== $search->resource) {
            $this->prepareListByResourceQueryBuilder($query, $search->resource);
        } elseif (!empty($search->tags)) {
            $this->prepareListByTagsQueryBuilder($query, $search);
        }
        if (1 === $search->isUserHook) {
            $query->andHaving('isUserHook > 0');
        }
        if (($search->color != 'nobookmark') && (in_array($search->color, ['blue', 'red', 'lime', 'cyan', 'yellow', 'orange']))) {
            $query->andWhere('uh.color = :selectedColor')
            ->setParameter('selectedColor', $search->color);
        }
        if (1 === $search->isUserRead) {
            $query->andHaving('isUserRead > 0');
        }
        if (1 === $search->sendMail) {
            $query->andHaving('userSetEmail > 0');
        }
        if ($search->resourceId) {
            $query->andWhere('r.id = :resourceId')
            ->setParameter('resourceId', $search->resourceId);
        }
        $query->addOrderBy('r.created_at', 'DESC')
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
        return $query
            ->addSelect('rrr.coefficient as coef')
            ->addSelect('rrr.id as coefId')
            ->andWhere('rrr.resource1 = :resource')
            ->addOrderBy('rrr.coefficient', 'ASC')
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
            ->leftJoin(RelResourceResource::class, 'rrr', 'WITH', 'r.id = rrr.resource2')
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
            ->addSelect('count(conv.id) as convc')
            ->from(RelResourceResource::class, 'rrr')
            ->leftJoin(Project::class, 'prj', 'WITH', 'rrr.resource2 = prj.id')
            ->leftJoin(Lexicon::class, 'lex', 'WITH', 'rrr.resource2 = lex.id')
            ->leftJoin(Pdf::class, 'pdf', 'WITH', 'rrr.resource2 = pdf.id')
            ->leftJoin(Teli::class, 'teli', 'WITH', 'rrr.resource2 = teli.id')
            ->leftJoin(Link::class, 'link', 'WITH', 'rrr.resource2 = link.id')
            ->leftJoin(Address::class, 'adr', 'WITH', 'rrr.resource2 = adr.id')
            ->leftJoin(Book::class, 'book', 'WITH', 'rrr.resource2 = book.id')
            ->leftJoin(Conversation::class, 'conv', 'WITH', 'rrr.resource2 = conv.id')
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
            'bookc' => $this->getSearchTotal($search, Book::class, Book::getSearcheableColumns()),
            'convc' => $this->getSearchTotal($search, Conversation::class, Conversation::getSearcheableColumns()),
        ];
    }

    public function getResources(SearchResource $search)
    {
        return $this->getResourcesQuery($search)
            ->getQuery()
            ->setHint(
                \Doctrine\ORM\Query::HINT_CUSTOM_OUTPUT_WALKER,
                'App\\Doctrine\\Walkers\\MysqlPaginationWalker'
            )
            ->setHint("mysqlWalker.sqlCalcFoundRows", true)
            ->getResult();
    }

    public function getResourcesTotal(SearchResource $search)
    { 
        return $this->_em->getConnection()->executeQuery('SELECT FOUND_ROWS()')->fetchFirstColumn();
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
            case 'countMessage':
                return '';
            case 'url':
                if ($rootEntity == 'App\Entity\Lexicon') {
                    return '';
                }
            default:
                return 'r.';
        }
    }

    private  function getResourceRepositoryData(string $resType): object
    {
        switch ($resType) {
            case 'adr':
                return $this->registry->getRepository(Address::class);
            case 'pdf':
                return $this->registry->getRepository(Pdf::class);
            case 'teli':
                return $this->registry->getRepository(Teli::class);
            case 'link':
                return $this->registry->getRepository(Link::class);
            case 'book':
                return $this->registry->getRepository(Book::class);
            case 'lex':
                return $this->registry->getRepository(Lexicon::class);
            case 'prj':
                return $this->registry->getRepository(Project::class);
            case 'conversation':
                return $this->registry->getRepository(Conversation::class);
            default:
                throw new \InvalidArgumentException("Invalid resType provided: $resType");
        }
    }

    public function getResourcesWithDividers(SearchResource $searchResource , $resType)
    {
        /**
         * @var QueryBuilder $queryBuilder
         */
        $repository = $this->getResourceRepositoryData($resType);
        $queryBuilder = $repository->getResourcesQuery($searchResource);
        $getDividerQuery = $repository->getDividerQuery();
        $queryBuilder->addSelect("'' as text");
        $queryBuilder->resetDQLPart('orderBy');
        $queryBuilder
            ->setFirstResult(null)
            ->setMaxResults(null);

        $innerResourceQuery = $this->getRunnableQueryAndParametersForQuery($queryBuilder->getQuery());

        $sql = sprintf(
            $getDividerQuery,
            $innerResourceQuery['sql'],
            $searchResource->resource,
            $searchResource->paging->limit,
            $searchResource->paging->offset
        );

        $stmt = $this->getEntityManager()->getConnection()->prepare($sql);

        return $stmt->executeQuery($innerResourceQuery['params'])->fetchAllAssociative();
    }

    protected function getDividerQuery()
    {
    }

    /**
     * @param SearchResource $searchResource
     * @return mixed[]
     * @throws \Doctrine\DBAL\DBALException
     */
    public function getAllTypeResourcesWithDividers(SearchResource $searchResource)
    {
        $queryBuilder = $this->getAllResourceQuery($searchResource);
        $queryBuilder->resetDQLPart('orderBy');
        $queryBuilder
            ->setFirstResult(null)
            ->setMaxResults(null);

        $innerResourceQuery = $this->getRunnableQueryAndParametersForQuery($queryBuilder->getQuery());
        $sql = sprintf(
            $this->getAllResourcesDividerQuery(),
            $innerResourceQuery['sql'],
            $searchResource->resource,
            $searchResource->paging->limit,
            $searchResource->paging->offset
        );

        $stmt = $this->getEntityManager()->getConnection()->prepare($sql);

        return $stmt->executeQuery($innerResourceQuery['params'])->fetchAllAssociative();
    }

    /**
     * @param Query $query
     * @return array An array with 3 indexes, sql the SQL statement with parameters as ?, params the ordered parameters, and paramTypes as the types each parameter is.
     */
    public static function getRunnableQueryAndParametersForQuery(Query $query)
    {
        $sql = $query->getSQL();
        $c = new \ReflectionClass(Query::class);
        $parser = $c->getProperty('parserResult');
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
        list($params,$types)= $m->invoke($query, $parser->getParameterMappings());

        return ['sql' => $sql, 'params' => $params,'paramTypes' => $types];
    }

    /**
     * @param Resource $resource
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function save($resource)
    {
        $this->getEntityManager()->persist($resource);
        $this->getEntityManager()->flush();
    }

    public function remove($resource)
    {
        $this->getEntityManager()->remove($resource);
        $this->getEntityManager()->flush($resource);
    }

    /**
     * @param SearchResource $search
     * @return QueryBuilder
     */
    private function getAllResourceQuery(SearchResource $search): QueryBuilder
    {
        $selectTypeString = '';
        $selectUrlString = '';
        $qb = $this->createQueryBuilder('r');

        foreach (Resource\ResourceType::RESOURCE_TYPES as $type => $class) {
            if (in_array($class, [Resource::class, User::class])) {
                continue;
            }
            $qb->leftJoin($class, $type, Query\Expr\Join::WITH, $type.'.id = r.id');
            if (property_exists($class, 'url')) {
                $selectUrlString .= " WHEN r INSTANCE OF ".$class." THEN ".$type.".url ";
            }
            $selectTypeString .= " WHEN r INSTANCE OF ".$class." THEN '".$type."' ";
        }

        $qb->leftJoin('adr.country', 'co');

        $qb->select("(CASE
                ".$selectTypeString."
                ELSE 'res'
            END) as type, '' as text, (CASE ".$selectUrlString." ELSE '' END) as url, adr.zip, adr.city, adr.street, co.code");
        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }

    /**
     * @return string
     */
    private function getAllResourcesDividerQuery()
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.url, base.zip, base.city, base.street, base.code, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead, base.userSetEmail, base.type, base.color
              FROM (
               %s
               UNION ALL
               SELECT null as type, prd.text as text, '' as url, null as zip, null as city, null as street, null as code, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, null as userSetEmail, null as color, prd.coefficient as coef, prd.id as coefId
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
              AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          left JOIN flag fl ON fl.id_resource = rrr.id_resource2
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND fl.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}
