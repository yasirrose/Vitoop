<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Symfony\Component\Form\FormError;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Vitoop\InfomgmtBundle\Entity\Invitation;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\User;
use Vitoop\InfomgmtBundle\Form\Type\UserType;

use Symfony\Component\HttpFoundation\Response;

use Symfony\Component\Security\Core\SecurityContext;

use Symfony\Component\Form\Exception;
use Symfony\Component\Form\Form;

use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Symfony\Component\Security\Core\User\UserInterface;
use Vitoop\InfomgmtBundle\Repository\Helper;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;

class UserController extends Controller
{

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
                    //return new Response('You created: ' . $user->getUsername()); // $this->redirect($this->generateUrl('task_success'));
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
}
	