<?php

namespace Vitoop\InfomgmtBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\PdfAnnotation;
use Vitoop\InfomgmtBundle\Entity\User;

class PdfAnnotationRepository extends EntityRepository
{
    /**
     * @param PdfAnnotation $annotation
     */
    public function add(PdfAnnotation $annotation)
    {
        $this->_em->persist($annotation);
    }

    /**
     * @param Pdf $pdf
     * @param User $user
     * @return mixed
     * @throws \Doctrine\ORM\NoResultException
     * @throws \Doctrine\ORM\NonUniqueResultException
     */
    public function getAnnotationsByPdfAndUser(Pdf $pdf, User $user)
    {
        return json_decode(
            $this->createQueryBuilder('pa')
                ->select('pa.annotations')
                ->where('pa.pdf = :pdf')
                ->andWhere('pa.user = :user')
                ->setParameters([
                    'pdf'  => $pdf,
                    'user' => $user
                ])
                ->getQuery()
                ->getSingleScalarResult()
        );
    }

    /**
     * @param Pdf $pdf
     * @param User $user
     * @return null|object
     */
    public function findOneByPdfAndUser(Pdf $pdf, User $user)
    {
        return $this->findOneBy(['pdf' => $pdf, 'user' => $user]);
    }
}