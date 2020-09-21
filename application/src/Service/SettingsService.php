<?php

namespace App\Service;

use App\Entity\Option;
use App\Repository\OptionRepository;
use App\Repository\UserRepository;

class SettingsService
{
    const NAME_HELP = 'help';
    const NAME_TERMS = 'terms';
    const NAME_TERMS_MUST_BE_ACCEPTED = 'terms_accepted';
    const NAME_DATAP = 'datap';
    const NAME_INVITATION = 'invitation';
    const NAME_CURRENT_SIZE = 'current_downloads_size';

    /**
     * @var OptionRepository
     */
    private $optionRepository;
    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(OptionRepository $optionRepository, UserRepository $userRepository)
    {
        $this->optionRepository = $optionRepository;
        $this->userRepository = $userRepository;
    }

    public function get($name)
    {
        return $this->optionRepository->getOption($name);
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
        $value = $this->convertFromBoolToString($value);
        if (null === $option) {
            $option = new Option($name, $value);
        }
        $option->updateValue($value);
        $this->optionRepository->save($option);
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
            $users = $this->userRepository->findAll();
        } else {
            $users[] = $this->userRepository->findOneBy(array(
                'username' => 'david'
            ));
            $users[] = $this->userRepository->findOneBy(array(
                'username' => 'alex.shalkin'
            ));
        }
        foreach ($users as $user) {
            $user->setIsAgreedWithTerms(false);
            $this->userRepository->save($user);
        }
    }

    /**
     * @param $value
     * @return string
     */
    private function convertFromBoolToString($value)
    {
        if ($value === true) {
            return '1';
        }
        if ($value === false) {
            return '0';
        }

        return $value;
    }
}