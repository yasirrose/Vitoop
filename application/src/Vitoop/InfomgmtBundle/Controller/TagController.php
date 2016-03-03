<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\RelResourceRating;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\SecurityContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Form\Exception;
use Symfony\Component\Form\Form;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class TagController extends Controller
{
   /**
     * @Route("/tags", name="_tags"))
     */
    public function listAction()
    {
        $tags = $this->getDoctrine()
                     ->getRepository('VitoopInfomgmtBundle:Tag')
                     ->getAllTagsWithRelResourceTagCount();

        return $this->render('VitoopInfomgmtBundle:Tag:tags.html.twig', array('tags' => $tags));
    }

    /**
     * @Route("/convert", name="_convert"))
     */
    public function convertAction()
    {
        $em = $this->getDoctrine()
                   ->getManager();

        $pdfs = $this->getDoctrine()
                     ->getRepository('VitoopInfomgmtBundle:Pdf')
                     ->findAll();

        foreach ($pdfs as $pdf) {
            $date_string = $pdf->getPdfDate();

            $convert_to = $this->convert($date_string);

            $pdf->setPdfDate($convert_to);
            //echo $date_string === $convert_to ? '!': '?';
        }
        $em->flush();
        echo 'READY';
        die();
    }

    private function convert($date_string)
    {
        $published = date_create_from_format('d-m-Y', $date_string);
        if ($published) {
            return $published->format('Y-m-d');
        }

        $published = date_create_from_format('m-Y', $date_string);
        if ($published) {
            return $published->format('Y-m');
        }

        $published = date_create_from_format('Y-m-d', $date_string);
        if ($published) {
            return $published->format('Y-m-d');
        }

        $published = date_create_from_format('Y-m', $date_string);
        if ($published) {
            return $published->format('Y-m');
        }

        $published = date_create_from_format('Y', $date_string);
        if ($published) {
            return $published->format('Y');
        }

        $published = date_create_from_format('d-m.Y', $date_string);
        if ($published) {
            return $published->format('Y-m-d');
        }

        $published = date_create_from_format('d.m.Y', $date_string);
        if ($published) {
            return $published->format('Y-m-d');
        }

        $published = date_create_from_format('m/Y', $date_string);
        if ($published) {
            return $published->format('Y-m');
        }

        $published = date_create_from_format('Y_m', $date_string);
        if ($published) {
            return $published->format('Y-m');
        }

        $published = date_create_from_format('m.Y', $date_string);
        if ($published) {
            return $published->format('Y-m');
        }

        if ($date_string === '') {
            return '';
        }

        return '??????????????????????????????????????????????????????????????';
    }
}