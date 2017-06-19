<?php

namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Vitoop\InfomgmtBundle\Form\Type\InputTypeSubmitType;
use Vitoop\InfomgmtBundle\DTO\Links\SendLinksDTO;

class SendLinksType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => false, 
                'attr' => [
                    'placeholder' => 'Email'
                ]
            ])
            ->add('emailSubject', TextType::class, [
                'label' => false, 
                'attr' => [
                    'placeholder' => 'Subject'
                ]])
            ->add('resourceIds', HiddenType::class)
            ->add('textBody', TextareaType::class, ['label' => false])
            ->add('save', InputTypeSubmitType::class, ['label' => 'Senden']);
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SendLinksDTO::class
        ]);
    }
}
