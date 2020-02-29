<?php

namespace Vitoop\InfomgmtBundle\Entity\Criteria;

use Doctrine\Common\Collections\Criteria;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * Trait UserCriteriaTrait
 * @package Vitoop\InfomgmtBundle\Entity\Criteria
 */
trait UserCriteriaTrait
{
    /**
     * @param User $user
     * @return Criteria
     */
    public function getUserCriteria(User $user): Criteria
    {
        $expr = Criteria::expr();
        $userCriteria = Criteria::create();
        $userCriteria
            ->where($expr->eq('user', $user));

        return $userCriteria;
    }
}