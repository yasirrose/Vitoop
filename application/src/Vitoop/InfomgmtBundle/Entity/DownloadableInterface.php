<?php

namespace Vitoop\InfomgmtBundle\Entity;

interface DownloadableInterface
{
    public function getId();
    public function getUrl();
    public function getResourceType();

    public function getIsDownloaded();
    public function getDownloadedAt();
    public function setIsDownloaded($code);
    public function setDownloadedAt($date);
}