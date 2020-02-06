<?php


namespace Vitoop\InfomgmtBundle\Controller\V1;

use http\Message;
use phpDocumentor\Reflection\Types\Integer;
use Proxies\__CG__\Vitoop\InfomgmtBundle\Entity\ConversationData;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\Entity\Conversation;
use Vitoop\InfomgmtBundle\Entity\ConversationMessage;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\RelConversationUser;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Repository\ConversationDataRepository;
use Vitoop\InfomgmtBundle\Repository\ConversationMessageRepository;
use Vitoop\InfomgmtBundle\Repository\ConversationRepository;
use Vitoop\InfomgmtBundle\Repository\RelConversationUserRepository;
use Vitoop\InfomgmtBundle\Repository\UserRepository;
use Vitoop\InfomgmtBundle\Service\MessageService;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

/**
 * @Route("conversations/{id}", requirements={"id": "\d+"})
 */

class ConversationController extends ApiController
{
    public $messageService;

    public function __construct(MessageService $messageService)
    {
        $this->messageService =  $messageService;
    }

    /**
     * @Route("", methods={"GET"})
     * @param $conversation Conversation
     * @return object
     */
    public function getConversationById(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        $this->checkAccess($conversation, $vitoopSecurity);
        $userId = $vitoopSecurity->getUser()->getId();

       return $this->getApiResponse([
            'conversation' => $conversation->getDTO(),
            'isOwner' => $conversation->getConversationData()->availableForDelete($this->getUser()),
            'canEdit' => $conversation->getConversationData()->availableForWriting($this->getUser()),
            'token' => $this->messageService->getToken($userId),
            'userId' => $userId
        ]);
    }

    /**
     * @Route("/messages", methods={"POST"}, requirements={"id": "\d+"})
     *
     * @param $conversation Conversation
     * @param $request Request
     * @param $vitoopSecurity VitoopSecurity
     *
     * @return object
     */
    public function sendMessage(
        Conversation $conversation,
        Request $request,
        VitoopSecurity $vitoopSecurity,
        ConversationMessageRepository $messageRepository
    )
    {
        $conversationData = $conversation->getConversationData();
        $conversationData->__load();
        $message = new ConversationMessage($request->get('message'), $vitoopSecurity->getUser(), $conversationData);
        $messageRepository->save($message);

        return $this->getApiResponse($message);
    }

    /**
     * @Route("/messages/{messageID}", methods={"PUT"})
     *
     * @param ConversationMessage $message
     * @param $request Request
     * @param $vitoopSecurity VitoopSecurity
     * @param Request $request
     *
     * @return object
     */
    public function updateMessage(ConversationMessage $message, VitoopSecurity $vitoopSecurity, ConversationMessageRepository $messageRepository, Request $request)
    {
        $this->checkAccessForDelete($message, $vitoopSecurity);
        $message->setText($request->get('message'));
        $messageRepository->save($message);

        return $this->getApiResponse(['success' => 'success']);
    }

    /**
     * @Route("/messages/{messageID}", methods={"DELETE"})
     *
     * @param $conversation Conversation
     * @param $vitoopSecurity VitoopSecurity
     * @ParamConverter("message", class="Vitoop\InfomgmtBundle\Entity\ConversationMessage", options={"id" = "messageID"})
     */
    public function deleteMessage(ConversationMessage $message, VitoopSecurity $vitoopSecurity, ConversationMessageRepository $messageRepository)
    {
        $this->checkAccessForDelete($message, $vitoopSecurity);

        $messageRepository->remove($message);

        return $this->getApiResponse(['success' => 'success']);
    }

