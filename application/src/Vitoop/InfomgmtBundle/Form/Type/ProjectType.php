<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;

class ProjectType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('country')
                ->remove('lang')
                ->add('description', TextareaType::class, array('label' => 'Projekbescheibung:'));
        $builder->get('description')
                ->addModelTransformer(new EmptyStringToNullTransformer());
    }

    public function getParent()
    {
        return ResourceType::class;
    }

    public function getBlockPrefix()
    {
        return 'prj';
    }
}