<?php

namespace Vitoop\InfomgmtBundle\Twig\TokenParser;

use Vitoop\InfomgmtBundle\Twig\Node\PaginationThemeNode;

/**
 * Token Parser for the 'pg_theme' tag.
 */
class PaginationThemeTokenParser extends \Twig_TokenParser
{
    /**
     * Parses a token and returns a node.
     *
     * @param \Twig_Token $token
     *
     * @return Vitoop\InfomgmtBundle\Twig\Node\PaginationThemeNode
     */
    public function parse(\Twig_Token $token)
    {
        $lineno = $token->getLine();

        $pg_name = $this->parser->getStream()
                                ->expect(\Twig_Token::NAME_TYPE)
                                ->getValue();
        $theme_filename = $this->parser->getStream()
                                       ->expect(\Twig_Token::STRING_TYPE)
                                       ->getValue();
        $this->parser->getStream()
                     ->expect(\Twig_Token::BLOCK_END_TYPE);

        return new PaginationThemeNode(new \Twig_Node_Expression_Name($pg_name, $lineno), $theme_filename, $lineno, $this->getTag());
    }

    /**
     * Gets the tag name associated with this token parser.
     *
     * @return string The tag name
     */
    public function getTag()
    {
        return 'pg_theme';
    }
}
