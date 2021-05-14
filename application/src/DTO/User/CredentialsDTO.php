<?php

namespace App\DTO\User;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\DTO\CreateFromRequestInterface;
use App\Validator\Constraints\User\Username;
use App\Validator\Constraints\User\UserEmail;

class CredentialsDTO implements CreateFromRequestInterface
{
    /**
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

    /**
     * @UserEmail
     * @Assert\Email()
     */
    public $email;

    /**
     * @Username
     * @Assert\Length(
     *      min = 5,
     *      minMessage = "Dein Username sollte mindestens {{ limit }} Zeichen haben.",
     *      max = 14,
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
     * @Assert\Range(
     *      min = 5,
     *      max = 20,
     *      minMessage = "Count must be more than 4",
     *      maxMessage = "Count must be less than 21",
     *      invalidMessage="Count must be a number"
     * )
     */
    public $numberOfTodoElements;

    /**
     * @Assert\Range(
     *      min = 150,
     *      max = 5000,
     *      minMessage = "Height must be more than 150",
     *      maxMessage = "Height must be less than 5000",
     *      invalidMessage="Height must be a number"
     * )
     */
    public $heightOfTodoList;

    /**
     * @var int
     * @Assert\Range(
     *      min = 0,
     *      max = 2,
     *      minMessage = "Font size decreasing must be more than 0",
     *      maxMessage = "Font size decreasing be less than 3",
     *      invalidMessage="Height must be a number"
     * )
     */
    public $decreaseFontSize;

    public $isOpenInSameTab;

    public function __construct()
    {
        $this->password = null;
        $this->email = null;
        $this->username = null;
        $this->numberOfTodoElements = null;
        $this->heightOfTodoList = null;
        $this->decreaseFontSize = 0;
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = json_decode($request->getContent());
        $fields = ['password', 'email', 'username', 'numberOfTodoElements', 'heightOfTodoList', 'decreaseFontSize', 'isOpenInSameTab'];
        $dto = new static();
        
        foreach ($fields as $field) {
            if ($requestData->$field) {
                $dto->$field = $requestData->$field;
            }
        }

        return $dto;
    }
}