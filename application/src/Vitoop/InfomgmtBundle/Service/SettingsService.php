<?php

namespace Vitoop\InfomgmtBundle\Service;

use Doctrine\ORM\EntityManagerInterface;
use Vitoop\InfomgmtBundle\Entity\Option;
use Vitoop\InfomgmtBundle\Repository\OptionRepository;

class SettingsService
{
    const NAME_HELP = 'help';
    const NAME_TERMS = 'terms';
    const NAME_TERMS_MUST_BE_ACCEPTED = 'terms_accepted';
    const NAME_DATAP = 'datap';
    const NAME_INVITATION = 'invitation';
    const NAME_CURRENT_SIZE = 'current_downloads_size';

    private $repository = null;
    private $em = null;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
        $this->repository = $this->em->getRepository('VitoopInfomgmtBundle:Option');
    }

    public function get($name)
    {
        return $this->repository->getOption($name);
    }

    public function getHelp()
    {
        return $this->get(self::NAME_HELP);
    }

    public function getTerms()
    {
        return $this->get(self::NAME_TERMS);
    }

    public function getTermsMustBeAccepted()
    {
        return $this->get(self::NAME_TERMS_MUST_BE_ACCEPTED);
    }

    public function getDataP()
    {
        return $this->get(self::NAME_DATAP);
    }

    public function getCurrentDownloadsSize()
    {
        return $this->get(self::NAME_CURRENT_SIZE);
    }

    public function getInvitation()
    {
        return $this->get(self::NAME_INVITATION);
    }

    public function set($name, $value)
    {
        $option = $this->get($name);
        if (is_null($option)) {
            $option = new Option();
            $option->setName($name);
        }
        if ($value === true) {
            $value = '1';
        } elseif ($value === false) {
            $value = '0';
        }
        $option->setValue($value);
        $this->em->merge($option);
        $this->em->flush();
    }

    public function setHelp($value)
    {
        $this->set(self::NAME_HELP, $value);
    }

    public function setTerms($value, $allUsers = false)
    {
        $this->set(self::NAME_TERMS, $value);
        $this->setNewTermsForUsers($allUsers);
    }

    public function setDataP($value)
    {
        $this->set(self::NAME_DATAP, $value);
        $this->setNewTermsForUsers(true);
    }

    public function setTermsMustBeAccepted($value)
    {
        $this->set(self::NAME_TERMS_MUST_BE_ACCEPTED, $value);
    }

    public function setCurrentDownloadsSize($value)
    {
        return $this->set(self::NAME_CURRENT_SIZE, $value);
    }

    public function setInvitation($value)
    {
        $this->set(self::NAME_INVITATION, $value);
    }

    public function toggleInvitation()
    {
        $invitation = !$this->getInvitation()->getValue();
        $this->set(self::NAME_INVITATION, $invitation);

        return $invitation;
    }

    private function setNewTermsForUsers($allUsers = false)
    {
        $users = array();
        if ($allUsers) {
            $users = $this->em->getRepository('VitoopInfomgmtBundle:User')->findAll();
        } else {
            $users[] = $this->em->getRepository('VitoopInfomgmtBundle:User')->findOneBy(array(
                'username' => 'david'
            ));
            $users[] = $this->em->getRepository('VitoopInfomgmtBundle:User')->findOneBy(array(
                'username' => 'alex.shalkin'
            ));
        }
        foreach ($users as $user) {
            $user->setIsAgreedWithTerms(false);
        }
        $this->em->flush();
    }
}