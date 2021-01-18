<?php

namespace App\Service\Resource;

use App\Entity\Resource;
use App\Entity\User\User;
use ZipStream\Option\Archive;
use ZipStream\ZipStream;

class ResourceExporter
{
    public function export($resources)
    {
        $exportedData = [];
        /**
         * @var Resource $resource
         */
        foreach ($resources as $resource) {
            $exportedData[] = $resource->toExportResourceDTO();
        }

//        $memoryStream = fopen('php://memory', 'w+b');
//        $options = new Archive();
//        $options->setOutputStream($memoryStream);
//        $arch = new ZipStream(null, $options);
//        $arch->addFile('vitoop_'.(new \DateTime())->getTimestamp().'.json', json_encode($exportedData));
//        $arch->finish();
//        rewind($memoryStream);
//
//        return $memoryStream;

        return json_encode($exportedData);
    }
}