<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LinkType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->remove('country')
            ->add('url', UrlType::class, array('label' => 'URL:'))
            ->add('is_hp', CheckboxType::class, array('label' => 'ist Homepage?'));
    }

    public function getParent(): string
    {
        return ResourceType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'link';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'validation_groups' => [
                'Default',
                'link'
            ]
        ]);
    }
}
