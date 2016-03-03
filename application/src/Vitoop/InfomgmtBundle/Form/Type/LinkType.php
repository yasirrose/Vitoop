<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class LinkType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->remove('country')
                ->add('url', 'url', array('label' => 'URL:'))
                ->add('is_hp', 'checkbox', array('label' => 'ist Homepage?'));
    }

    public function getParent()
    {
        return 'res';
    }

    public function getName()
    {
        return 'link';
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Vitoop\InfomgmtBundle\Entity\Link'
        );
    }
}