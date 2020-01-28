<?php

namespace Vitoop\InfomgmtBundle\DTO;

class HomeDTO
{
    public $project = null;

    public $lexicon = null;

    public $conversation = null;

    public $isEditMode = false;

    public function __construct($project, $lexicon, $conversation, $isEditMode)
    {
        $this->project = $project;
        $this->lexicon = $lexicon;
        $this->conversation = $conversation;
        $this->isEditMode = $isEditMode;
    }

    public function isNotEmptyProject()
    {
        return !empty($this->project);
    }

    public function isNotEmptyLexicon()
    {
        return !empty($this->lexicon);
    }

    public function isNotEmptyConversation()
    {
        return !empty($this->conversation);
    }
}
