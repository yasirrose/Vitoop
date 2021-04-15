<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InvitationNewType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', TextType::class, [
                    'label' => 'label.signup.free',
                    'attr' => [
                        'placeholder' => 'bitte mail-Adresse eingeben'
                    ]
                ]
            )
            ->add('save', InputTypeSubmitType::class, array('label' => 'Senden'));
    }

    public function getBlockPrefix()
    {
        return 'invitation_new';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
                'data_class' => 'App\Entity\Invitation',
                'csrf_protection' => false,
            ]
        );
    }
}