<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TagType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('text', TextType::class, ['label' => 'Tag:'])
            ->add('can_add', HiddenType::class, ['mapped' => false])
            ->add('can_remove', HiddenType::class, ['mapped' => false])
            ->add('showown', CheckboxType::class, ['label' => 'Zeige eigene Tags', 'mapped' => false])
            ->add('save', InputTypeSubmitType::class, ['label' => 'Ja'])
            ->add('remove', InputTypeSubmitType::class, ['label' => '-']);
    }

    public function getBlockPrefix()
    {
        return 'tag';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Vitoop\InfomgmtBundle\Entity\Tag',
            'resource_id' => null
        ]);
    }
}