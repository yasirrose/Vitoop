<?php

namespace App\Validator\Constraints\Resource;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\DTO\Resource\DividerDTO;
use App\Repository\ProjectRelsDividerRepository;

/**
 * Class DividerCoefficientUniqueValidator
 * @package App\Validator\Constraints\Resource
 */
class DividerCoefficientUniqueValidator extends ConstraintValidator
{
    /**
     * @var ProjectRelsDividerRepository
     */
    private $dividerRepository;

    /**
     * DividerCoefficientUniqueValidator constructor.
     * @param ProjectRelsDividerRepository $dividerRepository
     */
    public function __construct(ProjectRelsDividerRepository $dividerRepository)
    {
        $this->dividerRepository = $dividerRepository;
    }

    public function validate($dividerDTO, Constraint $constraint)
    {
        /**
         * @var DividerDTO $dividerDTO
         */
        $currentDivider = null;
        if ($dividerDTO->id) {
            $currentDivider = $this->dividerRepository->find($dividerDTO->id);
        }

        $dividerByCoeff = $this->dividerRepository->findProjectDividerByCoeff(
            $dividerDTO->projectDataId,
            $dividerDTO->coefficient
        );

        if (null !== $dividerByCoeff &&
            (null === $currentDivider || (null !== $currentDivider && $currentDivider->getId() !== $dividerByCoeff->getId()))
        ) {
            $this->context->buildViolation($constraint->message)
                ->atPath('coefficient')
                ->addViolation();
        }
    }
}
