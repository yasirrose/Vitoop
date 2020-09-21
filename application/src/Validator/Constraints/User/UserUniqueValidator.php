<?php

namespace App\Validator\Constraints\User;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use App\Repository\UserRepository;

class UserUniqueValidator extends ConstraintValidator
{
    /**
     * @var UserRepository 
     */
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function validate($user, Constraint $constraint)
    {
        $existentUser = $this->userRepository
            ->findOneByUsernameOrEmail($user->username, $user->email);
        if (!$existentUser) {
            return;
        }
        if ($user->username === $existentUser->getUsername()) {
            $this->context->buildViolation($constraint->messageUsername)
                ->setParameter('%string%', $user->username)
                ->atPath('username')
                ->addViolation();
        }
        if ($user->email === $existentUser->getEmail()) {
            $this->context->buildViolation($constraint->messageEmail)
                ->setParameter('%string%', $user->email)
                ->atPath('email')
                ->addViolation();
        }
    }
}
