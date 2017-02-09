<?php

namespace Vitoop\InfomgmtBundle\Utils\Title;

class PopupTitle extends Title
{
    const POPUP_TITLE_SIZE = 60;

    public function getTitle()
    {
        return $this->teaseTitle(self::POPUP_TITLE_SIZE);
    }
}
