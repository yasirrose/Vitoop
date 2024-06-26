<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\DTO\Resource\ResourceDTO;
use App\Entity\User\User;
use App\Entity\UrlCheck\UrlCheckInterface;

/**
 * @ORM\Table(name="link")
 * @ORM\Entity(repositoryClass="App\Repository\LinkRepository")
 */
class Link extends Resource implements UrlCheckInterface
{
    use \App\Entity\UrlCheck\UrlCheckTrait;

    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     */
    protected $id;

    /**
     * @ORM\Column(name="url", type="string", length=255, unique=true)
     */
    protected $url;

    /**
     * @ORM\Column(name="is_hp", type="boolean")
     */
    protected $is_hp;

    public function __construct()
    {
        parent::__construct();
        $this->unskip();
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
        return 3;
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
        return 'link';
    }

    static public function getSearcheableColumns()
    {
        return [
            'name',
            'url',
            'username',
            'is_hp'
        ];
    }
    
    /**
     * {@inheritdoc}
     */
    public function getViewLink()
    {
        return $this->getUrl();
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
     * Set url
     *
     * @param string $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set is_hp
     *
     * @param boolean $is_hp
     */
    public function setIsHp($is_hp)
    {
        $this->is_hp = $is_hp;
    }

    /**
     * Get is_hp
     *
     * @return boolean
     */
    public function getIsHp()
    {
        return $this->is_hp;
    }

    public function toResourceDTO(?User $user) : ResourceDTO
    {
        $dto = parent::toResourceDTO($user);
        $dto->url = $this->url;
        $dto->is_hp = null !== $this->is_hp ? $this->is_hp : false;

        return $dto;
    }

    public static function createFromResourceDTO(ResourceDTO $dto) : Link
    {
        $resource = new self();
        $resource->updateFromResourceDTO($dto);

        return $resource;
    }

    public function updateFromResourceDTO(ResourceDTO $dto)
    {
        parent::updateFromResourceDTO($dto);
        $this->url = $dto->url;
        $this->is_hp = $dto->is_hp;
    }
}
