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

        return json_encode($exportedData);
    }
}