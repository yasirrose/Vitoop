<?php

namespace Vitoop\InfomgmtBundle\Service;

use Symfony\Component\Form\FormFactoryInterface;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Form\Type\TagType;

class FormCreator
{
    protected $formFactory;

    public function __construct(FormFactoryInterface $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    public function createTagForm(Tag $tag, $action)
    {
        return $this->formFactory->create(TagType::class, $tag, [
            'action' => $action,
            'method' => 'POST'
        ]);
    }
}
