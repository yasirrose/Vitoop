<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\Validator\Constraints as Assert;

class ResourceDTO
{
    /**
     * @Assert\NotBlank(message="Bitte gebe einen Namen für die Resource ein.")
     * @Assert\Length(
     *      max=128,
     *      maxMessage= "Der Name der Resource darf nicht mehr als {{ limit }} Zeichen haben."
     * )
     */
    public $name;

    public $name2;

    public $lang;

    public $country;

    public $isUserHook;

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
     * @Assert\Url(
     *      protocols = {"http", "https", "ftp"},
     *      message = "Die Url ist ungültig. Bitte gebe auch http://, https:// oder ftp:// mit an.",
     *      groups={"pdf", "link", "teli"}
     * )
     */
    public $url;

    public $is_hp;

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
     *      message = "Bitte gebe einen ISBN-13 ein. Wenn der ISBN-13 unbekannt ist, gebe '0' ein.",
     *      groups={"book"}
     * )
     * @Assert\Length(
     *      min = 13,
     *      max = 17,
     *      maxMessage = "Dieses Feld darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"book"}
     * )
     */
    public $isbn13;

    /**
     * @Assert\NotBlank(
     *      message = "Bitte gebe einen ISBN-10 ein. Wenn der ISBN-10 unbekannt ist, gebe '0' ein.",
     *      groups={"book"}
     * )
     * @Assert\Length(
     *      min = 10,
     *      max = 17,
     *      maxMessage = "Dieses Feld darf nicht mehr als {{ limit }} Zeichen haben.",
     *      groups={"book"}
     * )
     */
    public $isbn10;

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
    public $release_date;

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
    public $pdf_date;

    public $wikifullurl;

    public $description;
}
