<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ProjectNameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', ChoiceType::class, array(
                'label' => 'Projekt',
                'choices' => $options['projects'],
                'placeholder' => 'Wähle ein Projekt...'
                ))
            ->add('save', InputTypeSubmitType::class, array('label' => 'mit meinem Projekt verknüpfen'));
    }

    public function getBlockPrefix()
    {
        return 'project_name';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults(array(
            'data_class' => 'App\Entity\Project',
            'projects' => array()
        ));
    }
}