<?php
namespace App\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Entity\Flag;

class FlagInfoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        /**
         * @var Flag
         */
        $flag = $builder->getData();
        $builder
            ->add(
                'isSkip',
                CheckboxType::class,
                [
                    'label' => 'nicht suchen',
                    'attr' => ['class' => 'valid-checkbox'],
                    'mapped' => false,
                    'data' => $flag->isSkip()
                ]
            )
            ->add('delete_resource', SubmitType::class, ['label' => 'endgültig löschen'])
            ->add('delete_flag', SubmitType::class, ['label' => 'flag entfernen']);
    }

    public function getBlockPrefix(): string
    {
        return 'flaginfo';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['data_class' => Flag::class]);
    }
}