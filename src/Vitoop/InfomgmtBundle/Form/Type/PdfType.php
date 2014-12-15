<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;
use Vitoop\InfomgmtBundle\Form\DataTransformer\PublishedToDateStringTransformer;

class PdfType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('name')
                ->remove('country')
                ->add('name', null, array('label' => 'Titel:'))
                ->add('author', null, array('label' => 'Autor:'))
                ->add('publisher', null, array('label' => 'Hrsg.:'))
                ->add('url', null, array('label' => 'URL:'))
                ->add('tnop', null, array('label' => 'Seiten:'))
                ->add('pdf_date', 'text', array('label' => 'Erschienen:'));
        $builder->get('publisher')
                ->addModelTransformer(new EmptyStringToNullTransformer());
        $builder->get('pdf_date')
                ->addModelTransformer(new PublishedToDateStringTransformer());
    }

    public function getParent()
    {
        return 'res';
    }

    public function getName()
    {
        return 'pdf';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Pdf'));
    }
}