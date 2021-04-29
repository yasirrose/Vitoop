<?php


namespace App\Repository;

use App\Entity\ConversationMessage;
use App\Entity\User\User;
use App\Entity\Conversation;
use App\DTO\Resource\SearchResource;

/**
 * ConversationRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ConversationRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Conversation::class;
    }

    public function getResourcesQuery(SearchResource $search)
    {
        $subSelect = 'SELECT COUNT(cm.id) FROM '.ConversationMessage::class.' cm WHERE cm.conversationData = conversationData.id';

        $qb = $this->createQueryBuilder('r')
            ->select('r.description', 'conversationData.sheet')
            ->addSelect('('.$subSelect.') as countMessage')
            ->leftJoin('r.conversation_data', 'conversationData');

        $this->prepareListQueryBuilder($qb, $search);

        return $qb;
    }

    protected function getDividerQuery()
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead
              FROM (
               %s
               UNION ALL
               SELECT null as description, null as sheet, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
                AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join conversation conv on conv.id = rrr.id_resource2
                          left JOIN flag conv_book ON conv.id = conv_book.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND conv_book.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}