<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LexiconNameType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', null, array('label' => 'Lexikonartikel'))
            ->add('can_add', HiddenType::class, array('mapped' => false))
            ->add('can_remove', HiddenType::class, array('mapped' => false))
            ->add('save', InputTypeSubmitType::class, array('label' => '+'))
            ->add('remove', InputTypeSubmitType::class, array('label' => '-'));
    }

    public function getBlockPrefix()
    {
        return 'lexicon_name';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Lexicon'));
    }
}