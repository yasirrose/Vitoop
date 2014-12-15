<?php

namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Buzz\Browser;
use Buzz\Client\Curl;

class LexiconController extends Controller
{
    /**
     * @Route("/lex_index", name="_lex_index")
     */
    public function indexAction()
    {
        // $browser = new Browser();
        $browser = $this->get('buzz.browser');

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
    public function suggestAction()
    {
        $term = $this->getRequest()->query->get('lexterm');
        $browser = $this->get('buzz.browser');

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