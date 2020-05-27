<?php

namespace Vitoop\InfomgmtBundle\DTO\User;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

class ChangePasswordDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     * @var string
     */
    public $token;

    /**
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 8,
     *      minMessage = "Dein Passwort sollte mindestens 8 Zeichen lang sein.",
     *      max = 32,
     *      maxMessage = "Dein Passwort ist zu lang({{ limit }} Zeichen). Bitte wähle ein kürzeres"
     * )
     * @Assert\Regex(
     *      pattern = "/^[\x21-\x7FäöüÄÖÜß]+$/",
     *      message = "Dein Passwort enthält nicht erlaubte Zeichen."
     * )
     */
    public $password;
}