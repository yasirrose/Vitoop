<?php
namespace App\Form\Type;

use App\Entity\Country;
use App\Entity\Language;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Doctrine\ORM\EntityRepository;
use App\DTO\Resource\ResourceDTO;

class ResourceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name', null, array('label' => 'Name:'))
            ->add('country', EntityType::class, array(
                'label' => 'Land:',
                'class' => Country::class,
                'choice_label' => 'name',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('c')
                        ->orderBy('c.sortOrder', 'ASC');
                    },
                )
            )
            ->add('lang', EntityType::class, array(
                'label' => 'Sprache:',
                'placeholder' => '',
                'class' => Language::class,
                'choice_label' => 'name',
                'query_builder' => function (EntityRepository $er) {
                    return $er->createQueryBuilder('l')
                        ->orderBy('l.sortOrder', 'ASC');
                    },
                )
            )
            // ->add('isUserHook', CheckboxType::class, ['label' => 'blau', 'attr' => ['class' => 'valid-checkbox', 'title' => 'label.tab']])
            ->add('send_mail', CheckboxType::class, ['label' => 'Bei Änderungen in Anmerkung oder Kommentare - mich per Mail informieren', 'attr' => ['class' => 'valid-checkbox', 'title' => 'label.tab', 'value' => '0']])
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
