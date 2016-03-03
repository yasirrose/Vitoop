<?php

namespace Vitoop\InfomgmtBundle\Form\Extension;

use Vitoop\InfomgmtBundle\Service\VitoopSecurity;
use Symfony\Component\Form\AbstractTypeExtension;
use Symfony\Component\Form\FormView;
use Symfony\Component\Form\FormInterface;

class SecurityAwareTypeExtension extends AbstractTypeExtension
{
    protected $vsec;

    public function __construct(VitoopSecurity $vsec)
    {
        $this->vsec = $vsec;
    }

    /**
     * {@inheritDoc}
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $is_resource_form = ($form->getRoot()
                                  ->getConfig()
                                  ->getType()
                                  ->getParent()
                                  ->getName() === 'res');

        $is_user_registration_form = ($form->getRoot()
                                           ->getConfig()
                                           ->getType()
                                           ->getName() === 'user');

        $is_invitation_form = ($form->getRoot()
                ->getConfig()
                ->getType()
                ->getName() === 'invitation_new');

        $disable_form = true;

        // Admins may change the Form
        if ($this->vsec->isAdmin()) {
            $disable_form = false;
        }
        // The Owner of the Resource may change the Resource data
        if ($this->vsec->isOwner() && $is_resource_form) {
            $disable_form = false;
        }
        // Normal Users... (vsec->hasResource === false) means new resource
        if ($this->vsec->isUser() && !($is_resource_form && $this->vsec->hasResource())) {
            $disable_form = false;
        }
        // User Registration must be accessable
        if ((true === $is_user_registration_form) || (true === $is_invitation_form)) {
            $disable_form = false;
        }

        /*
         * Disable all form elements
         */
        if (true === $disable_form) {
            //Skip the CSRF token
            if (!($form->isRoot() && '_geheim' === $form->getName())) {

                $view->vars = array_replace($view->vars, array(
                    'disabled' => true,
                    'required' => false
                ));
            }
        }
    }

    /**
     * {@inheritDoc}
     */
    public function getExtendedType()
    {
        return 'form';
    }
}
