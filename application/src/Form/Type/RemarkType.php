<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RemarkType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('text', TextareaType::class, array('label' => 'Bemerkung'))
            ->add('locked', CheckboxType::class, array('label' => 'Für weitere Bearbeitung schließen'))
            ->add('save', InputTypeSubmitType::class, array('label' => 'speichern'));
    }

    public function getBlockPrefix(): string
    {
        return 'remark';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'App\Entity\Remark'));
    }
}