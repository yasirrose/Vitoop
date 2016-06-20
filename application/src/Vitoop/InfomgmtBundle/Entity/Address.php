<?php
namespace Vitoop\InfomgmtBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;

/**
 * @ORM\Table(name="address")
 * @ORM\Entity(repositoryClass="Vitoop\InfomgmtBundle\Repository\AddressRepository")
 */
class Address extends Resource
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     */
    protected $id;

    /**
     * @ORM\Column(name="name2", type="string", length=64)
     */
    protected $name2;

    /**
     * @ORM\Column(name="street", type="string", length=64)
     */
    protected $street;

    /**
     * @ORM\Column(name="zip", type="string", length=5)
     */
    protected $zip;

    /**
     * @ORM\Column(name="city", type="string", length=64)
     */
    protected $city;

    /**
     * @ORM\Column(name="contact1", type="string", length=32)
     */
    protected $contact1;

    /**
     * @ORM\Column(name="contact2", type="string", length=32)
     */
    protected $contact2;

    /**
     * @ORM\Column(name="contact3", type="string", length=32)
     */
    protected $contact3;

    /**
     * @ORM\Column(name="contact4", type="string", length=128)
     */
    protected $contact4;

    /**
     * @ORM\Column(name="contact5", type="string", length=128)
     */
    protected $contact5;

    /**
     * @ORM\Column(name="contact_key", type="string", length=5)
     */
    protected $contact_key;

    public function __construct()
    {
        parent::__construct();
        $this->contact_key = 'TMFEH';
        $this->setContact2('');
    }

    /**
     * Get ResourceTypeIdx
     *
     * Get the the numerical Index of the resource_type as used in the
     * discriminator map as follows:
     * "0" = "Resource", "1" = "Pdf", "2"="Address", "3" = "Link",
     * "4" = "Teli", "5" = "Lexicon", "6" = "Project"
     *
     * @return integer
     */
    public function getResourceTypeIdx()
    {
        return 2;
    }

    /**
     * Get ResourceType
     *
     * Get the resource_type of a Resource. (e.g. 'pdf, 'teli' ...)
     *
     * @return string
     */
    public function getResourceType()
    {
        return 'adr';
    }

    static public function getSearcheableColumns()
    {
        return [
            'name',
            'zip',
            'city',
        ];
    }
    
    /**
     * {@inheritdoc}
     *
     * Possible $code: Google (g), Google Satellite (gs), Multimap (mm), Open Street Map (osm), Tiny Geocoder/Tiny
     * Multimap Route (t), Yahoo! (y), Google Hybrid (gh)
     */
    public function getViewLink($code = 'g')
    {
        return 'http://mapof.it/' . $code . '/' . $this->getName() . ', ' . $this->getStreet() . ', ' . $this->getZip() . '+' . $this->getCity() . ', ' . $this->getCountry();
    }

    /**
     * Set id
     *
     * @param integer $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name2
     *
     * @param string $name2
     */
    public function setName2($name2)
    {
        $this->name2 = $name2;
    }

    /**
     * Get name2
     *
     * @return string
     */
    public function getName2()
    {
        return $this->name2;
    }

    /**
     * Set street
     *
     * @param string $street
     */
    public function setStreet($street)
    {
        $this->street = $street;
    }

    /**
     * Get street
     *
     * @return string
     */
    public function getStreet()
    {
        return $this->street;
    }

    /**
     * Set zip
     *
     * @param string $zip
     */
    public function setZip($zip)
    {
        $this->zip = $zip;
    }

    /**
     * Get zip
     *
     * @return string
     */
    public function getZip()
    {
        return $this->zip;
    }

    /**
     * Set city
     *
     * @param string $city
     */
    public function setCity($city)
    {
        $this->city = $city;
    }

    /**
     * Get city
     *
     * @return string
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set contact1
     *
     * @param string $contact1
     */
    public function setContact1($contact1)
    {
        $this->contact1 = $contact1;
    }

    /**
     * Get contact1
     *
     * @return string
     */
    public function getContact1()
    {
        return $this->contact1;
    }

    /**
     * Set contact2
     *
     * @param string $contact2
     */
    public function setContact2($contact2)
    {
        $this->contact2 = $contact2;
    }

    /**
     * Get contact2
     *
     * @return string
     */
    public function getContact2()
    {
        return $this->contact2;
    }

    /**
     * Set contact3
     *
     * @param string $contact3
     */
    public function setContact3($contact3)
    {
        $this->contact3 = $contact3;
    }

    /**
     * Get contact3
     *
     * @return string
     */
    public function getContact3()
    {
        return $this->contact3;
    }

    /**
     * Set contact4
     *
     * @param string $contact4
     */
    public function setContact4($contact4)
    {
        $this->contact4 = $contact4;
    }

    /**
     * Get contact4
     *
     * @return string
     */
    public function getContact4()
    {
        return $this->contact4;
    }

    /**
     * Set contact5
     *
     * @param string $contact5
     */
    public function setContact5($contact5)
    {
        $this->contact5 = $contact5;
    }

    /**
     * Get contact5
     *
     * @return string
     */
    public function getContact5()
    {
        return $this->contact5;
    }

    /**
     * Set contact_key
     *
     * @param string $contactKey
     */
    public function setContactKey($contactKey)
    {
        $this->contact_key = $contactKey;
    }

    /**
     * Get contact_key
     *
     * @return string
     */
    public function getContactKey()
    {
        return $this->contact_key;
    }

    public function toResourceDTO(User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->name2 = $this->name2;
        $dto->street = $this->street;
        $dto->zip = $this->zip;
        $dto->city = $this->city;
        $dto->contact1 = $this->contact1;
        $dto->contact3 = $this->contact3;
        $dto->contact4 = $this->contact4;
        $dto->contact5 = $this->contact5;

        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Address
    {
        $resource = new static();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->name2 = $dto->name2;
        $this->street = $dto->street;
        $this->zip = $dto->zip;
        $this->city = $dto->city;
        $this->contact1 = $dto->contact1;
        $this->contact3 = $dto->contact3;
        $this->contact4 = $dto->contact4;
        $this->contact5 = $dto->contact5;
    }
}
