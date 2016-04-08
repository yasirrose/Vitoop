<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Doctrine\ORM\EntityRepository;

class ResourceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', null, array('label' => 'Name:'))
                ->add('country', 'entity', array(
                    'label' => 'Land.',
                    'class' => 'VitoopInfomgmtBundle:Country',
                    'property' => 'name',
                    'query_builder' => function (EntityRepository $er) {
                        return $er->createQueryBuilder('c')
                            ->orderBy('c.sortOrder', 'ASC');
                        },
                    )
                )
                ->add('lang', 'entity', array(
                    'label' => 'Sprache:',
                    'class' => 'VitoopInfomgmtBundle:Language',
                    'property' => 'name',
                    'query_builder' => function (EntityRepository $er) {
                        return $er->createQueryBuilder('l')
                            ->orderBy('l.sortOrder', 'ASC');
                        },
                    )
                )
                ->add('save', 'input_type_submit', array('label' => 'speichern'));
    }

    public function getName()
    {
        return 'res';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Resource'));
    }
}
/*
               ->add('created_at', 'date', array(
                    'widget' => 'single_text',
                    'format' => 'dd.MM.yyyy',
                    'disabled' => true,
                    'label' => 'Eingetragen am:'
                ))
                ->add('updated_at', 'date', array(
                    'widget' => 'single_text',
                    'format' => 'dd.MM.yyyy',
                    'disabled' => true,
                    'label' => 'geändert am:'
                ))
*/