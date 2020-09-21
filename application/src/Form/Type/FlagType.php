<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FlagType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('info', TextareaType::class, array('label' => 'Bemerkung:'))
            ->add('save', InputTypeSubmitType::class, array('label' => 'absenden'));
    }

    public function getBlockPrefix()
    {
        return 'flag';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'App\Entity\Flag'));
    }
}