<?php

namespace App\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use App\Validator\Constraints\Resource\ResourceNameUnique;

class ResourceDTO
{
    const RESOURCE_TYPES_FIELDS = [
        'pdf' => [
            'name',
            'lang',
            'author',
            'publisher',
            'url',
            'tnop',
            'pdfDate',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'adr' => [
            'name',
            'name2',
            'street',
            'zip',
            'city',
            'country',
            'contact1',
            'contact3',
            'contact4',
            'contact5',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'link' => [
            'name',
            'lang',
            'url',
            'is_hp',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'teli' => [
            'name',
            'lang',
            'author',
            'url',
            'releaseDate',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'lex' => [
            'name',
            'lang',
            'wikifullurl',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'prj' => [
            'name',
            'lang',
            'description',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'book' => [
            'name',
            'lang',
            'author',
            'publisher',
            'issuer',
            'isbn',
            'tnop',
            'kind',
            'year',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
        'conversation' => [
            'name',
            'lang',
            'description',
            'isUserHook',
            'isUserRead',
            'created_at',
        ],
    ];

    /**
     * @ResourceNameUnique
     * @Assert\NotBlank(message="Bitte gebe einen Namen für die Resource ein.")
     * @Assert\Length(
     *      max=160,
     *      maxMessage= "Der Name der Resource darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"Default"}
     * )
     */
    public $name;

    public $name2;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte trage eine Sprache ein.",
     *      groups={"pdf", "link", "teli", "book", "conversation", "lex", "prj"}
     * )
     */
    public $lang;

    public $country;

    public $isUserHook;

    public $isUserRead;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe eine URL für die Resource ein.",
     *      groups={"pdf", "link", "teli"}
     * )
     * @Assert\Length(
     *      max = 255,
     *      maxMessage = "Die Url darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"pdf", "link", "teli"}
     * )
     */
    public $url;

    public $is_hp = false;

    public $user;

    public $street;
    public $zip;
    public $city;

    public $contact1;
    public $contact3;
    public $contact4;
    public $contact5;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe den/die AutorIn(nen) ein - wenn nicht bekannt, trage '??' ein.",
     *      groups={"book", "pdf", "teli"}
     * )
     * @Assert\Length(
     *      max = 256,
     *      maxMessage = "Dieses Feld darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"book", "pdf"}
     * )
     */
    public $author;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe einen Verlag ein. Wenn der Verlag unbekannt ist, gebe '??' ein.",
     *      groups={"book"}
     * )
     * @Assert\Length(
     *      max = 256,
     *      maxMessage = "Dieses Feld darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"book", "pdf"}
     * )
     */
    public $publisher;

    /**
     * @Assert\Length(
     *      max = 256,
     *      maxMessage = "Dieses Feld darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"book"}
     * )
     */
    public $issuer;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe einen ISBN ein. Wenn der ISBN unbekannt ist, gebe '0' ein.",
     *      groups={"book"}
     * )
     * @Assert\Expression(
     *      "value == '0' or (this.getIsbnLength() >= 13 and this.getIsbnLength() <= 17 )",
     *      message = "Dieses Feld darf nicht mehr als 17 Zeichen haben.",
     *      groups={"book"}
     * )
     */
    public $isbn;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe die Seitenanzahl ein. Falls unbekannt bitte '0' angeben.",
     *      groups={"book"}
     * )
     * @Assert\Range(
     *      min = 0,
     *      minMessage = "Negative Seitenzahlen sind sinnlos.",
     *      max = 100000,
     *      maxMessage = "Mehr als 100.000 Seiten sind unwahrscheinlich.",
     *      groups={"book", "pdf"}
     * )
     */
    public $tnop;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte wähle eine Art aus.",
     *      groups={"book"}
     * )
     * @Assert\NotEqualTo(
     *     value="auswählen",
     *     message = "Bitte wähle eine Art aus.",
     *     groups={"book"}
     * )
     */
    public $kind;

     /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe einen Jahr ein. Wenn der Jahr unbekannt ist, gebe '0' ein.",
     *      groups={"book"}
     * )
     */
    public $year;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte trage das Datum ein, folgende Formate sind akzeptiert: tt.mm.jjjj oder mm.jjjj oder jjjj --> oder '0'",
     *      groups={"teli"}
     * )
     * @Assert\Regex(
     *     message = "Bitte trage das Datum ein, folgende Formate sind akzeptiert: tt.mm.jjjj oder mm.jjjj oder jjjj --> oder '0'",
     *     pattern = "~(^(0?[1-9]|1[0-9]|2[0-9]|3[01]).(0?[1-9]|1[012])\.\d{4}$)|^((0?[1-9]|1[012])\.\d{4})$|^(\d{4})$|0~",
     *     groups={"teli"}
     * )
     */
    public $releaseDate;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte trage das Datum ein, folgende Formate sind akzeptiert: tt.mm.jjjj oder mm.jjjj oder jjjj --> oder '0'",
     *      groups={"pdf"}
     * )
     * @Assert\Regex(
     *     message = "Bitte trage das Datum ein, folgende Formate sind akzeptiert: tt.mm.jjjj oder mm.jjjj oder jjjj --> oder '0'",
     *     pattern = "~(^(0?[1-9]|1[0-9]|2[0-9]|3[01]).(0?[1-9]|1[012])\.\d{4}$)|^((0?[1-9]|1[012])\.\d{4})$|^(\d{4})$|0~",
     *     groups={"pdf"}
     * )
     */
    public $pdfDate;

    public $wikifullurl;

    public $description;

    public $status;

    public $isNotify;

    public $isResourceUser;

    public $canRead = false;

    public $created_at;

    public $selectedColor;

    public function getIsbnLength()
    {
        return mb_strlen($this->isbn);
    }

    /**
     * @param array $requestData
     * @param string $type
     * @return ResourceDTO
     */
    public static function createFromArrayAndType(array $requestData, $type): ResourceDTO
    {
        $dto = new ResourceDTO();
        if (!array_key_exists($type, self::RESOURCE_TYPES_FIELDS)) {
            return $dto;
        }
        foreach (self::RESOURCE_TYPES_FIELDS[$type] as $field) {
            if (property_exists(self::class, $field) && array_key_exists($field, $requestData)) {
                $dto->$field = $requestData[$field] ?? null;
            }
        }

        return $dto;
    }
}
