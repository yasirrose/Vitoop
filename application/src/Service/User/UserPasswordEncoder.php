<?php

namespace App\Service\User;

use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use App\Entity\User\User;
use App\Entity\User\PasswordEncoderInterface;

class UserPasswordEncoder implements PasswordEncoderInterface
{
    private $encoderFactory;
    private $userEncoder;

    public function __construct(EncoderFactoryInterface $encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
        $this->userEncoder = $this->encoderFactory->getEncoder(User::class);
    }

    /**
     * @inheritDoc
     */
    public function encode($password, $salt = null)
    {
        return $this->userEncoder->encodePassword($password, $salt);
    }

    /**
     * @inheritDoc
     */
    public function isPasswordValid($encodedPassword, $password, $salt)
    {
        return $this->userEncoder->isPasswordValid($encodedPassword, $password, $salt);
    }
}
