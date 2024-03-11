<?php

namespace App\Service\User;

use App\Entity\User\User;
use App\Entity\User\PasswordEncoderInterface;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactoryInterface;
use Symfony\Component\PasswordHasher\PasswordHasherInterface;

class UserPasswordEncoder implements PasswordEncoderInterface
{
    private PasswordHasherFactoryInterface $encoderFactory;
    private PasswordHasherInterface $userEncoder;

    public function __construct(PasswordHasherFactoryInterface $encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
        $this->userEncoder = $this->encoderFactory->getPasswordHasher(User::class);
    }

    /**
     * @inheritDoc
     */
    public function encode($password, $salt = null)
    {
        return $this->userEncoder->hash($password, $salt);
    }

    /**
     * @inheritDoc
     */
    public function isPasswordValid($encodedPassword, $password, $salt)
    {
        return $this->userEncoder->verify($encodedPassword, $password);
    }
}
