<?php

namespace App\Repository;

use App\Entity\Language;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class LanguageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Language::class);
    }

    public function getReference($code)
    {
        return $this->_em->getReference(Language::class, $code);
    }

    public function save(Language $language)
    {
        $this->_em->persist($language);
        $this->_em->flush();
    }
}
