<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * InvitationRepository
 */
class InvitationRepository extends ResourceRepository
{
    public function getResourcesQuery(SearchResource $search)
    {
        
    }
}