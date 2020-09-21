<?php

namespace App\Controller;

use Buzz\Browser;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @TODO: Need refactoring - change correct content-type
 */
class LexiconController extends AbstractController
{
    /**
     * @Route("/lex_index", name="_lex_index")
     */
    public function indexAction(Browser $browser)
    {
        $response = $browser->get('http://de.wikipedia.org/w/api.php?format=xml&action=opensearch&search=api&namespace=0&suggest=', array(
            'User-Agent' => 'VitooP/0.dev (http://vitoop.org; tweini@web.de)'
        ));

        // echo "<br>" . $browser->getLastRequest() . "<br>";
 
        $xml_data = $response->getContent();
        $json = '[';
        if ($xml_data) {
            $parser = simplexml_load_string($xml_data);

            foreach ($parser->Section as $section) {
                foreach ($section->Item as $item) {
                    $json = $json . '"' . rawurldecode($item->Text) . ' - URL:' . rawurldecode($item->Url) . '",';
                }
            }
        }
        $json = $json . '"ENDE"]';
        echo $json;
        die();
    }

    /**
     * @Route("/lex/suggest", name="_lex_suggest")
     */
    public function suggestAction(Request $request, Browser $browser)
    {
        $term = $request->query->get('lexterm');
        $response = $browser->get('http://de.wikipedia.org/w/api.php?format=json&action=opensearch&search=api&namespace=0&suggest=', array(
            'User-Agent' => 'VitooP/0.dev (http://vitoop.org; tweini@web.de)'
        ));

        // echo "<br>" . $browser->getLastRequest() . "<br>";

        $xml_data = $response->getContent();
        $json = '[';
        if ($xml_data) {
            $parser = simplexml_load_string($xml_data);

            foreach ($parser->Section as $section) {
                foreach ($section->Item as $item) {
                    $json = $json . '"' . rawurldecode($item->Text) . ' - URL:' . rawurldecode($item->Url) . '",';
                }
            }
        }
        $json = $json . '"ENDE"]';
        echo $json;
        die();

        return;
    }
}
