<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class RatingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('mark', 'choice', array(
            'label' => 'Deine Bewertung:',
            'choices' => array(
                '-5' => '-5',
                '-4' => '-4',
                '-3' => '-3',
                '-2' => '-2',
                '-1' => '-1',
                '0' => '±0',
                '1' => '+1',
                '2' => '+2',
                '3' => '+3',
                '4' => '+4',
                '5' => '+5'
            ),
            'empty_value' => 'Bewerte von -5 bis +5'
        ))
                ->add('save_slider', 'input_type_submit', array('label' => 'bewerten', 'attr' => array('name' => 'slider')))
                ->add('save_dropdown', 'input_type_submit', array('label' => 'bewerten', 'attr' => array('name' => 'dropdown')));
    }

    public function getName()
    {
        return 'rating';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Rating'));
    }
}