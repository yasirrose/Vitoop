<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class LexiconType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('wikifullurl', null, array(
            'label' => 'Wiki-URL'
        ));
    }

    public function getParent(): string
    {
        return ResourceType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'lex';
    }
}