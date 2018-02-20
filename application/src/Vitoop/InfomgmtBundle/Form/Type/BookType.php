<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('name')
                ->remove('country')
                ->add('name', TextType::class, ['label' => 'Titel:'])
                ->add('author', TextType::class, ['label' => 'Autor:'])
                ->add('publisher', TextType::class, ['label' => 'Verlag:'])
                ->add('issuer', TextType::class, ['label' => 'Hrsg.:', 'required' => false])
                ->add('isbn13', TextType::class, ['label' => 'ISBN-13:'])
                ->add('isbn10', TextType::class, ['label' => 'ISBN-10:'])
                ->add('tnop', TextType::class, ['label' => 'Seiten:'])
                ->add('kind', ChoiceType::class, [
                    'choices' => [
                        'XX' => 'auswählen',
                        'Sachbuch' => 'Sachbuch',
                        'Roman' => 'Roman'
                    ],
                    'label' => 'Art'
                ])
                ->add('year', TextType::class, ['label' => 'Jahr:']);
    }

    public function getParent()
    {
        return ResourceType::class;
    }

    public function getBlockPrefix()
    {
        return 'book';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'validation_groups' => [
                'Default',
                'book'
            ]
        ]);
    }
}