<?php


namespace Vitoop\InfomgmtBundle\Controller;

use http\Message;
use phpDocumentor\Reflection\Types\Integer;
use Proxies\__CG__\Vitoop\InfomgmtBundle\Entity\ConversationData;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Vitoop\InfomgmtBundle\Entity\Conversation;
use Vitoop\InfomgmtBundle\Entity\ConversationMessage;
use Vitoop\InfomgmtBundle\Entity\Pdf;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\User;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Vitoop\InfomgmtBundle\Repository\ConversationRepository;
use Vitoop\InfomgmtBundle\Service\MessageService;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

/**
 * @Route("api/conversation/{id}")
 * @ParamConverter("conversation", class="Vitoop\InfomgmtBundle\Entity\Conversation", options={"id" = "id"})
 */

class ConversationApiController extends ApiController
{
    public $messageService;

    public function __construct()
    {
        $this->messageService =  new MessageService();
    }

    /**
     * @Route("", name="get_conversation_api", methods={"GET"})
     * @param $conversation Conversation
     * @return object
     */
    public function getConversationById(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        $userId = $vitoopSecurity->getUser()->getId();

        $this->messageService->setChannel($conversation->getId());
        $this->messageService->setUserId($userId);

        $this->checkAccess($conversation, $vitoopSecurity);

        return $this->getApiResponse([
            'conversation' => $conversation->getDTO(),
            'isOwner' => $conversation->getConversationData()->availableForDelete($this->getUser()),
            'token' => $this->messageService->token,
            'channel' => $this->messageService->channel,
            'userId' => $userId
        ]);
    }

    /**
     * @Route("/send", methods={"POST"})
     *
     * @param $conversation Conversation
     * @param $request Request
     * @param $vitoopSecurity VitoopSecurity
     *
     * @return object
     */
    public function sendMessage(Conversation $conversation, Request $request, VitoopSecurity $vitoopSecurity)
    {
        $em = $this->getDoctrine()->getManager();
        $user = $vitoopSecurity->getUser();
        $user = $em->getRepository('VitoopInfomgmtBundle:User')->find($user->getId());
        $conversationDataProxy = $conversation->getConversationData();
        $em->detach($conversationDataProxy);
        $conversationData = $em->find('VitoopInfomgmtBundle:ConversationData', $conversationDataProxy->getId());

        $message = new ConversationMessage();
        $message->setText($request->get('message'));
        $message->setUser($user);
        $message->setConversationData($conversationData);
        $message->setCreated(new \DateTime());

        $em->merge($message);
        $em->flush();

        return $this->getApiResponse([
            'message' => 'Success sending message - ' . $request->get('message'),
        ]);
    }

    /**
     * @Route("/delete/{messageId}", methods={"DELETE"})
     *
     * @param $conversation Conversation
     * @param $vitoopSecurity VitoopSecurity
     * @ParamConverter("message", class="Vitoop\InfomgmtBundle\Entity\ConversationMessage", options={"id" = "messageId"})
     * @return object
     */
    public function deleteMessage(Conversation $conversation,  VitoopSecurity $vitoopSecurity)
    {

    }

    private function checkAccess(Conversation $conversation, VitoopSecurity $vitoopSecurity)
    {
        if (!$conversation->getConversationData()->availableForReading($vitoopSecurity->getUser())) {
            throw new AccessDeniedHttpException;
        }
    }

}