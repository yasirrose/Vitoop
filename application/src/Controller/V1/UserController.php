<?php

namespace App\Controller\V1;

use App\DTO\User\UserNoteDTO;
use App\Entity\User\PasswordEncoderInterface;
use App\Entity\User\UserNotes;
use App\Repository\UserNotesRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use App\Controller\ApiController;
use App\DTO\User\ChangePasswordDTO;
use App\DTO\User\ForgotPasswordDTO;
use App\Entity\User\User;
use App\Repository\UserRepository;
use App\Response\Json\ErrorResponse;
use App\Service\EmailSender;
use App\Service\SettingsService;
use App\Utils\Token\CommonGeneratorStrategy;

/**
 * @Route("users")
 */
class UserController extends ApiController
{
    /**
     * @var ValidatorInterface
     */
    private $validator;

    /**
     * @var EmailSender
     */
    private $emailSender;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * UserController constructor.
     * @param ValidatorInterface $validator
     * @param EmailSender $emailSender
     * @param UserRepository $userRepository
     */
    public function __construct(ValidatorInterface $validator, EmailSender $emailSender, UserRepository $userRepository)
    {
        $this->validator = $validator;
        $this->emailSender = $emailSender;
        $this->userRepository = $userRepository;
    }

    /**
     * @Route("/passwords", methods={"POST"})
     */
    public function forgotPassword(Request $request, CommonGeneratorStrategy $commonGeneratorStrategy)
    {
        /**
         * @var ForgotPasswordDTO $dto
         */
        $dto = $this->getDTOFromRequest($request,  ForgotPasswordDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $user = $this->userRepository->findOneBy(['email' => $dto->email]);
        if ($user) {
            $user->generateForgotPasswordToken($commonGeneratorStrategy);
            $this->userRepository->save();

            $this->emailSender->sendUserForgotPassword($user);
        }

        return $this->getApiResponse(null, 204);
    }

    /**
     * @Route("/passwords", methods={"PUT"})
     */
    public function changePassword(Request $request, PasswordEncoderInterface $passwordEncoder)
    {
        /**
         * @var ChangePasswordDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, ChangePasswordDTO::class);
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        /**
         * @var User|null $user
         */
        $user = $this->userRepository->findByResetToken($dto->token);
        if (!$user) {
            throw $this->createNotFoundException();
        }

        $user->changePassword($dto->password, $passwordEncoder);
        $this->userRepository->save();

        return $this->getApiResponse(null, 204);
    }

    /**
     * @Route("/datap", methods={"GET"})
     */
    public function getDataP(SettingsService $settingsService)
    {
        return $this->getApiResponse([
            'datap' => $settingsService->getDataP()->getValue()
        ], 200);
    }

    /**
     * @Route("/notes", methods={"GET"})
     */
    public function getNotes(UserNotesRepository $userNotesRepository)
    {
        $userNotes = $userNotesRepository->findOneBy(['user' => $this->getUser()]);
        if (!$userNotes) {
            $userNotes = new UserNotes($this->getUser(), '');
            $userNotesRepository->save($userNotes);
        }

        return $this->getApiResponse($userNotes);
    }

    /**
     * @Route("/notes", methods={"PUT"})
     */
    public function updateNotes(Request $request, UserNotesRepository $userNotesRepository)
    {
        $dto = $this->getDTOFromRequest($request, UserNoteDTO::class);
        $userNotes = $userNotesRepository->findOneBy(['user' => $this->getUser()]);
        if (!$userNotes) {
            $userNotes = new UserNotes($this->getUser(), '');
        }
        $userNotes->updateNotes($dto->notes);
        $userNotesRepository->save($userNotes);

        return $this->getApiResponse($userNotes);
    }
}
