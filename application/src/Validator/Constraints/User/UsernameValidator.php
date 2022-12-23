<?php

namespace App\Validator\Constraints\User;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\UserRepository;
use App\Service\VitoopSecurity;

class UsernameValidator extends ConstraintValidator
{
    private $userRepository;
    private $security;

    public function __construct(UserRepository $userRepository, VitoopSecurity $security)
    {
        $this->userRepository = $userRepository;
        $this->security = $security;
    }

    public function validate($username, Constraint $constraint): void
    {
        $existentUser = $this->userRepository->findOneByUsername($username);
        if (!$existentUser) {
            return;
        }

        if ($existentUser === $this->security->getUser()) {
            return;
        }

        $this->context->buildViolation($constraint->messageUsername)
            ->setParameter('%string%', $username)
            ->atPath('username')
            ->addViolation();
    }
}
