<?php
namespace App\Form\Type;

use App\Entity\Project;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class ProjectNameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', ChoiceType::class, [
                'label' => 'Projekt',
                'choices' => $options['projects'],
                'placeholder' => 'Wähle ein Projekt...',
                'required' => true,
                'constraints' => [
                    new NotBlank(),
                    new Length(['min' => 1]),
                ],
            ])
            ->add('save', InputTypeSubmitType::class, array('label' => 'mit meinem Projekt verknüpfen'));
    }

    public function getBlockPrefix(): string
    {
        return 'project_name';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefaults(array(
            'data_class' => Project::class,
            'projects' => array()
        ));
    }
}