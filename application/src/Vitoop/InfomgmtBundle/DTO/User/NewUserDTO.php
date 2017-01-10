<?php

namespace Vitoop\InfomgmtBundle\DTO\User;

use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\Validator\Constraints\User\UserUnique;

/**
 * @UserUnique
 */
class NewUserDTO
{
    /**
     * @Assert\NotBlank()
     * @Assert\Length(
     *      min = 6,
     *      minMessage = "Dein Username sollte mindestens {{ limit }} Zeichen haben.",
     *      max = 16,
     *      maxMessage = "Dein Username sollte nicht mehr als {{ limit }} Zeichen haben."
     * )
     * @Assert\Regex(
     *      pattern = "/^[\x20-\x7FäöüÄÖÜß]+$/",
     *      message = "Dein Username enthält nicht erlaubte Zeichen."
     * )
     * @Assert\Regex(
     *      pattern = "/(vitoop|admin)+/i",
     *      match = false,
     *      message = "Dieser Benutzername ist leider nicht erlaubt."
     * )
     */
    public $username;

    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    public $email;

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
     * 
     */
    public $password;

    public function __construct($email = null, $username = null, $password = null)
    {
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}
