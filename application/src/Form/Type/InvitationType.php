<?php
namespace App\Form\Type;

use App\Entity\Invitation;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InvitationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', TextType::class, array('label' => 'eMail:'))
            ->add('days', ChoiceType::class, array(
                'label' => 'Gültigkeit:',
                'choices' => [
                    '1 Tag' => 1,
                    '2 Tage' => 2,
                    '3 Tage' => 3,
                    '5 Tage' => 5,
                    '7 Tage' => 7,
                    '10 Tage' => 10,
                    '15 Tage' => 15,
                ],
                'constraints' => new Assert\Range(array(
                        'min' => 1,
                        'max' => 15,
                        'minMessage' => 'Die Einladung muss mindestens 1 Tag gültig sein.',
                        'maxMessage' => 'Die EInladung darf höchstens 15 Tage gültig sein.',
                    )),
                'mapped' => false
            ))
            ->add('subject', TextType::class, array('label' => 'Betreff:'))
            ->add('mail', TextareaType::class, array('label' => 'Einladungstext:'))
            ->add('save', InputTypeSubmitType::class, array('label' => 'Einladung versenden'));
    }

    public function getBlockPrefix(): string
    {
        return 'invitation';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Invitation::class,
            'csrf_protection' => false,
        ]);
    }
}