    /**
     * @Route("/user", methods={"POST"} , requirements={"id": "\d+"})
     * @param VitoopSecurity $vitoopSecurity
     * @param Conversation $conversation
     * @param Request $request
     * @param UserRepository $userRepository
     * @param RelConversationUserRepository $conversationUserRepository
     * @return object
     */
    public function addUserToConversation(
        VitoopSecurity $vitoopSecurity,
        Conversation $conversation,
        Request $request,
        UserRepository $userRepository,
        RelConversationUserRepository $conversationUserRepository
    )
    {
        $currentUser = $vitoopSecurity->getUser();
        $this->checkAccessForRelUserAction($conversation, $vitoopSecurity);
        $response = null;

        $user = $userRepository->find((integer)$request->get('userId'));
        if (is_null($user)) {
            $response = ['status' => 'error', 'message' => 'User is not found'];
        } elseif ($user->getUsername() == $currentUser->getUsername()) {
            $response = ['status' => 'error', 'message' => 'User is equal to current'];
        } else {
            foreach ($conversation->getConversationData()->getRelUsers() as $relUser) {
                if ($user->getUsername() == $relUser->getUser()->getUsername()) {
                    $response = ['status' => 'error', 'message' => 'User is already added'];
                    break;
                }
            }
        }
        if (is_null($response)) {
            $rcu = new RelConversationUser($conversation->getConversationData(), $user);
            $conversationUserRepository->addUser($rcu);

            $response = $rcu;
        }

        return $this->getApiResponse($response);
    }

    /**
     * @Route("/user/{userID}", methods={"DELETE"})
     * @param VitoopSecurity $vitoopSecurity
     * @param Conversation $conversation
     * @param User $user
     * @param RelConversationUserRepository $conversationUserRepository
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
     * @return object
     */
    public function removeUserFromConversation(
        VitoopSecurity $vitoopSecurity,
        Conversation $conversation,
        User $user,
        RelConversationUserRepository $conversationUserRepository
    )
    {
        $this->checkAccessForDeleteUser($conversation, $vitoopSecurity);
        $relConversationUser = $conversationUserRepository->getRel($user, $conversation);
        $conversationUserRepository->removeUser($relConversationUser);

        return $this->getApiResponse($relConversationUser);
    }

    /**
     * @Route("/read", methods={"POST"} , requirements={"id": "\d+"})
     * @param VitoopSecurity $vitoopSecurity
     * @param Conversation $conversation
     * @param Request $request
     * @param UserRepository $userRepository
     * @param RelConversationUserRepository $conversationUserRepository
     * @return object
     */
    public function updateUserPermissionForConversation(
        VitoopSecurity $vitoopSecurity,
        Conversation $conversation,
        Request $request,
        UserRepository $userRepository,
        RelConversationUserRepository $conversationUserRepository
    )
    {
        $this->checkAccessForRelUserAction($conversation, $vitoopSecurity);
        $user = $userRepository->find((integer)$request->get('userId'));

        $relConversationUser = $conversationUserRepository->getRel($user, $conversation);
        $relConversationUser->setReadOnly((integer)$request->get('read'));

        $conversationUserRepository->addUser($relConversationUser);

        return $this->getApiResponse(['status' => 'success']);
    }

    /**
     * @Route("/user/find", methods={"POST"})
     * @param Conversation $conversation
     * @param Request $request
     * @param VitoopSecurity $vitoopSecurity
     * @param UserRepository $userRepository
     *
     * @return object
     */
    public function getUserNamesForConversation(Conversation $conversation, Request $request, VitoopSecurity $vitoopSecurity, UserRepository $userRepository)
    {
        $letter = $request->get('symbol');
        $currentUser = $vitoopSecurity->getUser();
        $names = $userRepository->getNames($letter, $currentUser, $conversation->getUser());

        return $this->getApiResponse($names);
    }

    /**
     * @Route("/status", methods={"POST"})
     * @param Conversation $conversation
     * @param Request $request
     * @param VitoopSecurity $vitoopSecurity
     * @param ConversationDataRepository $conversationDataRepository
     *
     * @return object
     */
    public function changeConversationStatus(
        Conversation $conversation,
        Request $request,
        VitoopSecurity $vitoopSecurity,
        ConversationDataRepository $conversationDataRepository
    )
    {
        $this->checkAccessForRelUserAction($conversation, $vitoopSecurity);
        $conversationData = $conversation->getConversationData();
        $conversationData->setIsForRelatedUsers((integer)$request->get('status'));
        $conversationDataRepository->changeStatus($conversationData);

        return $this->getApiResponse($conversationData);
    }

    private function checkAccess(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        if (!$conversation->getConversationData()->availableForReading($vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

    private function checkAccessForDelete(ConversationMessage $message, VitoopSecurity $vitoopSecurity)
    {
        if (!$message->availableForDelete($vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

    private function checkAccessForRelUserAction(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        if (!$conversation->getConversationData()->availableForWriting($vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

    private function checkAccessForDeleteUser(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        if (!$conversation->getConversationData()->availableForDelete($vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }
}