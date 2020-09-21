<?php
namespace App\Controller;

use App\Repository\PdfRepository;
use App\Repository\TagRepository;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TagController extends AbstractController
{
    /**
     * @Route("api/tag/tags_info", name="get_tags_info", methods={"GET"})
     *
     * @return array
     */
    public function getTagsInfo(Request $request, SerializerInterface $serializer)
    {
        $tag_list = $request->query->get('taglist');
        $tag_list_ignore = $request->query->get('taglist_i');

        $tag_list = (is_null($tag_list))?(array()):($tag_list);
        $tag_list_ignore = (is_null($tag_list_ignore))?(array()):($tag_list_ignore);

        $info = null;
        $response = $serializer->serialize($info, 'json');

        return new Response($response);
    }

   /**
     * @Route("/tags", name="_tags"))
     */
    public function listAction(TagRepository $tagRepository)
    {
        $tags = $tagRepository->getAllTagsWithRelResourceTagCount();

        return $this->render('Tag/tags.html.twig', array('tags' => $tags));
    }

    /**
     * @Route("/convert", name="_convert"))
     */
    public function convertAction(PdfRepository $pdfRepository)
    {
        $pdfs = $pdfRepository->findAll();

        foreach ($pdfs as $pdf) {
            $date_string = $pdf->getPdfDate();

            $convert_to = $this->convert($date_string);

            $pdf->setPdfDate($convert_to);
            $pdfRepository->save($pdf);
            //echo $date_string === $convert_to ? '!': '?';
        }
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
