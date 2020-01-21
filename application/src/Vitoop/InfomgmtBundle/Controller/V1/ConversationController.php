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
use Vitoop\InfomgmtBundle\Repository\ConversationRepository;
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
            'token' => $this->messageService->getToken($userId),
            'userId' => $userId
        ]);
    }

    /**
     * @Route("/send", methods={"POST"}, requirements={"id": "\d+"})
     *
     * @param $conversation Conversation
     * @param $request Request
     * @param $vitoopSecurity VitoopSecurity
     *
     * @return object
     */
    public function sendMessage(Conversation $conversation, Request $request, VitoopSecurity $vitoopSecurity, UserRepository $userRepository)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $userRepository->find($vitoopSecurity->getUser()->getId());
        $conversationDataProxy = $conversation->getConversationData();
        $em->detach($conversationDataProxy);
        $conversationData = $em->find('VitoopInfomgmtBundle:ConversationData', $conversationDataProxy->getId());

        $message = new ConversationMessage($request->get('message'), $user, $conversationData);
        $em->merge($message);
        $em->flush();

        return $this->getApiResponse([
            'message' => 'Success sending message - ' . $request->get('message'),
        ]);
    }

    /**
     * @Route("/messages/{id}", methods={"DELETE"})
     *
     * @param $conversation Conversation
     * @param $vitoopSecurity VitoopSecurity
     * @ParamConverter("message", class="Vitoop\InfomgmtBundle\Entity\ConversationMessage", options={"id" = "messageId"})
     * @return object
     */
    public function deleteMessage(Conversation $conversation,  VitoopSecurity $vitoopSecurity)
    {
        //To do
    }

    private function checkAccess(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        if (!$conversation->getConversationData()->availableForReading($vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

}