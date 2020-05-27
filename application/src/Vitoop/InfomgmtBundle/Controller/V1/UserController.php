<?php

namespace Vitoop\InfomgmtBundle\Controller\V1;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\Controller\ApiController;
use Vitoop\InfomgmtBundle\DTO\User\ChangePasswordDTO;
use Vitoop\InfomgmtBundle\DTO\User\ForgotPasswordDTO;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Repository\UserRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\EmailSender;
use Vitoop\InfomgmtBundle\Utils\Token\CommonGeneratorStrategy;

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
    public function changePassword(Request $request, User\PasswordEncoderInterface $passwordEncoder)
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
}
