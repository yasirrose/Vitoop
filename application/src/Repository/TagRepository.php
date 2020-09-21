<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\Security\Core\User\UserInterface;
use App\Entity\Resource;
use App\Entity\RelResourceTag;
use App\Repository\Helper;
use App\Entity\Tag;

/**
 * TagRepository
 */
class TagRepository extends ServiceEntityRepository
{
    /**
     * TagRepository constructor.
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tag::class);
    }

    /**
     * @param Tag $tag
     */
    public function add(Tag $tag)
    {
        $this->_em->persist($tag);
    }

    /**
     * @param Tag $tag
     */
    public function addAndSave(Tag $tag)
    {
        $this->add($tag);
        $this->_em->flush($tag);
    }

    public function countAllTagsFromResource(Resource $resource)
    {
        return $this->getEntityManager()
            ->createQuery(
                'SELECT t.id, t.text, COUNT(t.id) AS cnt_tag, 0 AS is_own
                FROM App\Entity\Tag t
                JOIN t.rel_resources rr
                WHERE rr.resource=:arg_resource and rr.deletedByUser is null
                GROUP BY t.text
                ORDER BY t.text ASC'
            )
            ->setParameter('arg_resource', $resource)
            ->getResult();
    }

    // AllTags means implicit DISTINCT tags, because (an array of) Tag-Objects is returned.
    // SELECTING t.text would retrieve all tags auch die doppelten!

    public function getAllTagsFromResource(Resource $resource)
    {

        return $this->getEntityManager()
                    ->createQuery('SELECT t FROM App\Entity\Tag t
                                    JOIN t.rel_resources rr
                                    WHERE rr.resource=:arg_resource
                                    ORDER BY t.text ASC')
                    ->setParameter('arg_resource', $resource)
                    ->getResult();
    }

    public function getTagIdListByUserFromResource(Resource $resource, $user)
    {
        // User isn't logged in therefore no matched tags!
        if (is_string($user)) {
            return array();
        }
        return array_column($this->getEntityManager()
            ->createQuery('SELECT t.id FROM App\Entity\Tag t
                            JOIN t.rel_resources rr
                            WHERE rr.resource=:arg_resource
                            AND rr.user=:arg_user
                            ORDER BY t.text ASC')
            ->setParameters(array('arg_resource' => $resource, 'arg_user' => $user))
            ->getArrayResult(), 'id');
    }

    public function getAllTagsFromResourceById($id, $user = null, $flatten = false)
    {
        // User isn't logged in therefore no matched tags!
        if (is_string($user)) {
            return array();
        }
        if (null === $user) {
            $arr_result = $this->getEntityManager()
                               ->createQuery('SELECT t.text FROM App\Entity\Tag t JOIN t.rel_resources rr WHERE IDENTITY(rr.resource)=:arg_id ORDER BY t.text ASC')
                               ->setParameter('arg_id', $id)
                               ->getResult();
        } else {
            $arr_result = $this->getEntityManager()
                               ->createQuery('SELECT t.text FROM App\Entity\Tag t JOIN t.rel_resources rr WHERE IDENTITY(rr.resource)=:arg_id AND rr.user=:arg_user ORDER BY t.text ASC')
                               ->setParameters(array('arg_id' => $id, 'arg_user' => $user))
                               ->getResult();
        }
        if ($flatten) {
            $arr_result = array_column($arr_result, 'text');
        }

        return $arr_result;
    }

    public function getAllTagsByFirstLetter($letter)
    {
        return array_column($this->getEntityManager()
            ->createQuery(
                'SELECT t.text
                FROM App\Entity\Tag t
                WHERE t.text
                LIKE :arg_letter
                ORDER BY t.text ASC'
            )
            ->setMaxResults(10)
            ->setParameter('arg_letter', $letter . "%")
            ->getArrayResult(), 'text');
    }

    public function getAllTagsWithCountByFirstLetter($letter, $ignoreTags)
    {   
        return $this->getEntityManager()->createQueryBuilder()
            ->select('t.text, COUNT (DISTINCT r.id) as cnt')
            ->from(Resource::class, 'r')
            ->innerJoin('r.rel_tags', 'rrt', 'WITH',
                'rrt.id = (SELECT MAX(rrt2.id) FROM App\Entity\RelResourceTag as rrt2 WHERE rrt2.resource = r.id AND rrt2.tag = rrt.tag and rrt2.deletedByUser IS NULL)')
            ->innerJoin('rrt.tag', 't')
            ->leftJoin('r.flags', 'f')
            ->where('t.text LIKE :letter')
            ->andWhere('rrt.deletedByUser IS NULL')
            ->andWhere('f.id IS NULL')
            ->andWhere('t.text NOT IN (:ignore)')
            ->setMaxResults(10)
            ->setParameter('letter', $letter . "%")
            ->setParameter('ignore', !empty($ignoreTags)?$ignoreTags:false)
            ->orderBy('t.text')
            ->groupBy('t.text')
            ->getQuery()
            ->getArrayResult();
    }
    
    public function getAllTagsWithRelResourceTagCount()
    {
        $query = $this->createQueryBuilder('t')
            ->select('t.id, t.text')
            ->addSelect('count(rrt.id) as cnt')
            ->addSelect('count(prj.id) as prjc')
            ->addSelect('count(lex.id) as lexc')
            ->addSelect('count(pdf.id) as pdfc')
            ->addSelect('count(teli.id) as telic')
            ->addSelect('count(link.id) as linkc')
            ->addSelect('count(book.id) as bookc')
            ->addSelect('count(adr.id) as adrc')
            ->innerJoin('App\Entity\RelResourceTag', 'rrt', 'WITH', 'rrt.tag = t.id and rrt.id = (SELECT MAX(rrt2.id) FROM App\Entity\RelResourceTag as rrt2 WHERE rrt2.resource = rrt.resource AND rrt2.tag = t.id and rrt2.deletedByUser IS NULL)')
            ->leftJoin('App\Entity\Project', 'prj', 'WITH', 'rrt.resource = prj.id')
            ->leftJoin('App\Entity\Lexicon', 'lex', 'WITH', 'rrt.resource = lex.id')
            ->leftJoin('App\Entity\Pdf', 'pdf', 'WITH', 'rrt.resource = pdf.id')
            ->leftJoin('App\Entity\Teli', 'teli', 'WITH', 'rrt.resource = teli.id')
            ->leftJoin('App\Entity\Link', 'link', 'WITH', 'rrt.resource = link.id')
            ->leftJoin('App\Entity\Address', 'adr', 'WITH', 'rrt.resource = adr.id')
            ->leftJoin('App\Entity\Book', 'book', 'WITH', 'rrt.resource = book.id')
            ->leftJoin(Resource::class, 'r', 'WITH', 'rrt.resource = r.id')
            ->leftJoin('r.flags', 'f')
            ->where('f.id IS NULL')
            ->groupBy('t.id')
            ->orderBy('cnt', 'DESC')
            ->addOrderBy('t.text', 'ASC');

        return $query->getQuery()->getResult();
    }
}