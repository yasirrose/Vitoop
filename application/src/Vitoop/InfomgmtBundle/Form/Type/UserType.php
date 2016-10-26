<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Vitoop\InfomgmtBundle\DTO\User\NewUserDTO;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('username', TextType::class, array('label' => 'Username:'))
                ->add('email', TextType::class, array('label' => 'eMail:'))
                ->add('password', RepeatedType::class, array(
                    'type' => PasswordType::class,
                    'invalid_message' => 'Die eingegebenen Passworte stimmen nicht überein.',
                    'required' => true,
                    'first_options' => array('label' => 'Passwort:'),
                    'second_options' => array('label' => 'Passwort wiederholen:'),
                ))
                ->add('save', InputTypeSubmitType::class, array('label' => 'registrieren'));;
    }

    public function getBlockPrefix()
    {
        return 'user';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => NewUserDTO::class));
    }
}
