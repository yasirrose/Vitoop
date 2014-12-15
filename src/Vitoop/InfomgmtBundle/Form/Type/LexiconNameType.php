<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class LexiconNameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', null, array('label' => 'Lexikonartikel'))
                ->add('save', 'input_type_submit', array('label' => 'mit Lexikonartikel verknüpfen'));;
    }

    public function getName()
    {
        return 'lexicon_name';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Lexicon'));
    }
}