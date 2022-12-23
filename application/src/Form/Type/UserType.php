<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use App\DTO\User\NewUserDTO;

class UserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('username', TextType::class, array('label' => 'label.login'))
                ->add('email', TextType::class, array('label' => 'label.email'))
                ->add('password', RepeatedType::class, array(
                    'type' => PasswordType::class,
                    'invalid_message' => 'Die Passworte stimmen nicht überein.',
                    'required' => true,
                    'first_options' => array('label' => 'label.password'),
                    'second_options' => array('label' => 'label.repeat.password'),
                ))
                ->add('save', InputTypeSubmitType::class, ['label' => 'Registrieren']);
    }

    public function getBlockPrefix(): string
    {
        return 'user';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => NewUserDTO::class,
            'csrf_protection' => false,
        ]);
    }
}
