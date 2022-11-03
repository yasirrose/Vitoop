<?php

namespace App\Controller\V1;

use App\DTO\Resource\ResourceDTO;
use App\Repository\ResourceRepository;
use App\Response\Json\ErrorResponse;
use App\Service\Resource\ResourceImporter;
use App\Service\VitoopSecurity;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Controller\ApiController;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\Validator\ValidatorInterface;

/**
 * @Route("imported-resources")
 */
class ImportedResourceController extends ApiController
{
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var ResourceRepository
     */
    private $resourceRepository;
    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;

    /**
     * @var ResourceImporter
     */
    private $resourceImporter;

    /**
     * ImportedResourceController constructor.
     * @param ValidatorInterface $validator
     * @param ResourceRepository $resourceRepository
     * @param VitoopSecurity $vitoopSecurity
     * @param ResourceImporter $resourceImporter
     */
    public function __construct(
        ValidatorInterface $validator,
        ResourceRepository $resourceRepository,
        VitoopSecurity $vitoopSecurity,
        ResourceImporter $resourceImporter
    ) {
        $this->validator = $validator;
        $this->resourceRepository = $resourceRepository;
        $this->vitoopSecurity = $vitoopSecurity;
        $this->resourceImporter = $resourceImporter;
    }

    /**
     * @Route("", methods={"POST"})
     */
    public function import(Request $request)
    {
        /**
         * @var UploadedFile $importedFile
         */
        $importedFile = $request->files->get('file');
        $errors = $this->validator->validate($importedFile, new Assert\File([
                'maxSize' => '1024k',
                'mimeTypes' => [
                    'text/plain',
                    'application/json',
                ],
                'mimeTypesMessage' => 'Please upload a valid JSON file'
            ])
        );
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        $fileContent = file_get_contents($importedFile->getRealPath());
        $importedJson = json_decode($fileContent, true);

        $resourceIds = [];
        $existentResourceIds = [];
        foreach ($importedJson as $resourceArray) {
            $resourceDTO = ResourceDTO::createFromArrayAndType($resourceArray, $resourceArray['resourceType']);
            $resourceDTO->user = $this->vitoopSecurity->getUser();
            //check if resource exists
            $existentResources = $this->resourceRepository->getResourceByName($resourceDTO->name);
            if (!empty($existentResources)) {
                $existentResourceIds[] = $existentResources[0]->getId();
                continue;
            }

            $importedResource = $this->resourceImporter->importResource($resourceArray, $resourceDTO);

            $resourceIds[] = $importedResource->getId();
        }

        return $this->getApiResponse(['status' => 'ok', 'resources' => $resourceIds, 'existent_resources' => $existentResourceIds]);
    }
}
