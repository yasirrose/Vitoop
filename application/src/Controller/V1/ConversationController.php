<?php

namespace App\Controller\V1;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Controller\ApiController;
use App\DTO\QueueMessage\ConversationMessageNotification;
use App\DTO\Resource\ConversationAssignment;
use App\DTO\Resource\SearchResource;
use App\Entity\Conversation;
use App\Entity\ConversationMessage;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\Project;
use App\Entity\RelConversationUser;
use App\Entity\User\User;
use App\Repository\ConversationDataRepository;
use App\Repository\ConversationMessageRepository;
use App\Repository\RelConversationUserRepository;
use App\Repository\RelResourceResourceRepository;
use App\Repository\ResourceRepository;
use App\Repository\UserRepository;
use App\Response\Json\ErrorResponse;
use App\Service\Conversation\ConversationNotificator;
use App\Service\MessageService;
use App\Service\Queue\DelayEventNotificator;
use App\Service\RelResource\RelResourceLinker;
use App\Service\ResourceManager;
use App\Service\VitoopSecurity;

/**
 * @Route("conversations/{id}", requirements={"id": "\d+"})
 */

class ConversationController extends ApiController
{
    private $messageService;

    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;

    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var ResourceRepository
     */
    private $resourceRepository;
    /**
     * @var RelResourceLinker
     */
    private $relResourceLinker;

    /**
     * ConversationController constructor.
     * @param MessageService $messageService
     * @param VitoopSecurity $vitoopSecurity
     * @param ResourceRepository $resourceRepository
     * @param RelResourceLinker $relResourceLinker
     * @param ValidatorInterface $validator
     */
    public function __construct(
        MessageService $messageService,
        VitoopSecurity $vitoopSecurity,
        ResourceRepository $resourceRepository,
        RelResourceLinker $relResourceLinker,
        ValidatorInterface $validator
    ) {
        $this->messageService =  $messageService;
        $this->vitoopSecurity = $vitoopSecurity;
        $this->validator = $validator;
        $this->resourceRepository = $resourceRepository;
        $this->relResourceLinker = $relResourceLinker;
    }

