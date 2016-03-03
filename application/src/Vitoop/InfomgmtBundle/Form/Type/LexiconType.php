<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

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

    public function getParent()
    {
        return 'res';
    }

    public function getName()
    {
        return 'lex';
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Vitoop\InfomgmtBundle\Entity\Lexicon'
        );
    }
}