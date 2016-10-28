<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\OptionsResolver\OptionsResolver;
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
                ->add('url', UrlType::class, array('label' => 'URL:'))
                ->add('tnop', TextType::class, array('label' => 'Seiten:'))
                ->add('pdf_date', TextType::class, array('label' => 'Erschienen:'));
        $builder->get('publisher')
                ->addModelTransformer(new EmptyStringToNullTransformer());
    }

    public function getParent()
    {
        return ResourceType::class;
    }

    public function getBlockPrefix()
    {
        return 'pdf';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'validation_groups' => [
                'Default',
                'pdf'
            ]
        ]);
    }
}