<?php

namespace Vitoop\InfomgmtBundle\Validator\Constraints\Resource;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;

class ResourceNameUniqueValidator extends ConstraintValidator
{
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;

    public function __construct(ResourceRepository $resourceRepository)
    {
        $this->resourceRepository = $resourceRepository;
    }

    public function validate($name, Constraint $constraint)
    {
        $resources = $this->resourceRepository->getResourceByName($name);
        if (empty($resources)) {
            return null;
        }
        if (count($resources) > 1) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('%id1%', $resources[0]->getId())
                ->setParameter('%id2%', $resources[1]->getId())
                ->atPath('name')
                ->addViolation();
        }
    }
}