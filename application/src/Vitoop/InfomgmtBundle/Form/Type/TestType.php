<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Vitoop\InfomgmtBundle\Form\EventListener\TestSubscriber;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TestType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('id', null, array('label' => 'ID:'))
                ->add('testvar1', null, array('label' => 'FIELD_1:'))
                ->add('testvar2', 'number', array('label' => 'FIELD_2:'))
                ->add('abschicken', InputTypeSubmitType::class, array('label' => 'SAVE'));
        // ->add('tags', 'collection', array ('type' => new TestTagType(), 'allow_add' => true));

        // $builder->addEventSubscriber(new TestSubscriber());
    }

    public function getBlockPrefix()
    {

        return 'test';
    }

    public function configureOptions(OptionsResolver $resolver)
    {

        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Test', 'lkw_secured' => true));
        $resolver->setDefaults(array(
            'lkw_lockview' => array(
                'id' => 'readonly',
                'testvar1' => 'readonly',
                'testvar2' => 'readonly',
                'abschicken' => 'disabled'
            )
        ));
    }
}