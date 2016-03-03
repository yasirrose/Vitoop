<?php

namespace Vitoop\InfomgmtBundle\Twig\Node;

class PaginationThemeNode extends \Twig_Node
{
    public function __construct(\Twig_Node_Expression_Name $pg_name, $theme_name, $lineno, $tag = null)
    {
        parent::__construct(array('pg_name' => $pg_name), array('theme_name' => $theme_name), $lineno, $tag);
    }

    /**
     * Compiles the node to PHP.
     *
     * @param \Twig_Compiler $compiler
     */
    public function compile(\Twig_Compiler $compiler)
    {

        $compiler->addDebugInfo($this)
                 ->write('$this->env->getExtension(\'vitoop_infomgmtbundle_twig_pagination_extension\')->setTheme(')
                 ->subcompile($this->getNode('pg_name'))
                 ->raw(', ')
                 ->repr($this->getAttribute('theme_name'))
                 ->raw(");\n");
    }
}
