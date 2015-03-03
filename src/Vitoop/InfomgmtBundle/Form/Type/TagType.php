<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class TagType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text', null, array('label' => 'Tag:'))
                ->add('can_add', 'hidden', array('mapped' => false))
                ->add('can_remove', 'hidden', array('mapped' => false))
                ->add('showown', 'checkbox', array('label' => 'Zeige eigene Tags', 'mapped' => false))
                ->add('save', 'input_type_submit', array('label' => 'Ja'))
                ->add('remove', 'input_type_submit', array('label' => '-'));
    }

    public function getName()
    {
        return 'tag';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Tag', 'resource_id' => null));
    }
}