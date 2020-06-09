<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\QueueMessage\ConversationMessageNotification;
use Vitoop\InfomgmtBundle\DTO\Resource\ConversationAssignment;
use Vitoop\InfomgmtBundle\DTO\Resource\SearchResource;
use Vitoop\InfomgmtBundle\Entity\Conversation;
use Vitoop\InfomgmtBundle\Entity\ConversationMessage;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\RelConversationUser;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Repository\ConversationDataRepository;
use Vitoop\InfomgmtBundle\Repository\ConversationMessageRepository;
use Vitoop\InfomgmtBundle\Repository\RelConversationUserRepository;
use Vitoop\InfomgmtBundle\Repository\RelResourceResourceRepository;
use Vitoop\InfomgmtBundle\Repository\ResourceRepository;
use Vitoop\InfomgmtBundle\Repository\UserRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\Conversation\ConversationNotificator;
use Vitoop\InfomgmtBundle\Service\MessageService;
use Vitoop\InfomgmtBundle\Service\Queue\DelayEventNotificator;
use Vitoop\InfomgmtBundle\Service\RelResource\RelResourceLinker;
use Vitoop\InfomgmtBundle\Service\ResourceManager;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

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

        return $this->getApiResponse($message);
    }

    /**
     * @Route("/messages/{messageID}", methods={"POST"})
     *
     * @param ConversationMessage $message
     * @param $vitoopSecurity VitoopSecurity
     * @param ConversationMessageRepository $messageRepository
     * @param Request $request
     * @ParamConverter("message", class="Vitoop\InfomgmtBundle\Entity\ConversationMessage", options={"id" = "messageID"})
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
     * @ParamConverter("message", class="Vitoop\InfomgmtBundle\Entity\ConversationMessage", options={"id" = "messageID"})
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
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
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
