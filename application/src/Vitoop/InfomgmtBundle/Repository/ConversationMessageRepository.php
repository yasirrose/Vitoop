<?php


namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\ConversationMessage;

/**
 * ConversationMessageRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ConversationMessageRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return ConversationMessage::class;
    }

    public function save(ConversationMessage $message)
    {
        $this->getEntityManager()->merge($message);
        $this->getEntityManager()->flush();
    }

    public function remove(ConversationMessage $message)
    {
        $this->getEntityManager()->remove($message);
        $this->getEntityManager()->flush();
    }

}