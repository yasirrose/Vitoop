<?php
namespace App\Controller;

use App\Repository\ProjectRepository;
use App\Repository\ResourceRepository;
use App\Repository\TagRepository;
use App\Repository\PdfRepository;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Service\ResourceManager;


class ResourceXhrController extends ApiController
{
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;

    /**
     * @var TagRepository
     */
    private $tagRepository;
    
    /**
     * @var PdfRepository
     */
    private $pdfRepository;
    
    /**
     * ResourceXhrController constructor.
     * @param ResourceRepository $resourceRepository
     * @param TagRepository $tagRepository
     */
    public function __construct(ResourceRepository $resourceRepository, TagRepository $tagRepository, PdfRepository $pdfRepository)
    {
        $this->resourceRepository = $resourceRepository;
        $this->tagRepository = $tagRepository;
        $this->pdfRepository = $pdfRepository;
    }

    /**
     * @TODO REVIEW this Action!
     * @Route("/{resource_type}/letter/{letter}", name="_resource2_letter",
     * requirements={"resource_type"="pdf|adr|link|teli", "letter"="^[A-Za-z]$"})
     */
    public function letterAction($resource_type, $letter)
    {

        $pdfs = $this->resourceRepository->findByFirstLetter($letter);

        return $this->render('Resource/pdf.index.html.twig', array('pdfs' => $pdfs));
    }

    /**
     * @Route("/resource/letter", name="_resource_letter")
     */
    public function resourceLetterAction(Request $request)
    {
        $letter = $request->query->get('term');

        $resources = $this->resourceRepository->getAllResourcesByFirstLetter($letter);

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
            $tags = $this->tagRepository->getAllTagsWithCountByFirstLetter($letter, $ignoreTags);

            return $this->getApiResponse($tags);
        }

        $tags = $this->tagRepository->getAllTagsByFirstLetter($letter);
        

        // $id is not set when this function is used by 'resource_search.js', so this must be skipped
        if (isset($id)) {
            // @TODO security check anononymus token->getUser() is a string not instance of UserInterface

            // Filter the tags the current User hast tagged
            $user = $this->getUser();
            $resource_tags = $this->tagRepository->getAllTagsFromResourceById($id, $user, true);
            $tags = array_diff($tags, $resource_tags);
        }

        return $this->getApiResponse($tags);
    }
    
    /**
     * @Route("/pdf/hrsg/suggest", name="_hrsg_suggest" )
     */
    public function publisherSuggestAction(Request $request, ResourceManager $resourceManager, $resType)
    {
        $letter = $request->query->get('term');
        $id = $request->query->get('id');
        $isExtended = $request->query->get('extended');
        $ignorePublishers = explode(',', $request->query->get('ignore'));
        $resType = 'pdf';
        if ($isExtended) {
            $publishers  =  $resourceManager->getRepository($resType)->getAllPublishersWithCountByFirstLetter($letter, $ignorePublishers);

            return $this->getApiResponse($publishers);
        }

        $publishers  = $this->pdfRepository->getAllPublishersByFirstLetter($letter);
        

        // $id is not set when this function is used by 'resource_search.js', so this must be skipped
        if (isset($id)) {
            // @TODO security check anononymus token->getUser() is a string not instance of UserInterface

            // Filter the tags the current User hast tagged
            $user = $this->getUser();
            $resource_tags = $this->tagRepository->getAllPublishersFromResourceById($id, $user, true);
            $publishers  = array_diff($publishers , $resource_tags);
        }

        return $this->getApiResponse($publishers);
    }

    /**
     * @Route("/pdf/url/suggest", name="_url_suggest")
     */
    public function urlSuggestAction(Request $request, ResourceManager $resourceManager, $resType)
    {
        $letter = $request->query->get('term');
        $id = $request->query->get('id');
        $isExtended = $request->query->get('extended');
        $ignoreUrls = explode(',', $request->query->get('ignore'));
        $resType = 'pdf';

        if ($isExtended) {
            $urls  =$resourceManager->getRepository($resType)->getAllUrlWithCountByFirstLetter($letter, $ignoreUrls);

            return $this->getApiResponse($urls);
        }

        $urls  = $this->pdfRepository->getAllUrlByFirstLetter($letter);
        

        // $id is not set when this function is used by 'resource_search.js', so this must be skipped
        if (isset($id)) {
            // @TODO security check anononymus token->getUser() is a string not instance of UserInterface

            // Filter the tags the current User hast tagged
            $user = $this->getUser();
            $resource_tags = $this->tagRepository->getAllUrlFromResourceById($id, $user, true);
            $urls  = array_diff($urls , $resource_tags);
        }

        return $this->getApiResponse($urls);
    }

    /**
     * @Route("/prj/suggest", name="_prj_suggest")
     */
    public function projectSuggestAction(
        Request $request,
        ProjectRepository $projectRepository,
        SerializerInterface $serializer
    ) {
        $term = $request->query->get('term');

        $projects = $projectRepository->getAllProjectsByTermOrAllIfLessThanTen($term, $this->getUser());
        $arr_flattened_result = array_map(function ($arr_element) {
            return $arr_element['name'];
        }, $projects);

        $response = $serializer->serialize($arr_flattened_result, 'json');

        return new Response($response);
    }


    public function getAllPublishersWithCountByFirstLetter($letter, $ignorePublishers)
    {
        return $this->getEntityManager()->createQueryBuilder()
        ->select('p.publisher, COUNT (p.id) as cnt')
        ->from(Pdf::class, 'p')
        ->where("p.publisher LIKE :publisher")
        ->setParameter('publisher', $letter . "%")
        ->andWhere("p.publisher NOT IN (:ignorePublishers)")
        ->setParameter('ignorePublishers', $ignorePublishers)
        ->setMaxResults(10)
        ->orderBy('p.publisher')
        ->groupBy('p.publisher')
        ->getQuery()
        ->getArrayResult();
    }
}
