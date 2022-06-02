<?php

namespace App\Service;

class FileSaver
{
    public function saveFile(string $path, string $content)
    {
        $handle = fopen($path, "w+");
        fwrite($handle, $content, strlen($content));
        fclose($handle);
    }
}