    /**
     * @Route("", methods={"GET"})
     * @param $conversation Conversation
     * @return object
     */
    public function getConversationById(Conversation $conversation)
    {
        $this->checkAccess($conversation);
        $userId = $this->getUser()->getId();

        $resourceInfo = $this->resourceRepository->getCountOfRelatedResources($conversation);

        return $this->getApiResponse([
            'conversation' => $conversation->getDTO(),
            'resourceInfo' => $resourceInfo,
            'isOwner' => $conversation->getConversationData()->availableForDelete($this->getUser()),
            'canEdit' => $conversation->getConversationData()->availableForWriting($this->getUser()),
            'token' => $this->messageService->getToken($userId, $conversation->getId()),
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
     * @param ConversationMessageRepository $messageRepository
     * @param ConversationNotificator $conversationNotificator
     * @param DelayEventNotificator $delayEventNotificator
     * @return object
     */
    public function sendMessage(
        Conversation $conversation,
        Request $request,
        ConversationMessageRepository $messageRepository,
        ConversationNotificator $conversationNotificator,
        DelayEventNotificator $delayEventNotificator
    ) {
        $conversationData = $conversation->getConversationData();
        $message = new ConversationMessage($request->get('message'), $this->getUser(), $conversationData);
        $messageRepository->save($message);

        //send notification
        $delayEventNotificator->notify(new ConversationMessageNotification($message->getId()));
        $this->messageService->sendMessageToChanel($conversation->getId(), $message->getDTO());

        return $this->getApiResponse($message);
    }

    /**
     * @Route("/messages/{messageID}", methods={"POST"})
     *
     * @param ConversationMessage $message
     * @param $vitoopSecurity VitoopSecurity
     * @param ConversationMessageRepository $messageRepository
     * @param Request $request
     * @ParamConverter("message", class="App\Entity\ConversationMessage", options={"id" = "messageID"})
     * @return object
     */
    public function updateMessage(
        ConversationMessage $message,
        ConversationMessageRepository $messageRepository,
        Request $request
    ) {
        $this->checkAccessForDelete($message);
        $message->setText($request->get('updatedMessage'));
        $messageRepository->save($message);

        return $this->getApiResponse(['success' => 'success']);
    }

    /**
     * @Route("/messages/{messageID}", methods={"DELETE"})
     *
     * @param $conversation Conversation
     * @param $vitoopSecurity VitoopSecurity
     * @ParamConverter("message", class="App\Entity\ConversationMessage", options={"id" = "messageID"})
     */
    public function deleteMessage(
        ConversationMessage $message,
        ConversationMessageRepository $messageRepository
    ) {
        $this->checkAccessForDelete($message);

        $messageRepository->remove($message);

        return $this->getApiResponse(['success' => 'success']);
    }

    /**
     * @Route("/user", methods={"POST"} , requirements={"id": "\d+"})
     * @param Conversation $conversation
     * @param Request $request
     * @param UserRepository $userRepository
     * @param RelConversationUserRepository $conversationUserRepository
     * @return object
     */
    public function addUserToConversation(
        Conversation $conversation,
        Request $request,
        UserRepository $userRepository,
        RelConversationUserRepository $conversationUserRepository
    ) {
        $currentUser = $this->getUser();
        $this->checkAccessForRelUserAction($conversation);
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
     * @param Conversation $conversation
     * @param User $user
     * @param RelConversationUserRepository $conversationUserRepository
     * @ParamConverter("user", class="App\Entity\User\User", options={"id" = "userID"})
     * @return object
     */
    public function removeUserFromConversation(
        Conversation $conversation,
        User $user,
        RelConversationUserRepository $conversationUserRepository
    ) {
        $this->checkAccessForDeleteUser($conversation);
        $relConversationUser = $conversationUserRepository->getRel($user, $conversation);
        $conversationUserRepository->removeUser($relConversationUser);

        return $this->getApiResponse($relConversationUser);
    }

    /**
     * @Route("/read", methods={"POST"} , requirements={"id": "\d+"})
     * @param Conversation $conversation
     * @param Request $request
     * @param UserRepository $userRepository
     * @param RelConversationUserRepository $conversationUserRepository
     * @return object
     */
    public function updateUserPermissionForConversation(
        Conversation $conversation,
        Request $request,
        UserRepository $userRepository,
        RelConversationUserRepository $conversationUserRepository
    ) {
        $this->checkAccessForRelUserAction($conversation);
        $user = $userRepository->find((integer)$request->get('userId'));

        $relConversationUser = $conversationUserRepository->getRel($user, $conversation);
        $relConversationUser->setReadOnly(filter_var($request->get('read'), FILTER_VALIDATE_BOOLEAN));

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
    public function getUserNamesForConversation(Conversation $conversation, Request $request, UserRepository $userRepository)
    {
        $letter = $request->get('symbol');
        $currentUser = $this->getUser();
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
        ConversationDataRepository $conversationDataRepository
    ) {
        $this->checkAccessForRelUserAction($conversation);
        $conversationData = $conversation->getConversationData();
        $conversationData->setIsForRelatedUsers((integer)$request->get('status'));
        $conversationDataRepository->save($conversationData);

        return $this->getApiResponse($conversationData);
    }

    /**
     * @Route("/notifications", methods={"POST"})
     */
    public function createNotificationSubscription(
        Conversation $conversation,
        ConversationDataRepository $conversationDataRepository
    ) {
        $this->checkAccess($conversation);
        $conversationData = $conversation->getConversationData();
        $conversationData->userNotify($this->getUser(), true);
        $conversationDataRepository->save($conversationData);

        return $this->getApiResponse($conversationData);
    }

    /**
     * @Route("/notifications", methods={"DELETE"})
     */
    public function deleteNotificationSubscription(
        Conversation $conversation,
        ConversationDataRepository $conversationDataRepository
    ) {
        $this->checkAccess($conversation);
        $conversationData = $conversation->getConversationData();
        $conversationData->userNotify($this->getUser(), false);
        $conversationDataRepository->save($conversationData);

        return $this->getApiResponse($conversationData);
    }

    /**
     * @Route("/assignments", methods={"GET"})
     */
    public function getAssignments(
        Conversation $conversation,
        RelResourceResourceRepository $relResourceRepository
    ) {
        $this->checkAccess($conversation);
        return $this->getApiResponse(
            $relResourceRepository->getAllAssignmentsDTO($conversation->getId(), $this->getUser()->getId())
        );
    }

    /**
     * @Route("/assignments", methods={"POST"})
     */
    public function createAssigment(Conversation $conversation, Request $request)
    {
        $dto = $this->getDTOFromRequest($request, ConversationAssignment::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }
        $resources = $this->resourceRepository->findBy(['id' => $dto->resourceIds]);
        try {
            $assignments = [];
            foreach ($resources as $resource) {
                $relResource = $this->relResourceLinker->linkConversationToResource($conversation, $resource);
                $assignments[] = $relResource->getDTO();
            }
        } catch (\Exception $exception) {
            return $this->getApiResponse(new ErrorResponse([$exception->getMessage()]), 400);
        }

        return $this->getApiResponse($assignments, 201);
    }

    /**
     * @Route("/{resType}", methods={"GET"}, requirements={"resType": "pdf|adr|link|teli|lex|prj|book"})
     */
    public function getRelatedResources(
        Conversation $conversation,
        $resType,
        ResourceManager $resourceManager,
        Request $request
    ) {
        $search = SearchResource::createFromRequest($request, $this->getUser(), $conversation->getId());

        $resourceRepository = $resourceManager->getRepository($resType);
        $resources = $resourceRepository->getResources($search);
        $total = $resourceRepository->getResourcesTotal($search);

        if ('prj' === $resType) {
            foreach ($resources as &$resource) {
                if (null === $resource['id']) {
                    continue;
                }
                $project = $resourceRepository->find($resource['id']);
                $resource['canRead'] = $project->getProjectData()->availableForReading($this->getUser());
            }
        }

        return $this->getApiResponse([
            'recordsTotal' => $total,
            'recordsFiltered' => $total,
            'data' => $resources,
            'resourceInfo' => $this->resourceRepository->getCountByTags($search)
        ]);
    }

    /**
     * @param Conversation $conversation
     */
    private function checkAccess(Conversation $conversation)
    {
        if (!$conversation->getConversationData()->availableForReading($this->vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

    /**
     * @param ConversationMessage $message
     */
    private function checkAccessForDelete(ConversationMessage $message)
    {
        if (!$message->availableForDelete($this->vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

    /**
     * @param Conversation $conversation
     */
    private function checkAccessForRelUserAction(Conversation $conversation)
    {
        if (!$conversation->getConversationData()->availableForWriting($this->vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

    /**
     * @param Conversation $conversation
     */
    private function checkAccessForDeleteUser(Conversation $conversation)
    {
        if (!$conversation->getConversationData()->availableForDelete($this->vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }
}
