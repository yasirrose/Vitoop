<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Entity\UserAgreement;
use Vitoop\InfomgmtBundle\Form\Type\UserType;
use Vitoop\InfomgmtBundle\Form\Type\InvitationType;
use Vitoop\InfomgmtBundle\DTO\User\NewUserDTO;
use Vitoop\InfomgmtBundle\DTO\User\CredentialsDTO;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Vitoop\InfomgmtBundle\Service\SettingsService;
use Vitoop\InfomgmtBundle\Service\VitoopSecurity;

class UserController extends ApiController
{
    /**
     * @Route("api/user/{userID}", name="user_delete")
     * @Method({"DELETE"})
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function deleteUserAction(VitoopSecurity $vitoopSecurity, TokenStorageInterface $tokenStorage, User $user)
    {
        if (!$vitoopSecurity->isEqualToCurrentUser($user)) {
            throw new AccessDeniedHttpException;
        }
        $user->deactivate();
        $this->getDoctrine()->getManager()->flush();

        $tokenStorage->setToken(null);

        return $this->getApiResponse([
            'success' => true,
            'url' => $this->generateUrl('_base_url')
        ]);
    }

    /**
     * @Route("api/project/{projectID}/user/find", name="user_names")
     * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
     */
    public function getUserNamesAction(Project $project, Request $request)
    {
        $letter = $request->query->get('s');
        $user = $this->getUser();
        $names = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:User')
            ->getNames($letter, $user->getId(), $project->getUser());
        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize($names, 'json');

        return new Response($response);
    }

    /**
     * @Route("user/agreement", name="user_agreement")
     * @Method({"POST", "GET"})
     * @Template("VitoopInfomgmtBundle:User:agreement.html.twig")
     *
     * @return array
     */
    public function getUserAgreement(VitoopSecurity $vitoopSecurity, SettingsService $settings, Request $request)
    {
        $user = $vitoopSecurity->getUser();
        if ($user && ($request->getMethod() === 'POST')) {
            $em = $this->getDoctrine()->getManager();
            $user->setIsAgreedWithTerms((bool) $request->get('user_agreed'));
            if ($request->get('user_agreed')) {
                $history = new UserAgreement($user, $request->getClientIp());
                $em->persist($history);
            }
            $em->flush();

            return $this->redirect($this->generateUrl('_resource_list', array('res_type'=>'link')));
        }
        $terms = $settings->getTerms()->getValue();

        return array('terms' => $terms, 'without_js' => true);
    }

    /**
     * @Route("user/datap", name="user_datap")
     * @Method({"GET"})
     * @Template("VitoopInfomgmtBundle:User:datap.html.twig")
     */
    public function dataPAction(SettingsService $settings)
    {
        return array(
            'datap' => $settings->getDataP()->getValue(),
            'without_js' => true
        );
    }

    /**
     * @Route("/register/{secret}", name="_register")
     * @Template()
     */
    public function registerAction(Request $request, $secret)
    {
        $invitation = $this->getDoctrine()
            ->getManager()
            ->getRepository('VitoopInfomgmtBundle:Invitation')
            ->findOneBy(array('secret' => $secret));

        if (null === $invitation) {
            throw new AccessDeniedException();
        }

        if (!$invitation->isActual()){
            return array(
                'fv' => null
            );
        }

        $form = $this->createForm(UserType::class, new NewUserDTO($invitation->getEmail()), array(
            'action' => $this->generateUrl('_register', array('secret' => $secret)),
            'method' => 'POST'
        ));

        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if ($form->isValid()) {
                $user = User::create($form->getData(), $this->get('vitoop.password_encoder.user'));
                $this->get('vitoop.repository.user')->add($user);
                $this->get('vitoop.repository.invitation')->remove($invitation);
                $this->get('doctrine.orm.entity_manager')->flush();

                $this->get('vitoop.email_sender')->sendRegisterNotification($user);

                $this->authenticateUser($user);

                return $this->redirect($this->generateUrl('_resource_list', ['res_type' => 'link']));
            }
        }

