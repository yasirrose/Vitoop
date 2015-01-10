<?php

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\ORM\EntityManager;
use Vitoop\InfomgmtBundle\Entity\Resource;
use Vitoop\InfomgmtBundle\Entity\Tag;
use Vitoop\InfomgmtBundle\Entity\RelResourceTag;
use Vitoop\InfomgmtBundle\Entity\User;

class TagService
{
    private $entityManager;
    const MAX_ALLOWED_ADDING = 5;
    const MAX_ALLOWED_REMOVING = 5;


    public function __construct(EntityManager $manager)
    {
        $this->entityManager = $manager;
    }

    public function checkAddingAbility($userID, $resourceID)
    {
        return ($this->entityManager
            ->getRepository('VitoopInfomgmtBundle:RelResourceTag')
            ->getCountOfAddedTags($userID, $resourceID) < self::MAX_ALLOWED_ADDING);
    }

    public function checkRemovingAbility($userID, $resourceID)
    {
        return ($this->entityManager
                ->getRepository('VitoopInfomgmtBundle:RelResourceTag')
                ->getCountOfRemovedTags($userID, $resourceID) < self::MAX_ALLOWED_REMOVING);
    }

    public function setTag(Tag $tag, Resource $res, User $user)
    {
        $tag_exists = $this->entityManager
            ->getRepository('VitoopInfomgmtBundle:Tag')
            ->findOneByText($tag->getText());

        if (!$tag_exists) {
            $this->entityManager->persist($tag);
        } else {
            $tag = $tag_exists;
        }

        $relation = new RelResourceTag();
        $relation->setResource($res);
        $relation->setTag($tag);
        $relation->setUser($user);
        var_dump($relation->getId());
        if ($tag_exists) {
            if (!is_null($this->entityManager->getRepository('VitoopInfomgmtBundle:RelResourceTag')->exists($relation))) {
                var_dump($relation->getId());
                var_dump($this->entityManager->getRepository('VitoopInfomgmtBundle:RelResourceTag')->exists($relation));
                //exit(0);
                return array(
                    'success' => false,
                    'error' => 'Diese Resource wurde von Dir bereits mit ":' . $tag . '" gettaggt!'
                );
            }
        }
        $this->entityManager->persist($relation);
        $this->entityManager->flush();

        return array(
            'success' => true,
            'tag' => $tag
        );
    }
}