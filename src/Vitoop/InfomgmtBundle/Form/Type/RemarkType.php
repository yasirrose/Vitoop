<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class RemarkType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text', 'textarea', array('label' => 'Bemerkung'))
                ->add('locked', 'checkbox', array('label' => 'Für weitere Bearbeitung schließen'))
                ->add('save', 'input_type_submit', array('label' => 'speichern'));
    }

    public function getName()
    {
        return 'remark';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Remark'));
    }
}