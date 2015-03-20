<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Vitoop\InfomgmtBundle\Entity\Resource;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Form\Type\PdfType;

use Vitoop\InfomgmtBundle\Entity\Link;
use Vitoop\InfomgmtBundle\Form\Type\LinkType;

use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Form\Type\TagType;

use Vitoop\InfomgmtBundle\Entity\Rating;
use Vitoop\InfomgmtBundle\Form\Type\RatingType;

use Vitoop\InfomgmtBundle\Entity\RelResourceTag;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;

use Symfony\Component\Security\Core\SecurityContext;

use Symfony\Component\Form\Exception;
use Symfony\Component\Form\Form;

use Symfony\Component\HttpKernel\HttpKernelInterface;

class ResourceXhrController extends Controller
{
    // @TODO REVIEW this Action!
    /**
     * @Route("/{resource_type}/letter/{letter}", name="_resource2_letter",
     * requirements={"resource_type"="pdf|adr|link|teli", "letter"="^[A-Za-z]$"})
     */
    public function letterAction($resource_type, $letter)
    {

        $pdfs = $this->getDoctrine()
                     ->getRepository('VitoopInfomgmtBundle:Resource')
                     ->findByFirstLetter($letter);

        return $this->render('VitoopInfomgmtBundle:Resource:pdf.index.html.twig', array('pdfs' => $pdfs));
    }

    /**
     * @Route("/resource/letter", name="_resource_letter")
     */
    public function resourceLetterAction()
    {
        $letter = $this->getRequest()->query->get('term');

        $resources = $this->getDoctrine()
                          ->getRepository('VitoopInfomgmtBundle:Resource')
                          ->getAllResourcesByFirstLetter($letter);

        return new Response($resources);
    }

    /**
     * @Route("/tag/suggest", name="_tag_suggest")
     */
    public function tagSuggestAction()
    {
        $letter = $this->getRequest()->query->get('term');
        $id = $this->getRequest()->query->get('id');

        $tags = $this->getDoctrine()
                     ->getRepository('VitoopInfomgmtBundle:Tag')
                     ->getAllTagsByFirstLetter($letter);

        // $id is not set when this function is used by 'resource_search.js', so this must be skipped
        if (isset($id)) {
            // @TODO security check anononymus token->getUser() is a string not instance of UserInterface

            // Filter the tags the current User hast tagged
            $user = $this->get('security.context')
                         ->getToken()
                         ->getUser();

            $resource_tags = $this->getDoctrine()
                                  ->getRepository('VitoopInfomgmtBundle:Tag')
                                  ->getAllTagsFromResourceById($id, $user, true);

            $tags = array_diff($tags, $resource_tags);
        }
        // Convert to JSON
        $tags = implode('","', $tags);
        $tags = '["' . $tags . '"]';

        return new Response($tags);
    }

    /**
     * @Route("/prj/suggest", name="_prj_suggest")
     */
    public function projectSuggestAction()
    {
        $term = $this->getRequest()->query->get('term');

        $projects = $this->getDoctrine()
                         ->getRepository('VitoopInfomgmtBundle:Project')
                         ->getAllProjectsByTermOrAllIfLessThanTen($term, $this->get('security.context')
                                                                              ->getToken()
                                                                              ->getUser());
        var_dump($projects);
        exit(0);
        $arr_flattened_result = array_map(function ($arr_element) {
            return $arr_element['name'];
        }, $projects);

        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize($arr_flattened_result, 'json');

        return new Response($response);
    }
}