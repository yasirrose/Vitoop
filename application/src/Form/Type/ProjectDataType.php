<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;

class ProjectDataType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('sheet', TextareaType::class, array())
                ->add('save', InputTypeSubmitType::class, array('label' => 'speichern'));
    }

    public function getBlockPrefix(): string
    {
        return 'project_data';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'App\Entity\ProjectData'));
    }
}