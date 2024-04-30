<?php

namespace App\Utils;

use Doctrine\ORM\Query\AST\Functions\FunctionNode;
use Doctrine\ORM\Query\Lexer;

class ParseUrlFunction extends FunctionNode
{
    public $urlExpression = null;

    public function parse(\Doctrine\ORM\Query\Parser $parser)
    {
        $parser->match(Lexer::T_IDENTIFIER);
        $parser->match(Lexer::T_OPEN_PARENTHESIS);
        $this->urlExpression = $parser->ArithmeticPrimary();
        $parser->match(Lexer::T_CLOSE_PARENTHESIS);
    }

    public function getSql(\Doctrine\ORM\Query\SqlWalker $sqlWalker)
    {
        return 'SUBSTRING_INDEX(SUBSTRING_INDEX(SUBSTRING_INDEX(' .
            $this->urlExpression->dispatch($sqlWalker) .
        ', \'://\', -1), \'www.\', -1), \'/\', 1)';
    }
}