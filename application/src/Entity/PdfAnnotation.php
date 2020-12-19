<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\User\User;

/**
 * Class PdfAnnotation
 * @package App\Entity
 * @ORM\Table(name="pdf_annotation", uniqueConstraints={
 *        @ORM\UniqueConstraint(
 *          name="uniqpdfannot_idx", columns={"pdf_id", "user_id"}
 *        )
 *      })
 * @ORM\Entity(repositoryClass="App\Repository\PdfAnnotationRepository")
 */
class PdfAnnotation
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var Pdf
     *
     * @ORM\ManyToOne(targetEntity="App\Entity\Pdf")
     * @ORM\JoinColumn(name="pdf_id", referencedColumnName="id")
     */
    private $pdf;

    /**
     * @ORM\Column(name="annotations", type="json_array")
     */
    private $annotations;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User\User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * PdfAnnotation constructor.
     * @param Pdf $pdf
     * @param User $user
     * @param array $annotations
     */
    public function __construct(Pdf $pdf, User $user, array $annotations = [])
    {
        $this->pdf = $pdf;
        $this->user = $user;
        $this->annotations = $annotations;
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return Pdf
     */
    public function getPdf(): Pdf
    {
        return $this->pdf;
    }

    /**
     * @return mixed
     */
    public function getAnnotations()
    {
        return $this->annotations;
    }

    /**
     * @return mixed
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param array $annotation
     */
    public function updateAnnotation(array $annotation)
    {
        $this->annotations = $annotation;
    }
}