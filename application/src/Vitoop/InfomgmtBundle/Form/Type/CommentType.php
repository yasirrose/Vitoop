<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text', TextareaType::class, array('attr' => ['max-size' => 512], 'label' => 'Dein Kommentar:'))
                ->add('save', InputTypeSubmitType::class, array('label' => 'Kommentar absenden'));
    }

    public function getBlockPrefix()
    {
        return 'comment';
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Vitoop\InfomgmtBundle\Entity\Comment'
        );
    }
}