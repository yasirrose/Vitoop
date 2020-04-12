<?php
namespace Vitoop\InfomgmtBundle\Controller;

use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\ToDoItem;
use Vitoop\InfomgmtBundle\Entity\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

/**
 * @Route("/api/user/{user_id}/todo", requirements={"user_id": "\d+"})
 * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "user_id"})
 */
class ToDoController extends ApiController
{
    /**
     * @Route("/{id}", requirements={"id": "\d+"}, name="to_do_items_delete", methods={"DELETE"})
     * @ParamConverter("item", class="Vitoop\InfomgmtBundle\Entity\ToDoItem", options={"id" = "id"})
     *
     * @return array
     */
    public function deleteAction(User $user, ToDoItem $item, Request $request)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }

        $em = $this->getDoctrine()->getManager();
        $em->remove($item);
        $em->flush();

        return $this->getApiResponse(['success' => 'success']);
    }

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, name="to_do_items_edit", methods={"PUT"})
     *
     * @return array
     */
    public function editAction(User $user, Request $request)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }
        $serializer = $this->get('jms_serializer');
        $serializerContext = DeserializationContext::create()
            ->setGroups(array('edit'));
        $item = $serializer->deserialize(
            $request->getContent(),
            'Vitoop\InfomgmtBundle\Entity\ToDoItem',
            'json',
            $serializerContext
        );
        $item->setUser($user);
        $em = $this->getDoctrine()->getManager();
        $em->persist($item);
        $em->flush();
        $response = $serializer->serialize(array('success' => 'success'), 'json');

        return new Response($response);
    }

    /**
     * @Route("", name="to_do_items_new", methods={"POST"})
     *
     * @return array
     */
    public function newAction(User $user, Request $request)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }

        $serializer = $this->get('jms_serializer');
        $serializerContext = DeserializationContext::create()
            ->setGroups(array('new'));
        $item = $serializer->deserialize(
            $request->getContent(),
            'Vitoop\InfomgmtBundle\Entity\ToDoItem',
            'json',
            $serializerContext
        );
        if (is_null($item->getOrder())) {
            $item->setOrder(0);
        }
        $item->setUser($user);
        $em = $this->getDoctrine()->getManager();
        $item = $em->persist($item);
        $em->flush();
        $response = $serializer->serialize(array('success' => 'success', 'id' => $item->getId()), 'json');

        return new Response($response);
    }

    /**
     * @Route("", name="to_do_items_list", methods={"GET"})
     *
     * @return array
     */
    public function listAction(User $user)
    {
        if ($this->getUser()->getId() !== $user->getId()) {
            throw new AccessDeniedHttpException;
        }
        $serializer = $this->get('jms_serializer');
        $serializerContext = SerializationContext::create()
            ->setGroups(array('list'));
        $response = $serializer->serialize(
            $user->getToDoItems(),
            'json',
            $serializerContext
        );

        return new Response($response);
    }
}
