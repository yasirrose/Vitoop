<?php

namespace App\Service;

use App\Entity\RelResourceResource;
use App\Repository\ProjectRelsDividerRepository;
use App\Repository\RelResourceResourceRepository;

class ProjectDividerChanger
{
    /**
     * @var RelResourceResourceRepository
     */
    private $relResourceRepository;
    /**
     * @var ProjectRelsDividerRepository
     */
    private $dividerRepository;

    /**
     * ProjectDividerChanger constructor.
     * @param RelResourceResourceRepository $relResourceRepository
     * @param ProjectRelsDividerRepository $dividerRepository
     */
    public function __construct(
        RelResourceResourceRepository $relResourceRepository,
        ProjectRelsDividerRepository $dividerRepository
    ) {
        $this->relResourceRepository = $relResourceRepository;
        $this->dividerRepository = $dividerRepository;
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

    /**
     * @param $projectId
     * @param $projectDataId
     * @param $coeff
     */
    public function removeDividerWithoutRelatedRecords($projectId, $projectDataId, $coeff)
    {
        $relatedNewResources = $this->relResourceRepository->findRelatedCoefficients($projectId, $coeff);
        if (empty($relatedNewResources)) {
            $this->dividerRepository->removeDividerByProjectId($projectDataId, $coeff);
        }
    }
}
