<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\AbstractQuery as Query;

/**
 * RatingRepository
 */

/**
 *
 * @author tweini
 *         refactoring in progress
 */
class RatingRepository extends EntityRepository
{
    public function getRatingFromResourceByUser(Resource $resource, $user)
    {
        if (is_string($user)) {
            return;
        }

        return $this->getEntityManager()
                    ->createQuery('SELECT r FROM VitoopInfomgmtBundle:Rating r WHERE r.resource=:arg_resource AND r.user=:arg_user ')
                    ->setParameters(array('arg_resource' => $resource, 'arg_user' => $user))
                    ->getOneOrNullResult();
    }

    /**
     * getMarkFromResourceByUser
     *
     * Returns the mark user has given for this resource
     * or null if the user hasn't rated the given resource
     *
     * @param Resource $resource ,
     *           User $user
     *
     * @return string
     *
     */
    public function getMarkFromResourceByUser(Resource $resource, $user)
    {
        if (is_string($user)) {
            return;
        }
        // @TODO Check the Source of doctine2 what really happens if this would be executed with 'Query::HYDRATE_SCALAR'

        $result = $this->getEntityManager()
                       ->createQuery('SELECT r.mark FROM VitoopInfomgmtBundle:Rating r WHERE r.resource=:arg_resource AND r.user=:arg_user ')
                       ->setParameters(array('arg_resource' => $resource, 'arg_user' => $user))
                       ->getOneOrNullResult();

        if (is_null($result)) {
            return null;
        }

        // $result is e.g. array(1) { ["mark"]=> int(5) }, but we want to return a scalar
        return array_shift($result);
    }

    /**
     * getAverageMarkFromResource
     *
     * Returns the average mark for a given resource or null if ther isn't a rating at all
     *
     * @param Resource $resource ,
     *
     * @return string
     *
     */

    public function getAverageMarkFromResource(Resource $resource)
    {

        return $this->getEntityManager()
                    ->createQuery('SELECT AVG(r.mark) FROM VitoopInfomgmtBundle:Rating r WHERE r.resource=:arg_resource')
                    ->setParameters(array('arg_resource' => $resource))
                    ->getSingleScalarResult();
    }
}