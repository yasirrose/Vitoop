<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\Extension\Core\Type\TextType;
use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class AddressType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new EmptyStringToNullTransformer();

        $builder->remove('lang')
                ->remove('name')
                ->add('name', TextType::class, ['label' => 'Institution:'])
                ->add('name2', TextType::class, ['label' => 'Zusatz:'])
                ->add('street', TextType::class, ['label' => 'Straße:'])
                ->add('zip', TextType::class, ['label' => 'PLZ'])
                ->add('city', TextType::class, ['label' => 'Stadt:'])
                ->add('contact1', TextType::class, ['label' => 'Telefon:'])//->add('contact2', null, array('label' => 'Mobil:'))
                ->add('contact3', TextType::class, ['label' => 'Fax:'])
                ->add('contact4', TextType::class, ['label' => 'E-Mail:'])
                ->add('contact5', TextType::class, ['label' => 'Homepage:']);

        $builder->get('name2')
                ->addModelTransformer($transformer);
        $builder->get('contact1')
                ->addModelTransformer($transformer);
        //$builder->get('contact2')->addModelTransformer($transformer);
        $builder->get('contact3')
                ->addModelTransformer($transformer);
        $builder->get('contact4')
                ->addModelTransformer($transformer);
        $builder->get('contact5')
                ->addModelTransformer($transformer);
    }

    public function getParent()
    {
        return ResourceType::class;
    }

    public function getBlockPrefix()
    {
        return 'adr';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'validation_groups' => [
                'Default',
                'adr'
            ]
        ]);
    }
}