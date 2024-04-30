<?php

namespace App\Controller;

use App\Entity\Address;
use App\Entity\Book;
use App\Entity\Conversation;
use App\Entity\Project;
use App\Entity\Resource;
use App\Repository\AddressRepository;
use App\Repository\BookRepository;
use App\Repository\ConversationRepository;
use App\Repository\ProjectRepository;
use App\Repository\ResourceRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\DTO\Resource\SearchResource;
use App\DTO\Resource\SearchColumns;
use App\DTO\Paging;
use App\Service\ResourceManager;
use App\Repository\UserEmailDetailResourceRepository;
use App\Entity\Userlist;
use Symfony\Component\HttpFoundation\RequestStack;

/**
 * @Route("api/")
 */
class ResourceApiController extends ApiController
{
    private $requestStack;
    public function __construct(RequestStack $requestStack)
    {
        $this->requestStack = $requestStack;
    }
    /**
     * @Route("resource/{resType}", methods={"GET"}, name="api_resource_list", requirements={"resType": "pdf|adr|link|teli|lex|prj|book|conversation|userlist"})
     *
     * @return array
     */
    public function listAction(
        ResourceManager $resourceManager,
        $resType,
        Request $request,
        ConversationRepository $conversationRepository,
        ProjectRepository $projectRepository,
        ResourceRepository $resourceRepository,
        UserEmailDetailResourceRepository $userEmailDetailResourceRepository,
    ) {
        // dd($request->query->get('hrsgslist', array()));
        $search = new SearchResource(
            new Paging(
                $request->query->get('start', 0),
                $request->query->get('length', 10)
            ),
            new SearchColumns(
                $request->query->get('columns', array()),
                $request->query->get('order', array())
            ),
            $this->getUser(),
            $request->query->has('flagged'),
            $request->query->has('resource') ? $request->query->getDigits('resource') : null,
            $request->query->get('taglist', array()),
            $request->query->get('taglist_i', array()),
            $request->query->get('taglist_h', array()),
            $request->query->get('tagcnt', 0),
            $request->query->get('search', null),
            $request->query->get('isUserHook', null),
            $request->query->get('isUserRead', null),
            $request->query->get('sendMail', null),
            $request->query->get('resourceId', null),
            $request->query->get('dateFrom', null),
            $request->query->get('dateTo', null),
            $request->query->get('art', null),
            $request->query->get('color', null),
            $request->query->get('hrsgslist', array()),
            $request->query->get('urlslist', array()),

        );

        $resources = $resourceManager->getRepository($resType)->getResources($search);
        $total = $resourceManager->getRepository($resType)->getResourcesTotal($search);
        if ($resType == 'prj') {
            foreach ($resources as &$resource) {
                $project = $projectRepository->find($resource['id']);
                $resource['canRead'] = $project->getProjectData()->availableForReading($this->getUser());
            }
        }
        if ($resType == 'conversation') {
            foreach ($resources as &$resource) {
                $conversation = $conversationRepository->find($resource['id']);
                $resource['canRead'] = $conversation->getConversationData()->availableForReading($this->getUser());
            }
        }
        if ($request->query->get('color') == 'nobookmark') {
            foreach ($resources as $key => $resource) {
                $email_detail = $userEmailDetailResourceRepository->findOneBy(array('resource' => $resource['id'], 'user' => $this->getUser()));
                if (!empty($email_detail)) {
                    if ($email_detail->getSendEmail() == 1) {
                        unset($resources[$key]);
                    }
                }
            }
        }
        if (!empty($request->query->get('color')) && ($request->query->get('color') != "nobookmark")) {
            foreach ($resources as $key => $resource) {
                if ($request->query->get('color') !== $resource['color']) {
                    unset($resources[$key]);
                }
            }
        }

        $session = $this->requestStack->getSession();
        $resourceInfo = $resourceRepository->getCountByTags($search);
        if($request->query->get('draw') != 2 )
        {
            $session->set('data', $resources);
            $session->set('recordsTotal', $total);
            $session->set('resourceInfo', $resourceInfo);

        } else if (array_values($resources) == ''){
            $resources = $session->get('data');
            $total = $session->get('recordsTotal');
            $resourceInfo = $session->get('resourceInfo');
        }
        return $this->getApiResponse(array(
            'draw' => $request->query->get('draw'),
            'recordsTotal' => $total,
            'recordsFiltered' => $total,
            'data' => array_values($resources),
            'resourceInfo' => $resourceInfo
        ));
    }

    /**
     * @Route(
     *     "{resource_type}/url/check",
     *      requirements={"resource_type"="pdf|link|teli"},
     *      name="check_unique_url",
     *     methods={"POST"}
     * )
     *
     * @return array
     */
    public function checkUniqueUrlAction($resource_type, Request $request, EntityManagerInterface $entityManager)
    {
        $dto = $this->getDTOFromRequest($request);
        if ((strpos($dto->url, 'http://') === false) && 
            (strpos($dto->url, 'https://') === false) && 
            (strpos($dto->url, 'ftp://') === false)
        ) {
            $dto->url = 'http://'.$dto->url;
        }

        $result = $entityManager
            ->getRepository(Resource\ResourceType::getClassByResourceType($resource_type))
            ->findOneBy(['url' => $dto->url]);

        return $this->getApiResponse([
            'success' => true,
            'unique' => is_null($result),
            'id' => is_null($result)?null:$result->getId(),
            'title' => is_null($result)?null:$result->getName()
        ]);
    }

    /**
     * @Route("book/isbn/check", name="check_unique_book__url", methods={"POST"})
     *
     * @return array
     */
    public function checkBookUniqueIsdnAction(Request $request, BookRepository $bookRepository)
    {
        $dto = $this->getDTOFromRequest($request);
        $findByCriteria = [];
        if (isset($dto->isbn) && !empty($dto->isbn) ) {
            $findByCriteria['isbn'] = $dto->isbn;
        }
        $result = $bookRepository->findOneBy($findByCriteria);
        
        return $this->getApiResponse([
            'success' => true,
            'unique' => is_null($result),
            'id' => is_null($result)?null:$result->getId(),
            'title' => is_null($result)?null:$result->getName()
        ]);
    }

    /**
     * @Route("address/institution/check", name="check_unique_address__url", methods={"POST"})
     *
     * @return array
     */
    public function checkAddressUniqueInstAction(Request $request, AddressRepository $addressRepository)
    {
        $dto = $this->getDTOFromRequest($request);
        $result = $addressRepository->findOneBy(['name' => $dto->institution]);
        
        return $this->getApiResponse([
            'success' => true,
            'unique' => is_null($result),
            'id' => is_null($result)?null:$result->getId(),
            'title' => is_null($result)?null:$result->getName()
        ]);
    }
}
