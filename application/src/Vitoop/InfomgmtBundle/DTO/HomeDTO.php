<?php

namespace Vitoop\InfomgmtBundle\DTO;

class HomeDTO
{
    public $project = null;

    public $lexicon = null;

    public $isEditMode = false;

    public function __construct($project, $lexicon, $isEditMode)
    {
        $this->project = $project;
        $this->lexicon = $lexicon;
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
}
