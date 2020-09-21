<?php

namespace App\Service;

use Symfony\Component\Form\FormFactoryInterface;
use App\Entity\Tag;
use App\Entity\Lexicon;
use App\Entity\Project;
use App\Entity\Resource;
use App\Form\Type\LexiconNameType;
use App\Form\Type\ProjectNameType;
use App\Form\Type\TagType;
use App\Service\Tag\ResourceTagLinker;
use App\Service\RelResource\RelResourceLinker;

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
