<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Form\DataTransformer\EmptyStringToNullTransformer;
use App\Form\DataTransformer\PublishedToDateStringTransformer;

class PdfType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('name')
                ->remove('country')
                ->add('name', null, array('label' => 'Titel:'))
                ->add('author', null, array('label' => 'AutorInnen:'))
                ->add('publisher', null, array('label' => 'Hrsg.:'))
                ->add('url', UrlType::class, array('label' => 'URL:'))
                ->add('tnop', TextType::class, array('label' => 'Seiten:'))
                ->add('pdfDate', TextType::class, array('label' => 'Erschienen:'));
        $builder->get('publisher')
                ->addModelTransformer(new EmptyStringToNullTransformer());
    }

    public function getParent(): string
    {
        return ResourceType::class;
    }

    public function getBlockPrefix(): string
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