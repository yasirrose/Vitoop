<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class UserDataType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('sheet', 'textarea', array())
                ->add('save', 'input_type_submit', array('label' => 'speichern'));
    }

    public function getName()
    {
        return 'user_data';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\UserData'));
    }
}