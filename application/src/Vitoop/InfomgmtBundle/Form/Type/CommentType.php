<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class CommentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text', 'textarea', array('max_length' => 512, 'label' => 'Dein Kommentar:'))
                ->add('save', 'input_type_submit', array('label' => 'Kommentar absenden'));
    }

    public function getName()
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