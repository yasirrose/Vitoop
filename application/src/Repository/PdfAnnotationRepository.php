<?php

namespace App\Repository;

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use App\Entity\Pdf;
use App\Entity\PdfAnnotation;
use App\Entity\User\User;

class PdfAnnotationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, PdfAnnotation::class);
    }

    /**
     * @param PdfAnnotation $annotation
     */
    public function add(PdfAnnotation $annotation)
    {
        $this->_em->persist($annotation);
    }

    public function save()
    {
        $this->_em->flush();
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