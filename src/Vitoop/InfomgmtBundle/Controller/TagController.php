<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Vitoop\InfomgmtBundle\Entity\Resource;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;


use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Form\Type\PdfType;

use Vitoop\InfomgmtBundle\Entity\Link;
use Vitoop\InfomgmtBundle\Form\Type\LinkType;

use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Form\Type\TagType;

use Vitoop\InfomgmtBundle\Entity\Rating;
use Vitoop\InfomgmtBundle\Form\Type\RatingType;

use Vitoop\InfomgmtBundle\Entity\RelResourceTag;
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
     * @Route("api/resource/{resource_id}/123tag/{tag_text}/", requirements={"resource_id": "\d+"}, name="tag_new")
     * @Method({"GET"})
     * @ParamConverter("resource", class="Vitoop\InfomgmtBundle\Entity\Resource", options={"id" = "resource_id"})
     *
     * @return array
     */
    public function newAction(Resource $resource, Request $request, $tag_text = "asd")
    {
       if (!is_null($this->getDoctrine()->getManager()->getRepository('VitoopInfomgmtBundle:RelResourceTag')->find(9256))) {
            echo "catch it";
            var_dump(0);
            exit(0);
        }

        $serializer = $this->get('jms_serializer');
        $tagger = $this->get('vitoop.tagger');
        $user = $this->get('security.context')->getToken()->getUser();
        if ($tagger->checkAddingAbility($user->getId(), $resource->getId())) {
            /*$serializerContext = DeserializationContext::create()
                ->setGroups(array('new'));
            $tag = $serializer->deserialize(
                $request->getContent(),
                'Vitoop\InfomgmtBundle\Entity\Tag',
                'json',
                $serializerContext
            );*/
            $tag = new Tag();
            $tag->setText($tag_text);
            $response = $tagger->setTag($tag, $resource, $user);
        } else {
            $response = array(
                'success' => false,
                'error' => 'Sie können nur fünf Schlagwörter zuweisen'
            );
        }

        $response = $serializer->serialize($response, 'json');

        return new Response($response);
    }

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