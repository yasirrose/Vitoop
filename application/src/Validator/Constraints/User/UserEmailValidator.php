<?php

namespace App\Validator\Constraints\User;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\UserRepository;
use App\Service\VitoopSecurity;

class UserEmailValidator extends ConstraintValidator
{
    private $userRepository;
    private $security;

    public function __construct(UserRepository $userRepository, VitoopSecurity $security)
    {
        $this->userRepository = $userRepository;
        $this->security = $security;
    }

    public function validate($email, Constraint $constraint): void
    {
        $existentUser = $this->userRepository->findOneByEmail($email);
        if (!$existentUser) {
            return;
        }

        if ($existentUser === $this->security->getUser()) {
            return;
        }

        $this->context->buildViolation($constraint->messageEmail)
            ->setParameter('%string%', $email)
            ->atPath('email')
            ->addViolation();
    }
}
