<?php

namespace App\Repository;

use App\Entity\Country;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

class CountryRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Country::class);
    }

    public function getReference($code)
    {
        return $this->_em->getReference(Country::class, $code);
    }

    public function save(Country $country)
    {
        $this->_em->persist($country);
        $this->_em->flush();
    }
}