<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
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
                ->add('issuer', null, array('label' => 'Hrsg.:'))
                ->add('isbn13', null, array('label' => 'ISBN-13:'))
                ->add('isbn10', null, array('label' => 'ISBN-10:'))
                ->add('tnop', null, array('label' => 'Seiten:'))
                ->add('kind', 'choice', array(
                    'choices' => array(
                        'Roman' => 'Roman',
                        'Sachbuch' => 'Sachbuch'
                    ),
                    'label' => 'Art'
                ))
                ->add('year', null, array('label' => 'Jahr:'));
    }

    public function getParent()
    {
        return 'res';
    }

    public function getName()
    {
        return 'book';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Book'));
    }
}