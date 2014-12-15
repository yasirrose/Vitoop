<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class FlagType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('info', 'textarea', array('label' => 'Bemerkung:'))
                ->add('save', 'input_type_submit', array('label' => 'absenden'));
    }

    public function getName()
    {
        return 'flag';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Flag'));
    }
}