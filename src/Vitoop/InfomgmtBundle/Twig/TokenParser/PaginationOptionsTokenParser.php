<?php

namespace Vitoop\InfomgmtBundle\Twig\TokenParser;

use Vitoop\InfomgmtBundle\Twig\Node\PaginationOptionsNode;

/**
 * Token Parser for the 'pg_options' tag.
 */
class PaginationOptionsTokenParser extends \Twig_TokenParser
{
    /**
     * Parses a token and returns a node.
     *
     * @param \Twig_Token $token
     *
     * @return Vitoop\InfomgmtBundle\Twig\Node\PaginationOptionsNode
     */
    public function parse(\Twig_Token $token)
    {
        $lineno = $token->getLine();

        $pg_options = $this->parser->getExpressionParser()
                                   ->parseExpression();
        $this->parser->getStream()
                     ->expect(\Twig_Token::BLOCK_END_TYPE);

        return new PaginationOptionsNode($pg_options, $lineno, $this->getTag());
    }

    /**
     * Gets the tag name associated with this token parser.
     *
     * @return string The tag name
     */
    public function getTag()
    {
        return 'pg_options';
    }
}
