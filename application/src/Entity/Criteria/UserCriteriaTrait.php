<?php

namespace App\Entity\Criteria;

use Doctrine\Common\Collections\Criteria;
use App\Entity\User\User;

/**
 * Trait UserCriteriaTrait
 * @package App\Entity\Criteria
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