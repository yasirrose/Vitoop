<?php

namespace Vitoop\InfomgmtBundle\DTO\Resource;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestInterface;
use Vitoop\InfomgmtBundle\DTO\CreateFromRequestTrait;

class RatingDTO implements CreateFromRequestInterface
{
    use CreateFromRequestTrait;

    /**
     * @Assert\NotBlank()
     * @Assert\Choice(callback="getMarkValues")
     */
    public $ownmark;

    public $ownimg;

    public $avgmark;

    public $avgimg;

    /**
     * RatingDTO constructor.
     * @param $ownmark
     * @param $avgmark
     */
    public function __construct($ownmark, $avgmark)
    {
        $this->ownmark = $ownmark;
        $this->avgmark = $avgmark;

        $this->ownimg = '';
        $this->ownmark = $ownmark;
        if (null !== $this->ownmark) {
            $this->ownimg = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+02d', $this->ownmark) . '0.png');
        }

        $this->avgimg = '';
        if (null !== $avgmark) {
            $this->avgmark = round($avgmark, 2, PHP_ROUND_HALF_EVEN);
            $this->avgimg = 'rating_' . str_replace(array('+', '-'), array('p', 'm'), sprintf('%+03d', (intval(($this->avgmark * 10)) + (intval(($this->avgmark * 10)) % 2)))) . '.png';
        }
    }

    public static function createFromRequest(Request $request)
    {
        $requestData = self::getRequestData($request);

        return new RatingDTO(
            array_key_exists('ownmark', $requestData) ? $requestData['ownmark'] : null,
            null
        );
    }

    public static function getMarkValues()
    {
        return ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5'];
    }
}
