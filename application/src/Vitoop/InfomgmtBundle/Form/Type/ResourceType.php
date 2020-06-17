<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Doctrine\ORM\EntityRepository;
use Vitoop\InfomgmtBundle\DTO\Resource\ResourceDTO;

class ResourceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, array('label' => 'Name:'))
            ->add('country', EntityType::class, array(
                'label' => 'Land:',
                'class' => 'VitoopInfomgmtBundle:Country',
                'choice_label' => 'name',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('c')
                        ->orderBy('c.sortOrder', 'ASC');
                    },
                )
            )
            ->add('lang', EntityType::class, array(
                'label' => 'Sprache:',
                'class' => 'VitoopInfomgmtBundle:Language',
                'choice_label' => 'name',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('l')
                        ->orderBy('l.sortOrder', 'ASC');
                    },
                )
            )
            ->add('isUserHook', CheckboxType::class, ['label' => 'blau', 'attr' => ['class' => 'valid-checkbox', 'title' => 'label.tab']])
            ->add('isUserRead', HiddenType::class, ['attr' => ['class' => 'userRead']])
            ->add('save', InputTypeSubmitType::class, ['label' => 'speichern']);
    }

    public function getBlockPrefix()
    {
        return 'res';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => ResourceDTO::class,
            'is_new' => false,
        ]);
    }
}
