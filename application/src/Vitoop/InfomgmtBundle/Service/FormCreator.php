<?php

namespace Vitoop\InfomgmtBundle\Service;

use Symfony\Component\Form\FormFactoryInterface;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\Lexicon;
use Vitoop\InfomgmtBundle\Entity\Project;
use Vitoop\InfomgmtBundle\Form\Type\LexiconNameType;
use Vitoop\InfomgmtBundle\Form\Type\ProjectNameType;
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

    public function createLexiconNameForm(Lexicon $lex, $action)
    {
        return $this->formFactory->create(LexiconNameType::class, $lex, [
            'action' => $action,
            'method' => 'POST'
        ]);
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
