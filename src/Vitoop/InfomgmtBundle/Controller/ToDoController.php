<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use JMS\Serializer\DeserializationContext;
use JMS\Serializer\SerializationContext;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
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

class ToDoController extends Controller
{

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, name="to_do_items_delete")
     * @Method({"DELETE"})
     * @ParamConverter("item", class="Vitoop\InfomgmtBundle\Entity\ToDoItem", options={"id" = "id"})
     *
     * @return array
     */
    public function deleteAction(User $user, ToDoItem $item, Request $request)
    {
        if ($this->getUser()->getId() == $user->getId()) {
            $serializer = $this->get('jms_serializer');
            $em = $this->getDoctrine()->getManager();
            $em->remove($item);
            $em->flush();
            $response = $serializer->serialize(array('success' => 'success'), 'json');
        } else {
            throw new AccessDeniedHttpException;
        }

        return new Response($response);
    }

    /**
     * @Route("/{id}", requirements={"id": "\d+"}, name="to_do_items_edit")
     * @Method({"POST"})
     *
     * @return array
     */
    public function editAction(User $user, Request $request)
    {
        if ($this->getUser()->getId() == $user->getId()) {
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
            $em->merge($item);
            $em->flush();
            $response = $serializer->serialize(array('success' => 'success'), 'json');
        } else {
            throw new AccessDeniedHttpException;
        }

        return new Response($response);
    }

    /**
     * @Route("", name="to_do_items_new")
     * @Method({"POST"})
     *
     * @return array
     */
    public function newAction(User $user, Request $request)
    {
        if ($this->getUser()->getId() == $user->getId()) {
            $serializer = $this->get('jms_serializer');
            $serializerContext = DeserializationContext::create()
                ->setGroups(array('new'));
            $item = $serializer->deserialize(
                $request->getContent(),
                'Vitoop\InfomgmtBundle\Entity\ToDoItem',
                'json',
                $serializerContext
            );
            $item->setUser($user);
            $em = $this->getDoctrine()->getManager();
            $item = $em->merge($item);
            $em->flush();
            $response = $serializer->serialize(array('success' => 'success', 'id' => $item->getId()), 'json');
        } else {
            throw new AccessDeniedHttpException;
        }

        return new Response($response);
    }

    /**
     * @Route("", name="to_do_items_list")
     * @Method({"GET"})
     *
     * @return array
     */
    public function listAction(User $user)
    {
        if ($this->getUser()->getId() == $user->getId()) {
            $serializer = $this->get('jms_serializer');
            $serializerContext = SerializationContext::create()
                ->setGroups(array('list'));
            $response = $serializer->serialize(
                $user->getToDoItems(),
                'json',
                $serializerContext
            );
        } else {
            throw new AccessDeniedHttpException;
        }

        return new Response($response);
    }
}

