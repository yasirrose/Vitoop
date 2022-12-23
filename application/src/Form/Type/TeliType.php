<?php
namespace App\Form\Type;

use App\Form\DataTransformer\EmptyStringToNullTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TeliType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('name')
                ->remove('country')
                ->add('name', null, array('label' => 'Titel:'))
                ->add('author', null, array('label' => 'AutorInnen:'))
                ->add('url', UrlType::class, array('label' => 'URL:'))
                ->add('releaseDate', null, array('label' => 'Erschienen:'));
        $builder->get('author')
                ->addModelTransformer(new EmptyStringToNullTransformer());
    }

    public function getParent(): string
    {
        return ResourceType::class;
    }

    public function getBlockPrefix(): string
    {
        return 'teli';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'validation_groups' => [
                'Default',
                'teli'
            ]
        ]);
    }
}