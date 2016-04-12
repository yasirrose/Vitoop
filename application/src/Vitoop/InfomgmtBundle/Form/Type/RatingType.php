<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RatingType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('mark', ChoiceType::class, array(
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
            'placeholder' => 'Bewerte von -5 bis +5'
        ))
                ->add('save_slider', InputTypeSubmitType::class, array('label' => 'bewerten', 'attr' => array('name' => 'slider')))
                ->add('save_dropdown', InputTypeSubmitType::class, array('label' => 'bewerten', 'attr' => array('name' => 'dropdown')));
    }

    public function getBlockPrefix()
    {
        return 'rating';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Rating'));
    }
}