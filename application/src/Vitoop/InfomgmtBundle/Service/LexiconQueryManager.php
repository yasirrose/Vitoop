<?php
namespace Vitoop\InfomgmtBundle\Service;

use Vitoop\InfomgmtBundle\Entity\WikiRedirect;

use Vitoop\InfomgmtBundle\Entity\Lexicon;

use Buzz\Browser;
use Buzz\Client\Curl;

class LexiconQueryManager
{
    protected $browser;
    protected $serializer;

    public function __construct(Browser $browser)
    {
        $this->browser = $browser;
    }

    protected function getWikiDatafromArrWiki($arr_wiki)
    {
        $wiki_data = array();
        /*
         * array(1) { ["query"]=> array(3) { ["normalized"]=> array(1) { [0]=>
         * array(2) { ["from"]=> string(6) "apidae" ["to"]=> string(6) "Apidae" }
         * } ["redirects"]=> array(1) { [0]=> array(2) { ["from"]=> string(6)
         * "Apidae" ["to"]=> string(12) "Echte Bienen" } } ["pages"]=> array(1) {
         * [290512]=> array(9) { ["pageid"]=> int(290512) ["ns"]=> int(0)
         * ["title"]=> string(12) "Echte Bienen" ["touched"]=> string(20)
         * "2012-11-18T16:18:28Z" ["lastrevid"]=> int(104848835) ["counter"]=>
         * string(0) "" ["length"]=> int(3398) ["fullurl"]=> string(41)
         * "http://de.wikipedia.org/wiki/Echte_Bienen" ["editurl"]=> string(66)
         * "http://de.wikipedia.org/w/index.php?title=Echte_Bienen&action=edit" }
         * } } }
         */
        if (array_key_exists('query', $arr_wiki)) {
            $key_query = $arr_wiki['query'];
            if (array_key_exists('normalized', $key_query)) {
                // $key_query['normalized'][0]['to'];
            }
            if (array_key_exists('redirects', $key_query)) {
                $wiki_data['wiki_redirect_title'] = $key_query['redirects'][0]['from'];
            }
            if (array_key_exists('pages', $key_query)) {

                $arr_key_pages_keys = array_keys($key_query['pages']);
                $key_pages = $key_query['pages'][$arr_key_pages_keys[0]];
                if (array_key_exists('missing', $key_pages)) {
                    throw new \Exception('This Wikipedia Searchterm does not exist!');
                }
                /*if (array_key_exists('categories', $key_pages)) {
                    $key_categories = $key_pages['categories'];

                    $term_info = 'This Wikipedia Searchterm is ';
                    $abbreviation = false;
                    $disambiguation = false;

                    if (1 == count($key_categories)) {
                        if ('Kategorie:Abkürzung' == $key_categories[0]['title']) {
                            $abbreviation = true;
                        } else {
                            $disambiguation = true;
                        }
                    }
                    if (2 == count($key_categories)) {
                        $abbreviation = true;
                        $disambiguation = true;
                    }
                    if ($abbreviation) {
                        $term_info = $term_info . 'an Abbreviation';
                    }
                    if ($abbreviation && $disambiguation) {
                        $term_info = $term_info . ' and ';
                    }
                    if ($disambiguation) {
                        $term_info = $term_info . 'a Disambiguation';
                    }

                    throw new \Exception($term_info . '. Please visit: ' . $key_pages['fullurl']);
                } else {
*/
                    $wiki_data['wiki_page_id'] = $key_pages['pageid'];
                    $wiki_data['wiki_title'] = $key_pages['title'];
                    $wiki_data['wiki_fullurl'] = rawurldecode($key_pages['fullurl']);
  //              }
            } else {
                throw new \Exception('Bad Answer from Wikipedia (no "query"-attribute given)');
            }
        } else {
            throw new \Exception('Bad Answer from Wikipedia (no "query" => "pages"-attribute given)');
        }

        return $wiki_data;
    }

    protected function getArrWikiFromWikiApi($term, $follow_redirect = true)
    {
        $follow_redirect ? $redirect_query = '&redirects=true' : $redirect_query = '';
        $url = 'http://de.wikipedia.org/w/api.php';
        $query = '?action=query&format=php&prop=categories|info&clcategories=Kategorie:Begriffskl%C3%A4rung|Kategorie:Abk%C3%BCrzung' . $redirect_query . '&inprop=url&titles=' . urlencode($term);
        $header = array(
            'User-Agent' => 'VitooP/1.0 (http://vitoop.org; david@vitoop.org)'
        );
        /* @var $response \Buzz\Message\Response */
        $response = $this->browser->get($url . $query, $header);
        $err = $response->getHeader('MediaWiki-API-Error', ' -o- ');
        if (!is_null($err)) {
            throw new \Exception('MediaWiki-API-Error: ' . $err);
        }
        $ser_data = $response->getContent();
        $arr_wiki = unserialize($ser_data);

        return $arr_wiki;
    }

    public function getDescriptionFromWikiApi($term)
    {
        $url = 'https://de.wikipedia.org/w/api.php';
        $query = '?format=php&action=query&continue=&prop=extracts&exintro=&titles=' . urlencode($term);
        $header = array(
            'User-Agent' => 'VitooP/1.0 (http://vitoop.org; david@vitoop.org)'
        );
        /* @var $response \Buzz\Message\Response */
        $response = $this->browser->get($url . $query, $header);
        $err = $response->getHeader('MediaWiki-API-Error', ' -o- ');
        if (!is_null($err)) {
            throw new \Exception('MediaWiki-API-Error: ' . $err);
        }
        $arr_wiki = unserialize($response->getContent());

        return $arr_wiki['query']['pages'];
    }

    public function getLexiconFromSuggestTerm($term)
    {
        $arr_wiki = $this->getArrWikiFromWikiApi($term);

        $wiki_data = $this->getWikiDatafromArrWiki($arr_wiki);

        $description = $this->getDescriptionFromWikiApi($term);

        $lexicon_entry = new Lexicon();
        $lexicon_entry->setName($wiki_data['wiki_title']);
        $lexicon_entry->setWikiFullurl($wiki_data['wiki_fullurl']);
        $lexicon_entry->setWikiPageId($wiki_data['wiki_page_id']);
        $lexicon_entry->setDescription($description[$wiki_data['wiki_page_id']]['extract']);

        if (array_key_exists('wiki_redirect_title', $wiki_data)) {
            $arr_wiki = $this->getArrWikiFromWikiApi($wiki_data['wiki_redirect_title'], false);
            $wiki_data = $this->getWikiDatafromArrWiki($arr_wiki);

            $wiki_redirect = new WikiRedirect($wiki_data['wiki_page_id']);
            $wiki_redirect->setWikiTitle($wiki_data['wiki_title']);
            $wiki_redirect->setWikiFullurl($wiki_data['wiki_fullurl']);

            $wiki_redirect->setLexicon($lexicon_entry);
        }

        return $lexicon_entry;
    }
}