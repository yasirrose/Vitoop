<?php
namespace App\Controller;

use App\Repository\ToDoItemRepository;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\ToDoItem;
use App\Entity\User\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * @Route("/api/user/{user_id}/todo", requirements={"user_id": "\d+"})
 * @ParamConverter("user", class="App\Entity\User\User", options={"id" = "user_id"})
 */
class ToDoController extends ApiController
{
    /**
     * @var ToDoItemRepository
     */
    private $todoRepository;

    /**
     * ToDoController constructor.
     * @param ToDoItemRepository $todoRepository
     */
    public function __construct(ToDoItemRepository $todoRepository)
    {
        $this->todoRepository = $todoRepository;
    }

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, name="to_do_items_delete", methods={"DELETE"})
     * @ParamConverter("item", class="App\Entity\ToDoItem", options={"id" = "id"})
     *
     * @return array
     */
    public function deleteAction(User $user, ToDoItem $item, Request $request)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }

        $this->todoRepository->save($item);

        return $this->getApiResponse(['success' => 'success']);
    }

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, name="to_do_items_edit", methods={"PUT"})
     *
     * @return array
     */
    public function editAction(User $user, Request $request, SerializerInterface $serializer)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }
        $serializerContext = DeserializationContext::create()->setGroups(array('edit'));
        $item = $serializer->deserialize(
            $request->getContent(),
            ToDoItem::class,
            'json',
            $serializerContext
        );
        $item->setUser($user);
        $this->todoRepository->save($item);

        $response = $serializer->serialize(array('success' => 'success'), 'json');

        return new Response($response);
    }

    /**
     * @Route("", name="to_do_items_new", methods={"POST"})
     *
     * @return array
     */
    public function newAction(User $user, Request $request, SerializerInterface $serializer)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }

        $serializerContext = DeserializationContext::create()->setGroups(array('new'));
        $item = $serializer->deserialize(
            $request->getContent(),
            ToDoItem::class,
            'json',
            $serializerContext
        );
        if (is_null($item->getOrder())) {
            $item->setOrder(0);
        }
        $item->setUser($user);
        $this->todoRepository->save($item);
        $response = $serializer->serialize(array('success' => 'success', 'id' => $item->getId()), 'json');

        return new Response($response);
    }

    /**
     * @Route("", name="to_do_items_list", methods={"GET"})
     *
     * @return array
     */
    public function listAction(User $user, SerializerInterface $serializer)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }
        $serializerContext = SerializationContext::create()->setGroups(array('list'));
        $response = $serializer->serialize(
            $user->getToDoItems(),
            'json',
            $serializerContext
        );

        return new Response($response);
    }
}
