<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\ValueObject\PublishedDate;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;

/**
 * PdfRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 * 0 = Not downloaded still
 * 1 = Downloaded on server
 * 4 = Download error (404 or something else)
 */
class PdfRepository extends ResourceRepository
{
    public function getEntityClass()
    {
        return Pdf::class;
    }

    /**
     * @param $count
     * @param $missing
     * @return array
     */
    public function getPDFForDownloading($count, $missing)
    {
        $query = $this->createQueryBuilder('r')
            ->orderBy('r.created_at', 'ASC')
            ->setMaxResults($count);
        if (!$missing) {
            $query->where('r.isDownloaded = 0');
        } else {
            $query->where('r.isDownloaded != 1');
            $query->andWhere('r.isDownloaded != 0');
        }

        return $query->getQuery()->getResult();
    }

    /**
     * @param SearchResource $search
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function getResourcesQuery(SearchResource $search)
    {
        $qb = $this->createQueryBuilder('r')
            ->select('r.author, r.url, r.tnop, r.isDownloaded, r.pdfDate.date as pdfDate, r.pdfDate.order as HIDDEN orderDate')
            ->addGroupBy('r.author')
            ->addGroupBy('r.url')
            ->addGroupBy('r.tnop')
            ->addGroupBy('r.isDownloaded')
            ->addGroupBy('r.pdfDate.date');
        $this->prepareListQueryBuilder($qb, $search);

        if ($search->dateFrom) {
            $qb
                ->andWhere('r.pdfDate.order >= :dateFrom')
                ->setParameter('dateFrom', PublishedDate::generateOrderValue(PublishedDate::convertStringGreedy($search->dateFrom)));
        }
        if ($search->dateTo) {
            $qb
                ->andWhere('r.pdfDate.order <= :dateTo')
                ->setParameter('dateTo', PublishedDate::generateOrderValue(PublishedDate::createFromString($search->dateTo)));
        }

        return $qb;
    }

    protected function getDividerQuery()
    {
        return <<<'EOT'
            SELECT SQL_CALC_FOUND_ROWS base.coef, base.coefId, base.text, base.author, base.url, base.tnop, base.isDownloaded, base.pdfDate, base.id, base.name, base.created_at, base.username, base.avgmark, base.res12count, base.isUserHook, base.isUserRead
              FROM (
               %s
               UNION ALL
               SELECT null as author, null as url, null as tnop, null as isDownloaded, null as pdfDate, null as id, null as name, null as created_at, null as username, null as avgmark, null as res12count, null as isUserHook, null as isUserRead, prd.coefficient as coef, prd.id as coefId, prd.text as text
                FROM project_rel_divider prd
               INNER join project p on p.project_data_id = prd.id_project_data
              where p.id = %s
                AND prd.coefficient IN (
                        select FLOOR(rrr.coefficient) 
                          from rel_resource_resource rrr
                          inner join pdf on pdf.id = rrr.id_resource2
                          left JOIN flag fpdf ON pdf.id = fpdf.id_resource
                         WHERE rrr.id_resource1 = p.id
                          AND rrr.deleted_by_id_user IS NULL
                          AND fpdf.id IS NULL
                    )
            ) base
            ORDER BY base.coef asc, base.coefId asc
            LIMIT %s OFFSET %s;
EOT;
    }
}