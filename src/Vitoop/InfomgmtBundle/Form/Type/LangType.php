<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class LangType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {

        $builder->add('lang', 'choice', array(
            'choices' => array(
                'de' => 'deutsch',
                'en' => 'englisch',
                'fr' => 'französisch',
                'es' => 'spanisch',
                'po' => 'portugiesisch',
                'nl' => 'niederländisch',
                'xx' => 'andere Sprache'
            ),
            'label' => 'Sprache'
        ));
    }

    public function getName()
    {

        return 'lang';
    }

    public function getDefaultOptions(array $options)
    {

        return array(
            'virtual' => true
        );
    }
}