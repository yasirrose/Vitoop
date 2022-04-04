<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class LangType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('lang', ChoiceType::class, array(
            'choices' => array(
                'ml' => 'Multi-Language',
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

    public function getBlockPrefix()
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