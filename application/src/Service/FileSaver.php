<?php

namespace App\Service;

use App\Exception\File\FileNotOpenedException;
use App\Exception\File\FileNotWritableException;

class FileSaver
{
    public function saveFile(string $path, string $content)
    {
        if (!is_writable($path)) {
            throw new FileNotWritableException('File is not writable');
        }

        $handle = fopen($path, "w+");
        if (!$handle) {
            throw new FileNotOpenedException('File is not opened');
        }

        $fileSize = fwrite($handle, $content, strlen($content));
        if (false === $fileSize) {
            throw new FileNotWritableException('File is not saved');
        }

        fclose($handle);
    }
}
