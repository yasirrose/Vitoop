<?php


namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\Entity\ConversationData;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\Entity\User;

/**
 * ConversationDataRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ConversationDataRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return ConversationData::class;
    }

    /**
     * @param ConversationData $conversationData
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function save(ConversationData $conversationData)
    {
        $this->getEntityManager()->persist($conversationData);
        $this->getEntityManager()->flush();
    }
}