<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;
use Vitoop\InfomgmtBundle\Form\DataTransformer\PublishedToDateStringTransformer;

class BookType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('name')
                ->remove('country')
                ->add('name', null, array('label' => 'Titel:'))
                ->add('author', null, array('label' => 'Autor:'))
                ->add('publisher', null, array('label' => 'Verlag:'))
                ->add('issuer', null, array('label' => 'Hrsg.:', 'required' => false))
                ->add('isbn13', null, array('label' => 'ISBN-13:'))
                ->add('isbn10', null, array('label' => 'ISBN-10:'))
                ->add('tnop', TextType::class, array('label' => 'Seiten:'))
                ->add('kind', ChoiceType::class, [
                    'choices' => [
                        'XX' => 'auswählen',
                        'Sachbuch' => 'Sachbuch',
                        'Roman' => 'Roman'
                    ],
                    'label' => 'Art'
                ])
                ->add('year', null, array('label' => 'Jahr:'));
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
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Book'));
    }
}