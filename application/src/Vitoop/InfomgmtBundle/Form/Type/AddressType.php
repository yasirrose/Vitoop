<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

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
                ->add('name', null, array('label' => 'Institution:'))
                ->add('name2', null, array('label' => 'Zusatz:'))
                ->add('street', null, array('label' => 'Straße:'))
                ->add('zip', null, array('label' => 'PLZ'))
                ->add('city', null, array('label' => 'Stadt:'))
                ->add('contact1', null, array('label' => 'Telefon:'))//->add('contact2', null, array('label' => 'Mobil:'))
                ->add('contact3', null, array('label' => 'Fax:'))
                ->add('contact4', null, array('label' => 'E-Mail:'))
                ->add('contact5', null, array('label' => 'Homepage:'));

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
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Address'));
    }
}