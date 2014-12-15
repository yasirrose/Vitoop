<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class ResourceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', null, array('label' => 'Name:'))
                ->add('country', 'choice', array(
                    'choices' => array(
                        'DE' => 'Deutschland',
                        'DK' => 'Dänemark',
                        'NL' => 'Niederlande',
                        'XX' => 'anderes Land'
                    ),
                    'label' => 'Land.'
                ))
                ->add('lang', 'choice', array(
                    'choices' => array(
                        'de' => 'deutsch',
                        'en' => 'englisch',
                        'fr' => 'französisch',
                        'es' => 'spanisch',
                        'po' => 'portugiesisch',
                        'nl' => 'niederländisch',
                        'xx' => 'andere Sprache'
                    ),
                    'label' => 'Sprache:'
                ))
                ->add('save', 'input_type_submit', array('label' => 'speichern'));
    }

    public function getName()
    {
        return 'res';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Resource'));
    }
}
/*
               ->add('created_at', 'date', array(
                    'widget' => 'single_text',
                    'format' => 'dd.MM.yyyy',
                    'disabled' => true,
                    'label' => 'Eingetragen am:'
                ))
                ->add('updated_at', 'date', array(
                    'widget' => 'single_text',
                    'format' => 'dd.MM.yyyy',
                    'disabled' => true,
                    'label' => 'geändert am:'
                ))
*/