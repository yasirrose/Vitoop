<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Vitoop\InfomgmtBundle\Entity\Resource;
use Symfony\Component\Routing\Annotation\Route;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Form\Exception;

class ResourceXhrController extends ApiController
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
    public function resourceLetterAction(Request $request)
    {
        $letter = $request->query->get('term');

        $resources = $this->getDoctrine()
            ->getRepository('VitoopInfomgmtBundle:Resource')
            ->getAllResourcesByFirstLetter($letter);

        return new Response($resources);
    }

    /**
     * @Route("/tag/suggest", name="_tag_suggest")
     */
    public function tagSuggestAction(Request $request)
    {
        $letter = $request->query->get('term');
        $id = $request->query->get('id');
        $isExtended = $request->query->get('extended');
        $ignoreTags = explode(',', $request->query->get('ignore'));

        if ($isExtended) {
            $tags = $this->getDoctrine()
                ->getRepository('VitoopInfomgmtBundle:Tag')
                ->getAllTagsWithCountByFirstLetter($letter, $ignoreTags);

            return $this->getApiResponse($tags);
        }

        $tags = $this->getDoctrine()
            ->getRepository('VitoopInfomgmtBundle:Tag')
            ->getAllTagsByFirstLetter($letter);
        

        // $id is not set when this function is used by 'resource_search.js', so this must be skipped
        if (isset($id)) {
            // @TODO security check anononymus token->getUser() is a string not instance of UserInterface

            // Filter the tags the current User hast tagged
            $user = $this->getUser();

            $resource_tags = $this->getDoctrine()
                ->getRepository('VitoopInfomgmtBundle:Tag')
                ->getAllTagsFromResourceById($id, $user, true);

            $tags = array_diff($tags, $resource_tags);
        }

        return $this->getApiResponse($tags);
    }

    /**
     * @Route("/prj/suggest", name="_prj_suggest")
     */
    public function projectSuggestAction(Request $request)
    {
        $term = $request->query->get('term');

        $projects = $this->getDoctrine()
            ->getRepository('VitoopInfomgmtBundle:Project')
            ->getAllProjectsByTermOrAllIfLessThanTen(
                $term, $this->getUser()
            );
        $arr_flattened_result = array_map(function ($arr_element) {
            return $arr_element['name'];
        }, $projects);

        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize($arr_flattened_result, 'json');

        return new Response($response);
    }
}
