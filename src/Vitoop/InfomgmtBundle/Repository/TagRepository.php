<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Symfony\Component\Security\Core\User\UserInterface;

use Vitoop\InfomgmtBundle\Repository\Helper;

/**
 * TagRepository
 */
class TagRepository extends EntityRepository
{
    public function countAllTagsFromResource(Resource $resource)
    {
        return $this->getEntityManager()
                    ->createQuery('SELECT t.id, t.text, COUNT(t.id) AS cnt_tag, 0 AS is_own
                                    FROM VitoopInfomgmtBundle:Tag t
                                    JOIN t.rel_resources rr
                                    WHERE rr.resource=:arg_resource and rr.deletedByUser is null
                                    GROUP BY t.text
                                    ORDER BY t.text ASC')
                    ->setParameter('arg_resource', $resource)
                    ->getResult();
    }

    // AllTags means implicit DISTINCT tags, because (an array of) Tag-Objects is returned.
    // SELECTING t.text would retrieve all tags auch die doppelten!

    public function getAllTagsFromResource(Resource $resource)
    {

        return $this->getEntityManager()
                    ->createQuery('SELECT t FROM VitoopInfomgmtBundle:Tag t
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
        $arr_result = $this->getEntityManager()
                           ->createQuery('SELECT t.id FROM VitoopInfomgmtBundle:Tag t
                                           JOIN t.rel_resources rr
                                           WHERE rr.resource=:arg_resource
                                           AND rr.user=:arg_user
                                           ORDER BY t.text ASC')
                           ->setParameters(array('arg_resource' => $resource, 'arg_user' => $user))
                           ->getResult();
        $arr_result = Helper::flatten_array($arr_result, 'id');

        return $arr_result;
    }

    public function getAllTagsFromResourceById($id, $user = null, $flatten = false)
    {
        // User isn't logged in therefore no matched tags!
        if (is_string($user)) {
            return array();
        }
        if (null === $user) {
            $arr_result = $this->getEntityManager()
                               ->createQuery('SELECT t.text FROM VitoopInfomgmtBundle:Tag t JOIN t.rel_resources rr WHERE IDENTITY(rr.resource)=:arg_id ORDER BY t.text ASC')
                               ->setParameter('arg_id', $id)
                               ->getResult();
        } else {
            $arr_result = $this->getEntityManager()
                               ->createQuery('SELECT t.text FROM VitoopInfomgmtBundle:Tag t JOIN t.rel_resources rr WHERE IDENTITY(rr.resource)=:arg_id AND rr.user=:arg_user ORDER BY t.text ASC')
                               ->setParameters(array('arg_id' => $id, 'arg_user' => $user))
                               ->getResult();
        }
        if ($flatten) {
            $arr_result = Helper::flatten_array($arr_result, 'text');
        }

        return $arr_result;
    }

    public function getAllTagsByFirstLetter($letter)
    {
        $arr_result = $this->getEntityManager()
                           ->createQuery('SELECT t.text
                                           FROM VitoopInfomgmtBundle:Tag t
                                           WHERE t.text
                                           LIKE :arg_letter
                                           ORDER BY t.text ASC')
                           ->setMaxResults(10)
                           ->setParameter('arg_letter', $letter . "%")
                           ->getResult();

        $arr_result = Helper::flatten_array($arr_result, 'text');

        return $arr_result;
    }

    public function getAllTagsWithRelResourceTagCount()
    {

        $result = $this->getEntityManager()
                       ->createQuery('SELECT t, COUNT(rrt) AS cnt FROM VitoopInfomgmtBundle:Tag t
                                    JOIN t.rel_resources rrt
                                    GROUP BY t
                                    ORDER BY cnt ASC')
                       ->getResult();

        return $result;
        /*
                \Doctrine\Common\Util\Debug::dump($result);
                die();
        */
    }
}