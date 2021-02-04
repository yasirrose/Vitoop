<?php
namespace App\Controller;

use App\Entity\User\PasswordEncoderInterface;
use App\Repository\InvitationRepository;
use App\Repository\UserAgreementRepository;
use App\Repository\UserRepository;
use App\Service\EmailSender;
use App\Service\UserConfigManager;
use App\Utils\Token\CommonGeneratorStrategy;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpFoundation\Session\Storage\SessionStorageInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use App\Entity\Invitation;
use App\Entity\Project;
use App\Entity\User\User;
use App\Entity\UserAgreement;
use App\Form\Type\UserType;
use App\Form\Type\InvitationType;
use App\DTO\User\NewUserDTO;
use App\DTO\User\CredentialsDTO;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use App\Service\SettingsService;
use App\Service\VitoopSecurity;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserController extends ApiController
{
    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var EmailSender
     */
    private $emailSender;
    /**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * UserController constructor.
     * @param VitoopSecurity $vitoopSecurity
     * @param UserRepository $userRepository
     * @param EmailSender $emailSender
     * @param TokenStorageInterface $tokenStorage
     */
    public function __construct(
        VitoopSecurity $vitoopSecurity,
        UserRepository $userRepository,
        EmailSender $emailSender,
        TokenStorageInterface $tokenStorage
    ) {
        $this->vitoopSecurity = $vitoopSecurity;
        $this->userRepository = $userRepository;
        $this->emailSender = $emailSender;
        $this->tokenStorage = $tokenStorage;
    }


    /**
     * @Route("api/user/{userID}", name="user_delete", methods={"DELETE"})
     * @ParamConverter("user", class="App\Entity\User\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function deleteUserAction(TokenStorageInterface $tokenStorage, User $user)
    {
        if (!$this->vitoopSecurity->isEqualToCurrentUser($user)) {
            throw new AccessDeniedHttpException;
        }
        $user->deactivate();
        $this->userRepository->save();

        $tokenStorage->setToken(null);

        return $this->getApiResponse([
            'success' => true,
            'url' => $this->generateUrl('_base_url')
        ]);
    }

    /**
     * @Route("api/project/{projectID}/user/find", name="user_names")
     * @ParamConverter("project", class="App\Entity\Project", options={"id" = "projectID"})
     */
    public function getUserNamesAction(Project $project, Request $request, SerializerInterface $serializer)
    {
        $letter = $request->query->get('s');
        $user = $this->getUser();
        $names = $this->userRepository->getNames($letter, $user->getId(), $project->getUser());
        $response = $serializer->serialize($names, 'json');

        return new Response($response);
    }

    /**
     * @Route("user/agreement", name="user_agreement", methods={"POST", "GET"})
     *
     * @return array
     */
    public function getUserAgreement(
        SettingsService $settings,
        UserAgreementRepository $userAgreementRepository,
        Request $request
    ) {
        $user = $this->vitoopSecurity->getUser();
        if ($user && ($request->getMethod() === 'POST')) {
            $user->setIsAgreedWithTerms((bool) $request->get('user_agreed'));
            if ($request->get('user_agreed')) {
                $history = new UserAgreement($user, $request->getClientIp());
                $userAgreementRepository->save($history);
            }
            $this->userRepository->save();

            return $this->redirect($this->generateUrl('_resource_list', array('res_type'=>'link')));
        }
        $terms = $settings->getTerms()->getValue();

        return $this->render('User/agreement.html.twig', ['terms' => $terms, 'without_js' => true]);
    }

    /**
     * @Route("user/datap", name="user_datap", methods={"GET"})
     */
    public function dataPAction(SettingsService $settings)
    {
        return $this->render(
            'User/datap.html.twig',
            [
                'datap' => $settings->getDataP()->getValue(),
                'without_js' => true
            ]
        );
    }

    /**
     * @Route("/register/{secret}", name="_register")
     */
    public function registerAction(
        Request $request,
        $secret,
        PasswordEncoderInterface $passwordEncoder,
        InvitationRepository $invitationRepository
    ) {
        $invitation = $invitationRepository->findOneBy(array('secret' => $secret));
        if (null === $invitation) {
            throw new AccessDeniedException();
        }

        if (!$invitation->isActual()){
            return $this->render('User/datap.html.twig', ['fv' => null]);
        }

        $form = $this->createForm(UserType::class, new NewUserDTO($invitation->getEmail()), array(
            'action' => $this->generateUrl('_register', array('secret' => $secret)),
            'method' => 'POST'
        ));

        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $user = User::create($form->getData(), $passwordEncoder);
                $this->userRepository->add($user);
                $invitationRepository->remove($invitation);

                $this->emailSender->sendRegisterNotification($user);

                $this->authenticateUser($user);

                return $this->redirect($this->generateUrl('_resource_list', ['res_type' => 'link']));
            }
        }

        return $this->render('User/datap.html.twig', ['fv' => $form->createView()]);
    }

    /**
     * @deprecated
     * @Route("/invite", name="_invite")
     */
    public function inviteAction(Request $request, InvitationRepository $invitationRepository)
    {
        $link = '';
        $info = '';
        $mail = <<<'EOT'
Hallo!

Hiermit bist Du herzlich zum neuen Informationsportal vitoop eingeladen.

Du kannst Dich registrieren unter: {LINK}
(Beachte bitte, dass dieser Link bis zum {UNTIL} gültig ist.)

LG

David Rogalski
EOT;

        $invitation = new Invitation();
        $invitation->setSubject('Einladung zum Informationsportal vitoop');
        $invitation->setMail($mail);
        $form = $this->createForm(InvitationType::class, $invitation, array(
            'action' => $this->generateUrl('_invite'),
            'method' => 'POST'
        ));

        if ('POST' === $request->getMethod()) {
            $form->handleRequest($request);
            if ($form->isSubmitted() && $form->isValid()) {
                $existing_invitation = $invitationRepository->findOneBy(array('email' => $invitation->getEmail()));
                if (null === $existing_invitation) {
                    $user = $this->getUser();
                    $invitation->setUser($user);

                    $days = $form->get('days')->getData();
                    $until = new \DateTime();
                    $until = $until->add(new \DateInterval('P' . $days . 'D'));
                    $invitation->setUntil($until);
                    $invitationRepository->save($invitation);

                    $this->emailSender->sendInvite($invitation);

                    $info = 'Einladung erfolgreich versendet!';
                } else {
                    $until = new \DateTime();
                    $until = $until->add(new \DateInterval('P3D'));
                    $existing_invitation->setUntil($until);
                    $invitationRepository->save($existing_invitation);
                    $info = 'An diese eMail Adresse wurde bereits eine Einladung versendet. Die Gültigkeit wurde von jetzt an auf 3 Tage neu gesetzt';
                }
            }
        }
        $fv = $form->createView();

        return $this->render('User/invite.html.twig', ['fv' => $fv, 'link' => $link, 'info' => $info]);
    }

    /**
     * @Route("/logout", name="app_logout")
     */
    public function byeAction()
    {
        return $this->render('User/bye.html.twig');
    }

    /**
     * @Route("/login", name="_login")
     */
    public function loginAction(AuthenticationUtils $authenticationUtils, Request $request)
    {
        // get the login error if there is one
        $error = $authenticationUtils->getLastAuthenticationError();

        // last username entered by the user
        $lastUsername = $authenticationUtils->getLastUsername();

        $tpl_vars = [
            'last_username' => $lastUsername,
            'error' => $error
        ];

        $content_tpl = 'User/login.html.twig';

        if ($request->isXmlHttpRequest()) {
            $tpl = $content_tpl;
        } else {
            $tpl = 'Resource/home.html.twig';
            $tpl_vars = array_merge($tpl_vars, array('homecontenttpl' => $content_tpl));
        }

        return $this->render($tpl, $tpl_vars);
    }

    /**
     * @Route("/impressum", name="_imprint")
     */
    public function imprintAction()
    {
        return $this->render('User/imprint.html.twig');
    }

    private function authenticateUser(UserInterface $user)
    {
        $providerKey = 'secured_infomgmt'; // your firewall name
        $token = new UsernamePasswordToken($user, null, $providerKey, $user->getRoles());
        $this->tokenStorage->setToken($token);
    }

    /**
     * @Route("/password/forgotPassword", name="forgot_password")
     * @param Request $request
     * @param CommonGeneratorStrategy $commonGeneratorStrategy
     * @param SessionInterface $sessionStorage
     * @return Response
     */
    public function forgotPasswordAction(
        Request $request,
        CommonGeneratorStrategy $commonGeneratorStrategy,
        SessionInterface $sessionStorage
    ) {
        if ($request->getMethod() == 'POST') {
            $user = $this->userRepository->findOneByEmail($request->get('email'));
            if($user) {
                $user->generateForgotPasswordToken($commonGeneratorStrategy);
                $this->userRepository->save();

                $this->emailSender->sendUserForgotPassword($user);
            }

            $sessionStorage->getFlashBag()->add(
                    'sucess',
                    'When you are registered with the address you inserted in the field, you got am mail with link so you can change your password'
                );
        }
        return $this->render('User/forgotPassword.html.twig');
    }
    
  /**
     * @Route("/password/new/{token}", name="password_new")
     */
    public function passwordnewAction(Request $request, PasswordEncoderInterface $passwordEncoder, SessionInterface $session)
    {
        $user = $this->userRepository->findByResetToken($request->get('token'));
        if (!$user) {
            throw $this->createNotFoundException();
        }
        
        if ($request->getMethod() == 'POST') {
            $user->changePassword(
                $request->get('password'),
                $passwordEncoder
            );
            $this->userRepository->save();

            $session->getFlashBag()->add(
                'success',
                'your password was changed'
            );
            
            return $this->redirect($this->generateUrl('_home'));
        }

        return $this->render('User/changePassword.html.twig',
            array('token' => $request->get('token'))
        );
    }

    /**
     * @Route("user/settings", name="user_settings", methods={"GET"})
     */
    public function userDataAction()
    {
        $user = $this->vitoopSecurity->getUser();

        return $this->render('User/credentials.html.twig', ['user' => $user]);
    }

    /**
     * @Route("api/user/{id}/credentials",  requirements={"userID": "\d+"}, methods={"GET"})
     */
    public function getCredentialsAction(User $user)
    {
        return $this->getApiResponse($user->getDTOWithConfig());
    }

    /**
     * @Route("api/user/{userID}/credentials", requirements={"userID": "\d+"}, name="user_new_credentials", methods={"POST"})
     * @ParamConverter("user", class="App\Entity\User\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function newCredentialsAction(
        User $user,
        Request $request,
        VitoopSecurity $vitoopSecurity,
        ValidatorInterface $validator,
        PasswordEncoderInterface $passwordEncoder
    ) {
        if (!$vitoopSecurity->isEqualToCurrentUser($user)) {
            throw new AccessDeniedHttpException;
        }
        $response = ['success' => true, 'message' => ""];
        $dto = $this->getDTOFromRequest($request, CredentialsDTO::class);

        $errors = $validator->validate($dto);
        if (count($errors) > 0) {
            $response['success'] = false;
            $response['message'] = "";
            foreach ($errors as $error){
                $response['message'] .= $error->getMessage().". ";
            }

            return new JsonResponse($response);
        }

        $user->updateCredentials($dto, $passwordEncoder);
        $this->userRepository->save();

        return new JsonResponse([
            'success' => true,
            'message' => 'Settings successfully changed!',
            'user' => $user->getDTOWithConfig()
        ]);
    }

    /**
     * @Route("api/user/me", name="user_profile_patch", methods={"PATCH"})
     */
    public function patchUserProfileAction(Request $request, UserConfigManager $userConfigManager)
    {
        $user = $this->getUser();
        $dto = $this->getDTOFromRequest($request);

        if (isset($dto->is_show_help)) {
            $user->setIsShowHelp((bool)$dto->is_show_help);
        }
        if (isset($dto->is_check_max_link)) {
            $userConfigManager->setIsCheckMaxLinkForOpen((bool)$dto->is_check_max_link);
        }
        $this->userRepository->save();

        return $this->getApiResponse($user->getDTO());
    }

     /**
     * @Route("api/user/me", name="user_profile_get", methods={"GET"})
     */
    public function getUserProfileAction(Request $request)
    {
        return $this->getApiResponse($this->getUser()->getDTOWithConfig());
    }
}
