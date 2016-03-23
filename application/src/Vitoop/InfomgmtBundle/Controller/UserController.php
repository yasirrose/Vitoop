<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\Form\FormError;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Entity\UserAgreement;
use Vitoop\InfomgmtBundle\Form\Type\UserType;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use JMS\Serializer\DeserializationContext;
use Symfony\Component\Security\Core\SecurityContext;
use Symfony\Component\Form\Exception;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class UserController extends Controller
{
    /**
     * @Route("api/user/{userID}", name="user_delete")
     * @Method({"DELETE"})
     * @ParamConverter("user", class="Vitoop\InfomgmtBundle\Entity\User", options={"id" = "userID"})
     *
     * @return array
     */
    public function deleteUserAction(User $user)
    {
        if (!$this->get('vitoop.vitoop_security')->isEqualToCurrentUser($user)) {
            throw new AccessDeniedHttpException;
        }
        $user->deactivate();
        $this->getDoctrine()->getManager()->flush();

        $this->get('security.context')->setToken(null);
        $serializer = $this->get('jms_serializer');
        $response = $serializer->serialize(array('success' => true, 'url' => $this->generateUrl('_base_url')), 'json');

        return new Response($response);
    }

    /**
     * @Route("api/project/{projectID}/user/find", name="user_names")
     * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
     */
    public function getUserNamesAction(Project $project)
    {
        $letter = $this->getRequest()->query->get('s');
        $user = $this->get('security.context')
            ->getToken()
            ->getUser();
        $names = $this->getDoctrine()->getRepository('VitoopInfomgmtBundle:User')->getNames($letter, $user->getId(), $project->getUser());
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
    public function getUserAgreement(Request $request)
    {
        if ($request->getMethod() === 'POST') {
            $em = $this->getDoctrine()->getManager();
            $user = $this->get('vitoop.vitoop_security')->getUser();
            $user->setIsAgreedWithTerms((bool) $request->get('user_agreed'));
            if ($request->get('user_agreed')) {
                $history = new UserAgreement($user, $request->getClientIp());
                $em->persist($history);
            }
            $em->flush();

            return $this->redirect($this->generateUrl('_resource_list', array('res_type'=>'link')));
        }
        $terms = $this->get('vitoop.settings')->getTerms()->getValue();

        return array('terms' => $terms, 'without_js' => true);
    }

    /**
     * @Route("user/datap", name="user_datap")
     * @Method({"GET"})
     * @Template("VitoopInfomgmtBundle:User:datap.html.twig")
     */
    public function dataPAction()
    {
        return array(
            'datap' => $this->get('vitoop.settings')->getDataP()->getValue(),
            'without_js' => true
        );
    }

    /**
     * @Route("/register/{secret}", name="_register")
     * @Template()
     */
    public function registerAction($secret)
    {
        $invitation = $this->getDoctrine()
            ->getManager()
            ->getRepository('VitoopInfomgmtBundle:Invitation')
            ->findOneBy(array('secret' => $secret));

        if (null === $invitation) {
            throw new AccessDeniedException();
        }

        $now = new \DateTime();
        if ($now > $invitation->getUntil()) {
            return array(
                'fv' => null
            );
        }

        $request = $this->getRequest();

        $user = new User();
        $user->setIsAgreedWithTerms(true);
        $user->setEmail(($invitation->getEmail()));
        $form = $this->createForm(new UserType(), $user, array(
            'action' => $this->generateUrl('_register', array('secret' => $secret)),
            'method' => 'POST'
        ));

        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);

            if ($form->isValid()) {
                try {
                    $factory = $this->get('security.encoder_factory');
                    $encoder = $factory->getEncoder($user);
                    $password = $encoder->encodePassword($user->getPassword(), $user->getSalt());
                    $user->setPassword($password);
                    $em = $this->getDoctrine()
                               ->getManager();
                    $em->persist($user);
                    $em->remove($invitation);
                    $em->flush();
                    $this->authenticateUser($user);

                    return $this->redirect($this->generateUrl('_home'));
                } catch (\Exception $e) {
                    $users = $this->getDoctrine()
                                  ->getRepository('VitoopInfomgmtBundle:User')
                                  ->usernameExistsOrEmailExists($user->getUsername(), $user->getEmail());
                    foreach ($users as $_user) {
                        if ($_user->getUsername() === $user->getUsername()) {
                            $form_error = new FormError(sprintf('Der Username %s existiert schon. Bitte wähle einen anderen.', $user->getUsername()));
                            $form->get('username')
                                 ->addError($form_error);
                        }
                        if ($_user->getEmail() === $user->getEmail()) {
                            $form_error = new FormError(sprintf('Die eMail %s wird schon verwendet. Bist Du schon angemeldet?', $user->getEmail()));
                            $form->get('email')
                                 ->addError($form_error);
                        }
                   }
                }
            }
        }

        $fv = $form->createView();

        return array(
            'fv' => $fv
        );
    }

    /**
     * @Route("/invite", name="_invite")
     * @Template()
     */
    public function inviteAction()
    {
        $link = '';
        $info = '';
        $mail = <<<'EOT'
Hallo!

Hiermit bist Du herzlich zum neuen Informationsportal VitooP eingeladen.

Du kannst Dich registrieren unter: {LINK}
(Beachte bitte, dass dieser Link bis zum {UNTIL} gültig ist.)

LG

David Rogalski
EOT;

        $invitation = new Invitation();
        $invitation->setSubject('Einladung zum Informationsportal VitooP');
        $invitation->setMail($mail);
        $form = $this->createForm('invitation', $invitation, array(
            'action' => $this->generateUrl('_invite'),
            'method' => 'POST'
        ));

        $request = $this->getRequest();
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
                    $user = $this->get('security.context')
                                 ->getToken()
                                 ->getUser();
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

                    $message = \Swift_Message::newInstance()
                                ->setSubject($invitation->getSubject())
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

        //return $this->renderView()
        return array('fv' => $fv, 'link' => $link, 'info' => $info);
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
    public function loginAction()
    {
        $request = $this->getRequest();
        $session = $request->getSession();

        // get the login error if there is one
        if ($request->attributes->has(SecurityContext::AUTHENTICATION_ERROR)) {
            $error = $request->attributes->get(SecurityContext::AUTHENTICATION_ERROR);
        } else {
            $error = $session->get(SecurityContext::AUTHENTICATION_ERROR);
            $session->remove(SecurityContext::AUTHENTICATION_ERROR);
        }
        // $container->getParameter('security.role_hierarchy.roles')
        $all_roles = $this->container->getParameter('security.role_hierarchy.roles');

        $tpl_vars = array( // last username entered by the user
                           'last_username' => $session->get(SecurityContext::LAST_USERNAME),
                           'error' => $error
        );

        $content_tpl = 'VitoopInfomgmtBundle:User:login.html.twig';

        if ($this->getRequest()
                 ->isXmlHttpRequest()
        ) {
            $tpl = $content_tpl;
        } else {
            $tpl = 'VitoopInfomgmtBundle:Resource:home.html.twig';
            $tpl_vars = array_merge($tpl_vars, array('homecontenttpl' => $content_tpl));
        }

        return $this->render($tpl, $tpl_vars);
    }

    /**
     * @Route("/impressum", name="_imprint")
     * @Template()
     */
    public function imprintAction()
    {
        return array();
    }

    private function authenticateUser(UserInterface $user)
    {
        $providerKey = 'secured_infomgmt'; // your firewall name
        $token = new UsernamePasswordToken($user, null, $providerKey, $user->getRoles());

        $this->container->get('security.context')
                        ->setToken($token);
    }
    
    /**
     * @Route("/password/forgotPassword", name="forgot_password")
     * @Template()
     */
    public function forgotPasswordAction()
    {
        $request = $this->getRequest();
        
        if ($request->getMethod() == 'POST') {
            
            $user = $this->getDoctrine()
            ->getRepository('VitoopInfomgmtBundle:User')
            ->findOneByEmail($request->get('email'));
            if($user)
            {
                $token = base64_encode($user->getId());
               // $mail = "<a href='/password/new/$token'>Change Password </a>"; 
                
                $message = \Swift_Message::newInstance()
                ->setSubject('Forgot Password')
                ->setContentType("text/html")
                ->setFrom(array('einladung@vitoop.org' => 'David Rogalski'))
                ->setTo($user->getEmail())
                ->setBody($this->renderView(
                        'VitoopInfomgmtBundle:User:email.html.twig',
                        array('token' => $token, 'usernname' => $user->getusername())
                    ));
                
               $mail = $this->get('mailer')
                         ->send($message);
               
                $this->get('session')->getFlashBag()->add(
                    'sucess',
                    'your message was sent successfully.'
                );
            }
            else
            {
                $this->get('session')->getFlashBag()->add(
                    'notice',
                    'your email address is not valid'
                ); 
            }
        }
        return $this->render('VitoopInfomgmtBundle:User:forgotPassword.html.twig');
    }
    
  /**
     * @Route("/password/new/{token}", name="password_new")
     * @Template()
     */
    public function passwordnewAction()
    {
        $request = $this->getRequest();
        
        if ($request->getMethod() == 'POST') {
            
            $token = urldecode($request->get('token'));
            $id = base64_decode($token);
            
            $user = $this->getDoctrine()
            ->getRepository('VitoopInfomgmtBundle:User')
            ->find($id);

            $factory = $this->get('security.encoder_factory');
            $encoder = $factory->getEncoder($user);
            $password = $encoder->encodePassword($request->get('password'), $user->getSalt());
            $user->setPassword($password);
            $em = $this->getDoctrine()
                       ->getManager();
            $em->persist($user);
            $em->flush();
            
            $this->get('session')->getFlashBag()->add(
                    'sucess',
                    'your password was changed'
                );
        }
        return $this->render('VitoopInfomgmtBundle:User:changePassword.html.twig',array('token' => $request->get('token')));
        
    }


    /**
     * @Method("GET")
     * @Route("user/settings", name="user_settings")
     * @Template("@VitoopInfomgmt/User/credentials.html.twig")
     */
    public function userDataAction() {
        $user = $this->get('vitoop.vitoop_security')->getUser();

        return array('user' => $user);
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
        $response = array('success' => true, 'message' => "");
        $serializer = $this->get('jms_serializer');
        $em = $this->getDoctrine()->getManager();
        $serializerContext = DeserializationContext::create()
            ->setGroups(array('edit'));
        $credentials = $serializer->deserialize(
            $request->getContent(),
            'Vitoop\InfomgmtBundle\Entity\User',
            'json',
            $serializerContext
        );
        $validator = $this->get('validator');
        $errors = $validator->validate($credentials->getUserConfig());

        if (count($errors) > 0) {
            $response['success'] = false;
            $response['message'] = "";
            foreach ($errors as $error){
                $response['message'] .= $error->getMessage().". ";
            }
        } else {
            $user->getUserConfig()->setHeightOfTodoList($credentials->getUserConfig()->getHeightOfTodoList());
            $user->getUserConfig()->setNumberOfTodoElements($credentials->getUserConfig()->getNumberOfTodoElements());
        }
        if ($credentials->getEmail() != "" && $response['success']) {
            if (is_null($em->getRepository('VitoopInfomgmtBundle:User')->findOneBy(array('email' => $credentials->getEmail())))) {
                $user->setEmail($credentials->getEmail());
                $response = array('success' => true, 'message' => "Email successfully changed!");
            } else {
                $response = array('success' => false, 'message' => "This email is already used!");
            }
        }
        if ($credentials->getPassword() != "" && $response['success']) {
            $factory = $this->get('security.encoder_factory');
            $encoder = $factory->getEncoder($user);
            $password = $encoder->encodePassword($credentials->getPassword(), $user->getSalt());
            $user->setPassword($password);
        }
        if ($response['success']) {
            $em->merge($user);
            $em->flush();
            $response['message'] = "Settings successfully changed!";
        }

        return new Response($serializer->serialize($response, 'json'));
    }
}