        return array(
            'fv' => $form->createView()
        );
    }

    /**
     * @Route("/invite", name="_invite")
     * @Template()
     */
    public function inviteAction(Request $request)
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
            if ($form->isValid()) {
                $em = $this->getDoctrine()
                           ->getManager();
                $existing_invitation = $this->getDoctrine()
                                            ->getManager()
                                            ->getRepository('VitoopInfomgmtBundle:Invitation')
                                            ->findOneBy(array('email' => $invitation->getEmail()));
                if (null === $existing_invitation) {
                    $user = $this->getUser();
                    $invitation->setUser($user);

                    $days = $form->get('days')
                                 ->getData();
                    $until = new \DateTime();
                    $until = $until->add(new \DateInterval('P' . $days . 'D'));
                    $invitation->setUntil($until);

                    $em->persist($invitation);
                    $em->flush();

                    $mail = $invitation->getMail();
                    $link = $this->generateUrl('_register', array('secret' => $invitation->getSecret()), UrlGeneratorInterface::ABSOLUTE_URL);
                    $mail = str_replace('{LINK}', $link, $mail);
                    $mail = str_replace('{UNTIL}', sprintf('%s um %s Uhr', $until->format('d.m.Y'), $until->format('H:i:s')), $mail);

                    $message = (new \Swift_Message($invitation->getSubject()))
                                ->setFrom(array('einladung@vitoop.org' => 'David Rogalski'))
                                ->setTo($invitation->getEmail())
                                ->setBody($mail);
                    $this->get('mailer')
                         ->send($message);
                    $info = 'Einladung erfolgreich versendet!';
                } else {
                    $until = new \DateTime();
                    $until = $until->add(new \DateInterval('P3D'));
                    $existing_invitation->setUntil($until);
                    $em->flush();
                    $info = 'An diese eMail Adresse wurde bereits eine Einladung versendet. Die Gültigkeit wurde von jetzt an auf 3 Tage neu gesetzt';
                }
            }
        }
        $fv = $form->createView();

        return $this->render('@VitoopInfomgmt/User/invite.html.twig', ['fv' => $fv, 'link' => $link, 'info' => $info]);
    }

    /**
     * @Route("/bye", name="_bye")
     * @Template()
     */
    public function byeAction()
    {
        return array();
    }

    /**
     * @Route("/login", name="_login")
     * @Template()
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

        $content_tpl = 'VitoopInfomgmtBundle:User:login.html.twig';

        if ($request->isXmlHttpRequest()) {
            $tpl = $content_tpl;
        } else {
            $tpl = 'VitoopInfomgmtBundle:Resource:home.html.twig';
            $tpl_vars = array_merge($tpl_vars, array('homecontenttpl' => $content_tpl));
        }

        return $this->render($tpl, $tpl_vars);
    }

    /**
     * @Route("/impressum", name="_imprint")
     * @Template("VitoopInfomgmtBundle:User:imprint.html.twig")
     */
    public function imprintAction()
    {
        return array();
    }

    private function authenticateUser(UserInterface $user)
    {
        $providerKey = 'secured_infomgmt'; // your firewall name
        $token = new UsernamePasswordToken($user, null, $providerKey, $user->getRoles());
        $this->get('security.token_storage')->setToken($token);
    }
    
    /**
     * @Route("/password/forgotPassword", name="forgot_password")
     * @Template()
     */
    public function forgotPasswordAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            $user = $this->getDoctrine()
                ->getRepository('VitoopInfomgmtBundle:User')
                ->findOneByEmail($request->get('email'));
            if($user) {
                $user->generateForgotPasswordToken($this->get('vitoop.generator.common_token'));
                $this->get('doctrine.orm.entity_manager')->flush();

                $this->get('vitoop.email_sender')->sendUserForgotPassword($user);
            }
   
            $this->get('session')->getFlashBag()->add(
                    'sucess',
                    'When you are registered with the address you inserted in the field, you got am mail with link so you can change your password'
                );
        }
        return $this->render('VitoopInfomgmtBundle:User:forgotPassword.html.twig');
    }
    
  /**
     * @Route("/password/new/{token}", name="password_new")
     * @Template()
     */
    public function passwordnewAction(Request $request)
    {
        $user = $this->getDoctrine()
            ->getRepository('VitoopInfomgmtBundle:User')
            ->findByResetToken($request->get('token'));
        if (!$user) {
            throw $this->createNotFoundException();
        }
        
        if ($request->getMethod() == 'POST') {
            $user->changePassword(
                $request->get('password'),
                $this->get('vitoop.password_encoder.user')
            ); 
            $this->get('doctrine.orm.entity_manager')->flush();

            $this->get('session')->getFlashBag()->add(
                'success',
                'your password was changed'
            );
            
            return $this->redirect($this->generateUrl('_home'));
        }

        return $this->render('VitoopInfomgmtBundle:User:changePassword.html.twig',array('token' => $request->get('token')));
    }

    /**
     * @Method("GET")
     * @Route("user/settings", name="user_settings")
     * @Template("@VitoopInfomgmt/User/credentials.html.twig")
     */
    public function userDataAction()
    {
        $user = $this->get('vitoop.vitoop_security')->getUser();

        return array('user' => $user);
    }

    /**
     * @Route("api/user/{id}/credentials",  requirements={"userID": "\d+"})
     * @Method({"GET"})
     */
    public function getCredentialsAction(User $user)
    {
        return $this->getApiResponse($user->getDTOWithConfig());
    }

    /**
     * @Route("api/user/{userID}/credentials", requirements={"userID": "\d+"}, name="user_new_credentials")
     * @Method({"POST"})
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function newCredentialsAction(User $user, Request $request)
    {
        if (!$this->get('vitoop.vitoop_security')->isEqualToCurrentUser($user)) {
            throw new AccessDeniedHttpException;
        }
        $response = ['success' => true, 'message' => ""];
        $dto = $this->getDTOFromRequest($request, CredentialsDTO::class);

        $errors = $this->get('validator')->validate($dto);
        if (count($errors) > 0) {
            $response['success'] = false;
            $response['message'] = "";
            foreach ($errors as $error){
                $response['message'] .= $error->getMessage().". ";
            }

            return new JsonResponse($response);
        }

        $user->updateCredentials($dto, $this->get('vitoop.password_encoder.user'));
        $this->get('doctrine.orm.entity_manager')->flush();

        return new JsonResponse([
            'success' => true,
            'message' => 'Settings successfully changed!',
            'user' => $user->getDTOWithConfig()
        ]);
    }

    /**
     * @Route("api/user/me", name="user_profile_patch")
     * @Method({"PATCH"})
     */
    public function patchUserProfileAction(Request $request)
    {
        $user = $this->getUser();
        $dto = $this->getDTOFromRequest($request);

        if (isset($dto->is_show_help)) {
            $user->setIsShowHelp((bool)$dto->is_show_help);
        }
        if (isset($dto->is_check_max_link)) {
            $this->get('vitoop.user_config_manager')->setIsCheckMaxLinkForOpen((bool)$dto->is_check_max_link);
        }
        $this->getDoctrine()->getManager()->flush();

        return $this->getApiResponse($user->getDTO());
    }

     /**
     * @Route("api/user/me", name="user_profile_get")
     * @Method({"GET"})
     */
    public function getUserProfileAction(Request $request)
    {
        return $this->getApiResponse($this->getUser()->getDTOWithConfig());
    }
}
