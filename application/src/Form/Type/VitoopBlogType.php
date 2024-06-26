<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * Class VitoopBlogType
 * @package App\Form\Type
 *
 * @deprecated Remove after removing _edit_vitoop_blog
 */
class VitoopBlogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('sheet', TextareaType::class, array())
                ->add('save', InputTypeSubmitType::class, array('label' => 'speichern'));
    }

    public function getBlockPrefix(): string
    {
        return 'vitoop_blog';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'App\Entity\VitoopBlog'));
    }
}