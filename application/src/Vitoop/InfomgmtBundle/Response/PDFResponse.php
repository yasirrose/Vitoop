<?php

namespace Vitoop\InfomgmtBundle\Response;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;

class PDFResponse extends Response
{
    public function __construct($filename, $content = '')
    {
        parent::__construct($content, self::HTTP_OK, [
            'Content-Type' => 'application/pdf',
            'Content-Transfer-Encoding' => 'binary',
            'Accept-Ranges' => 'bytes',
        ]);

        $this->headers->set(
            "Content-Disposition",
            $this->headers->makeDisposition(
                ResponseHeaderBag::DISPOSITION_INLINE,
                $filename
            )
        );
    }
}