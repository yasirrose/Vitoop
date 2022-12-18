<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Entity\User\User;
use App\Entity\UserAgreement;
use App\DTO\Resource\SearchResource;
use Doctrine\ORM\QueryBuilder;

/**
 * Class UserRepository
 * @package App\Repository
 */
class UserRepository extends ServiceEntityRepository
{
    /**
     * UserRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, User::class);
    }

    /**
     * @param User $user
     */
    public function add(User $user)
    {
        $this->getEntityManager()->persist($user);
    }

    public function save()
    {
        $this->getEntityManager()->flush();
    }

    public function findOneByUsernameOrEmail($username, $email)
    {
        return $this->createQueryBuilder('u')
            ->where('u.username=:username OR u.email=:email')
            ->setParameters([
                'username' => $username,
                'email' => $email
            ])
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getNames($like, $currentUserID, $ownerID)
    {
        return $this->createQueryBuilder('u')
            ->select('u.id')
            ->addSelect('u.username')
            ->where('u.username LIKE :like')
            ->andWhere('u.id != :currentID')
            ->andWhere('u.id != :ownerID')
            ->setParameter('like', $like.'%')
            ->setParameter('currentID', $currentUserID)
            ->setParameter('ownerID', $ownerID)
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();
    }

    public function findByResetToken($resetToken)
    {
        if (empty($resetToken)) {
            return null;
        }

        return $this->createQueryBuilder('u')
            ->where('u.resetPasswordToken IS NOT NULL')
            ->andWhere("u.resetPasswordToken = :token")
            ->setParameter('token', $resetToken)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function findDefaultUser()
    {
        return $this->createQueryBuilder('u')
            ->where('u.username = :defaultUsername')
            ->setParameter('defaultUsername', User::DEFAULT_USERNAME)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('u')->select('u.id, u.username');
        $this->prepareUserListQueryBuilder($qb, $search);
        return $qb;
    }

    public function getResources(SearchResource $search)
    {
        return $this->getResourcesQuery($search)->getQuery()->setHint(
                \Doctrine\ORM\Query::HINT_CUSTOM_OUTPUT_WALKER,
                'App\\Doctrine\\Walkers\\MysqlPaginationWalker'
            )->setHint("mysqlWalker.sqlCalcFoundRows", true)->getResult();
    }
    /**
     * @param QueryBuilder $query
     * @param bool $flagged
     * @return QueryBuilder
     */
    protected function prepareUserListQueryBuilder(QueryBuilder $query, SearchResource $search)
    {
        $query
            ->addSelect('u.email, u.lastLoginedAt, usa.createdAt')
            ->leftJoin(UserAgreement::class, 'usa', 'WITH', 'u.id = usa.user')
            ->groupBy('u.username');
        $rootEntity = $query->getRootEntities();
        $rootEntity = $rootEntity[0];
        if ($search->searchString) {
            $searchString = implode('OR ', array_map(function ($field) use ($rootEntity) {
                $alias = $this->getResourceFieldAlias($field, $rootEntity);
                return $alias.$field . ' LIKE :searchString ';
            }, $search->columns->searchable));
            $query
                ->andWhere($searchString)
                ->setParameter('searchString', '%'.$search->searchString.'%');
        }
        if ($search->columns->sortableColumn) {
            $sortAlias = $this->getResourceFieldAlias($search->columns->sortableColumn, $rootEntity);
            $sortableColumn = $search->columns->sortableColumn;
            $query
                ->addOrderBy(
                    $sortAlias.$sortableColumn,
                    $search->columns->sortableOrder
                );
        }
        $query
            ->addOrderBy('u.username', 'DESC')
            ->addOrderBy('usa.id', 'DESC')
            ->setFirstResult($search->paging->offset)
            ->setMaxResults($search->paging->limit);
        return $query;
    }

    private function getResourceFieldAlias($field, $rootEntity)
    {
        switch ($field){
            case 'username':
                return 'u.';
            case 'createdAt':
                return 'usa.';
            default:
                return 'u.';
        }
    }

    public function getResourcesTotal(SearchResource $search)
    { 
        return $this->_em->getConnection()->query('SELECT FOUND_ROWS()')->fetchColumn(0);
    }
}