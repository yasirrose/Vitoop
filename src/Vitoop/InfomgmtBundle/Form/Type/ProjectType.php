<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('country')
                ->remove('lang')
                ->add('description', 'textarea', array('label' => 'Projekbescheibung:'));
        $builder->get('description')
                ->addModelTransformer(new EmptyStringToNullTransformer());
    }

    public function getParent()
    {
        return 'res';
    }

    public function getName()
    {
        return 'prj';
    }

    public function getDefaultOptions(array $options)
    {
        return array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Project');
    }
}