<?php

namespace Vitoop\InfomgmtBundle\Twig\Node;

class PaginationOptionsNode extends \Twig_Node
{
    public function __construct(\Twig_Node_Expression_Array $pg_options, $lineno, $tag = null)
    {
        parent::__construct(array('pg_options' => $pg_options), array(), $lineno, $tag);
    }

    /**
     * Compiles the node to PHP.
     *
     * @param \Twig_Compiler $compiler
     */
    public function compile(\Twig_Compiler $compiler)
    {
        $compiler->addDebugInfo($this)
                 ->write('$context["pgoptions"] = array_merge(')
                 ->subcompile($this->getNode('pg_options'))
                 ->raw(', (isset($context["pgoptions"]) ? $context["pgoptions"] : array())')
                 ->raw(");\n");
    }
}
