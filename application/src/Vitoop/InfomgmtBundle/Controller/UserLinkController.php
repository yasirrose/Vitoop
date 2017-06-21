<?php

namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Vitoop\InfomgmtBundle\Form\Type\SendLinksType;

class UserLinkController extends Controller
{
    /**
     * @Route("/user-links")
     * @Template("VitoopInfomgmtBundle:User:sendLinks.html.twig")
     */
    public function userLinksAction(Request $request)
    {
        $form = $this->createForm(SendLinksType::class);

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $dto = $form->getData();
            $resourceData = $this->get('vitoop.repository.resource')
                ->findSendLinkViewsByResourceIds($dto->getResourceIds());

            $this->get('vitoop.email_sender')->sendLinks($dto, $resourceData, $this->getUser());

            $this->get('session')->getFlashBag()->add(
                'success',
                'The mail was sent successfully'
            );
        }

        return [
            'linksForm' => $form->createView()
        ];
    }
}
