<?php
namespace Vitoop\InfomgmtBundle\Form\Type;

use Vitoop\InfomgmtBundle\Form\DataTransformer\EmptyStringToNullTransformer;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class TeliType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $transformer = new EmptyStringToNullTransformer();

        $builder->remove('name')
                ->remove('country')
                ->add('name', null, array('label' => 'Titel:'))
                ->add('author', null, array('label' => 'Autor'))
                ->add('url', 'url', array('label' => 'URL'))
                ->add('release_date', null, array('label' => 'Erschienen:'));
        $builder->get('author')
                ->addModelTransformer($transformer);
    }

    public function getParent()
    {
        return 'res';
    }

    public function getName()
    {
        return 'teli';
    }

    public function getDefaultOptions(array $options)
    {
        return array(
            'data_class' => 'Vitoop\InfomgmtBundle\Entity\Teli'
        );
    }
}