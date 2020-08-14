<?php

namespace Vitoop\InfomgmtBundle\Service;

use Vitoop\InfomgmtBundle\Entity\RelResourceResource;
use Vitoop\InfomgmtBundle\Repository\RelResourceResourceRepository;

class ProjectDividerChanger
{
    /**
     * @var RelResourceResourceRepository
     */
    private $relResourceRepository;

    /**
     * ProjectDividerChanger constructor.
     * @param RelResourceResourceRepository $relResourceRepository
     */
    public function __construct(RelResourceResourceRepository $relResourceRepository)
    {
        $this->relResourceRepository = $relResourceRepository;
    }

    /**
     * @param $projectId
     * @param $userId
     * @param $oldCoeff
     * @param $newCoeff
     * @throws \Doctrine\ORM\ORMException
     * @throws \Doctrine\ORM\OptimisticLockException
     */
    public function changeRelatedCoefficients($projectId, $oldCoeff, $newCoeff)
    {
        if ($oldCoeff === $newCoeff) {
            return;
        }

        /**
         * @var RelResourceResource $relatedResource
         */
        $relatedResources = $this->relResourceRepository->findRelatedCoefficients($projectId, $oldCoeff);
        foreach ($relatedResources as $relatedResource) {
            $currentCoeff = $relatedResource->getCoefficient();
            $coeffParts = explode('.', $currentCoeff);
            $coeffParts[0] = $newCoeff;
            $relatedResource->setCoefficient(implode('.', $coeffParts));
            $this->relResourceRepository->add($relatedResource);

        }
        $this->relResourceRepository->save();
    }

}