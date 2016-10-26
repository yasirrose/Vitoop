<?php

namespace Vitoop\InfomgmtBundle\Service\User;

use Symfony\Component\Security\Core\Encoder\EncoderFactoryInterface;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Entity\User\PasswordEncoderInterface;

class UserPasswordEncoder implements PasswordEncoderInterface
{
    private $encoderFactory;
    private $userEncoder;

    public function __construct(EncoderFactoryInterface $encoderFactory)
    {
        $this->encoderFactory = $encoderFactory;
        $this->userEncoder = $this->encoderFactory->getEncoder(User::class);
    }

    public function encode($password, $salt = null)
    {
        return $this->userEncoder->encodePassword($password, $salt);
    }

}
