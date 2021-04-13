<?php

namespace App\Service\Resource;

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
use App\Entity\Resource\ResourceType;
use App\Repository\CommentRepository;
use App\Repository\CountryRepository;
use App\Repository\LanguageRepository;
use App\Repository\RatingRepository;
use App\Repository\RemarkPrivateRepository;
use App\Repository\RemarkRepository;
use App\Repository\ResourceRepository;
use App\Repository\UserRepository;
use App\Service\ContextTransaction;
use App\Service\Tag\ResourceTagLinker;

class ResourceImporter
{
    /**
     * @var ContextTransaction
     */
    private $contextTransaction;

    /**
     * @var LanguageRepository
     */
    private $languageRepository;

    /**
     * @var CountryRepository
     */
    private $countryRepository;

    /**
     * @var ResourceRepository
     */
    private $resourceRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;

    /**
     * @var RemarkRepository
     */
    private $remarkRepository;

    /**
     * @var RemarkPrivateRepository
     */
    private $remarkPrivateRepository;

    /**
     * @var ResourceTagLinker
     */
    private $tagLinker;

    /**
     * @var RatingRepository
     */
    private $ratingRepository;

    /**
     * @var CommentRepository
     */
    private $commentRepository;

    /**
     * @param ContextTransaction $contextTransaction
     * @param LanguageRepository $languageRepository
     * @param CountryRepository $countryRepository
     * @param ResourceRepository $resourceRepository
     * @param UserRepository $userRepository
     * @param RemarkRepository $remarkRepository
     * @param RemarkPrivateRepository $remarkPrivateRepository
     * @param ResourceTagLinker $tagLinker
     * @param RatingRepository $ratingRepository
     * @param CommentRepository $commentRepository
     */
    public function __construct(
        ContextTransaction $contextTransaction,
        LanguageRepository $languageRepository,
        CountryRepository $countryRepository,
        ResourceRepository $resourceRepository,
        UserRepository $userRepository,
        RemarkRepository $remarkRepository,
        RemarkPrivateRepository $remarkPrivateRepository,
        ResourceTagLinker $tagLinker,
        RatingRepository $ratingRepository,
        CommentRepository $commentRepository
    ) {
        $this->contextTransaction = $contextTransaction;
        $this->languageRepository = $languageRepository;
        $this->countryRepository = $countryRepository;
        $this->resourceRepository = $resourceRepository;
        $this->userRepository = $userRepository;
        $this->remarkRepository = $remarkRepository;
        $this->remarkPrivateRepository = $remarkPrivateRepository;
        $this->tagLinker = $tagLinker;
        $this->ratingRepository = $ratingRepository;
        $this->commentRepository = $commentRepository;
    }

    public function importResource(array $resourceArray, ResourceDTO $resourceDTO): Resource
    {
        return $this->contextTransaction->run(function ($resourceArray, $resourceDTO) {
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
                $country = $this->countryRepository->findOneBy(['code' => $country]);
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


            return $resource;
        }, [$resourceArray, $resourceDTO]);
    }
}