<?php


namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;

class ConversationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('country')
            ->remove('lang')
            ->add('description', TextareaType::class, array('label' => 'Conversation:'));
        $builder->get('description')
            ->addModelTransformer(new EmptyStringToNullTransformer());
    }

    public function getParent()
    {
        return ResourceType::class;
    }

    public function getBlockPrefix()
    {
        return 'conversation';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'validation_groups' => [
                'Default',
                'conversation'
            ]
        ]);
    }
}