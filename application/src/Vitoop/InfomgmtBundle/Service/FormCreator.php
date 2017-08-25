<?php

namespace Vitoop\InfomgmtBundle\Service;

use Symfony\Component\Form\FormFactoryInterface;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Form\Type\LexiconNameType;
use Vitoop\InfomgmtBundle\Form\Type\ProjectNameType;
use Vitoop\InfomgmtBundle\Form\Type\TagType;
use Vitoop\InfomgmtBundle\Service\Tag\ResourceTagLinker;
use Vitoop\InfomgmtBundle\Service\RelResource\RelResourceLinker;

class FormCreator
{
    protected $formFactory;

    protected $tagLinker;

    protected $resourceLinker;

    public function __construct(
        FormFactoryInterface $formFactory,
        ResourceTagLinker $tagLinker,
        RelResourceLinker $resourceLinker
    ) {
        $this->formFactory = $formFactory;
        $this->tagLinker = $tagLinker;
        $this->resourceLinker = $resourceLinker;
    }

    /**
     * @param Tag $tag
     * @param Resource $resource
     * @param $action
     * @return \Symfony\Component\Form\FormInterface
     */
    public function createTagForm(Tag $tag, Resource $resource, $action)
    {
        $form = $this->formFactory->create(TagType::class, $tag, [
            'action' => $action,
            'method' => 'POST'
        ]);
        $form->get('can_add')->setData($this->tagLinker->isTagsAddingAvailable($resource));
        $form->get('can_remove')->setData($this->tagLinker->isTagsRemovingAvailable($resource));

        return $form;
    }

    public function createLexiconNameForm(Lexicon $lex, Resource $resource, $action)
    {
        $form = $this->formFactory->create(LexiconNameType::class, $lex, [
            'action' => $action,
            'method' => 'POST'
        ]);

        $form->get('can_add')->setData($this->resourceLinker->isResourcesAddingAvailable($resource));
        $form->get('can_remove')->setData($this->resourceLinker->isResourcesRemovingAvailable($resource));

        return $form;
    }

    public function createProjectNameForm(Project $project, $action, $projects)
    {
        return $this->formFactory->create(ProjectNameType::class, $project, [
            'action' => $action,
            'method' => 'POST',
            'projects' => $projects
        ]);
    }
}
