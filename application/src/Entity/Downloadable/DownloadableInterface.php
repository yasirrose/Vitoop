<?php

namespace App\Entity\Downloadable;

interface DownloadableInterface
{
    const STATUS_NOT_DOWNLOADED = 0;
    const STATUS_DOWNLOADED = 1;
    const STATUS_WRONG = 5;
    const STATUS_BLANK_HTML = 2;

    public function getId();
    public function getUrl();
    public function getResourceType();
    public function getResourceExtension();

    public function getIsDownloaded();
    public function getDownloadedAt();

    public function markAsWrongUrl();
    public function markAsSuccess();
    public function markAsBlankHtml();
    public function markAsNotDownloaded();

    public function isSuccessDownloaded(): bool;
    public function isBlankHtml(): bool;
}