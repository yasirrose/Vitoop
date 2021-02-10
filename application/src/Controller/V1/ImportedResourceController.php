<?php

namespace App\Controller\V1;

use App\DTO\Resource\CommentDTO;
use App\DTO\Resource\RemarkDTO;
use App\DTO\Resource\RemarkPrivateDTO;
use App\DTO\Resource\ResourceDTO;
use App\Entity\Comment;
use App\Entity\Country;
use App\Entity\Language;
use App\Entity\Rating;
use App\Entity\Remark;
use App\Entity\RemarkPrivate;
use App\Entity\Resource;
use App\Entity\Resource\ResourceFactory;
use App\Entity\Resource\ResourceType;
use App\Repository\CommentRepository;
use App\Repository\CountryRepository;
use App\Repository\LanguageRepository;
use App\Repository\RatingRepository;
use App\Repository\RemarkPrivateRepository;
use App\Repository\RemarkRepository;
use App\Repository\ResourceRepository;
use App\Repository\UserRepository;
use App\Response\Json\ErrorResponse;
use App\Service\ContextTransaction;
use App\Service\Tag\ResourceTagLinker;
use App\Service\Tag\TagCreator;
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
     * @var ContextTransaction
     */
    private $contextTransaction;

    /**
     * @var ResourceTagLinker
     */
    private $tagLinker;
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var VitoopSecurity
     */
    private $vitoopSecurity;
    /**
     * @var LanguageRepository
     */
    private $languageRepository;
    /**
     * @var RatingRepository
     */
    private $ratingRepository;
    /**
     * @var RemarkRepository
     */
    private $remarkRepository;
    /**
     * @var RemarkPrivateRepository
     */
    private $remarkPrivateRepository;
    /**
     * @var CommentRepository
     */
    private $commentRepository;
    /**
     * @var CountryRepository
     */
    private $countryRepository;

    /**
     * ImportedResourceController constructor.
     * @param ValidatorInterface $validator
     * @param ResourceRepository $resourceRepository
     * @param ContextTransaction $contextTransaction
     * @param ResourceTagLinker $tagLinker
     * @param UserRepository $userRepository
     * @param VitoopSecurity $vitoopSecurity
     * @param LanguageRepository $languageRepository
     * @param RatingRepository $ratingRepository
     * @param RemarkRepository $remarkRepository
     * @param RemarkPrivateRepository $remarkPrivateRepository
     * @param CommentRepository $commentRepository
     * @param CountryRepository $countryRepository
     */
    public function __construct(
        ValidatorInterface $validator,
        ResourceRepository $resourceRepository,
        ContextTransaction $contextTransaction,
        ResourceTagLinker $tagLinker,
        UserRepository $userRepository,
        VitoopSecurity $vitoopSecurity,
        LanguageRepository $languageRepository,
        RatingRepository $ratingRepository,
        RemarkRepository $remarkRepository,
        RemarkPrivateRepository $remarkPrivateRepository,
        CommentRepository $commentRepository,
        CountryRepository $countryRepository
    ) {
        $this->validator = $validator;
        $this->resourceRepository = $resourceRepository;
        $this->contextTransaction = $contextTransaction;
        $this->tagLinker = $tagLinker;
        $this->userRepository = $userRepository;
        $this->vitoopSecurity = $vitoopSecurity;
        $this->languageRepository = $languageRepository;
        $this->ratingRepository = $ratingRepository;
        $this->remarkRepository = $remarkRepository;
        $this->remarkPrivateRepository = $remarkPrivateRepository;
        $this->commentRepository = $commentRepository;
        $this->countryRepository = $countryRepository;
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

        foreach ($importedJson as $resourceArray) {
            $resourceDTO = ResourceDTO::createFromArrayAndType($resourceArray, $resourceArray['resourceType']);
            $resourceDTO->user = $this->vitoopSecurity->getUser();
            //check if resource exists
            $existentResources = $this->resourceRepository->getResourceByName($resourceDTO->name);
            if (!empty($existentResources)) {
                continue;
            }

            $this->contextTransaction->run(function ($resourceArray, $resourceDTO) {
                //create resource
                $resourceClass = ResourceType::getClassByResourceType($resourceArray['resourceType']);
                /**
                 * @var Resource $resource
                 */
                $resource = $resourceClass::createFromResourceDTO($resourceDTO);
                $lang = $resource->getLang();
                if ((null !== $lang) && !($lang instanceof Language)) {
                    $language = $this->languageRepository->getReference($lang);
                    $resource->setLang($language);
                }
                $country = $resource->getCountry();
                if (!empty($country) && !($country instanceof Country)) {
                    $country = $this->countryRepository->getReference($country);
                    $resource->setCountry($country);
                }

                $this->resourceRepository->save($resource);


                //create additional entities
                foreach ($resourceArray['remark'] as $remarkArray) {
                    $user = $this->userRepository->findOneByUsernameOrEmail($remarkArray['user']['username'], $remarkArray['user']['username']);
                    if (!$user) {
                        continue;
                    }

                    $remark = Remark::create($resource, $user, new RemarkDTO(
                        null,
                        $remarkArray['text'],
                        $remarkArray['ip'],
                        $remarkArray['locked'],
                       null,
                        null,
                        new \DateTime($remarkArray['createdAt'])
                    ));
                    $this->remarkRepository->save($remark);
                }

                foreach ($resourceArray['remarksPrivate'] as $privateRemarkArray) {
                    $user = $this->userRepository->findOneByUsernameOrEmail($privateRemarkArray['user']['username'], $privateRemarkArray['user']['username']);
                    if (!$user) {
                        continue;
                    }

                    $privateRemark = RemarkPrivate::create($resource, $user, new RemarkPrivateDTO(
                        null,
                        $privateRemarkArray['text'],
                        null,
                        null,
                        new \DateTime($privateRemarkArray['createdAt'])
                    ));
                    $this->remarkPrivateRepository->save($privateRemark);
                }

                foreach ($resourceArray['tags'] as $tagArray) {
                    $user = $this->userRepository->findOneByUsernameOrEmail($tagArray['user']['username'], $tagArray['user']['username']);
                    if (!$user) {
                        continue;
                    }

                    $this->tagLinker->addTagToResource($resource, $tagArray['tag'], $user);
                }

                foreach ($resourceArray['ratings'] as $ratingArray) {
                    $user = $this->userRepository->findOneByUsernameOrEmail($ratingArray['user']['username'], $ratingArray['user']['username']);
                    if (!$user) {
                        continue;
                    }
                    $rating = Rating::create($resource, $user, $ratingArray['mark']);
                    $this->ratingRepository->save($rating);
                }

                foreach ($resourceArray['comments'] as $commentArray) {
                    $user = $this->userRepository->findOneByUsernameOrEmail($commentArray['user']['username'], $commentArray['user']['username']);
                    if (!$user) {
                        continue;
                    }
                    $comment = Comment::create($resource, $user, new CommentDTO(
                        null,
                        $commentArray['text'],
                        null,
                        null,
                        new \DateTime($commentArray['created_at']),
                        $commentArray['isVisible']
                    ));
                    $this->commentRepository->save($comment);
                }

            }, [$resourceArray, $resourceDTO]);

        }

        return $this->getApiResponse(['status' => 'ok']);
    }
}
