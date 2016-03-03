<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ProjectNameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', 'choice', array(
            'label' => 'Projekt',
            'choices' => $options['projects'],
            'empty_value' => 'Choose a project...'
            ))
                ->add('save', 'input_type_submit', array('label' => 'mit meinem Projekt verknüpfen'));
    }

    public function getName()
    {
        return 'project_name';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Vitoop\InfomgmtBundle\Entity\Project',
            'projects' => array()
            ));
    }
}