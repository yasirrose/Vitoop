<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class InvitationType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('email', 'text', array('label' => 'eMail:'))
                ->add('days', 'choice', array(
                    'label' => 'Gültigkeit:',
                    'choices' => array('1' => '1 Tag', '2' => '2 Tage', '3' => '3 Tage'),
                    'constraints' => new Assert\Range(array(
                            'min' => 1,
                            'max' => 3,
                            'minMessage' => 'Die Einladung muss mindestens 1 Tag gültig sein.',
                            'maxMessage' => 'Die EInladung darf höchstens 3 Tage gültig sein.',
                        )),
                    'mapped' => false
                ))
                ->add('subject', 'text', array('label' => 'Betreff:'))
                ->add('mail', 'textarea', array('label' => 'Einladungstext:'))
                ->add('save', 'input_type_submit', array('label' => 'Einladung versenden'));
    }

    public function getName()
    {
        return 'invitation';
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array('data_class' => 'Vitoop\InfomgmtBundle\Entity\Invitation'));
    }
}