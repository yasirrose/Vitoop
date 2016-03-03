<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('username', 'text', array('label' => 'Username:'))
                ->add('email', 'text', array('label' => 'eMail:'))
                ->add('password', 'repeated', array(
                    'type' => 'password',
                    'invalid_message' => 'Die eingegebenen Passworte stimmen nicht überein.',
                    'required' => true,
                    'first_options' => array('label' => 'Passwort:'),
                    'second_options' => array('label' => 'Passwort wiederholen:'),
                ))
                ->add('save', 'input_type_submit', array('label' => 'registrieren'));;
    }

    public function getName()
    {
        return 'user';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\User'));
    }
}
