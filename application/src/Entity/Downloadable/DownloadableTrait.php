<?php

namespace App\Entity\Downloadable;

use Doctrine\ORM\Mapping as ORM;

trait DownloadableTrait
{
    /**
     * @ORM\Column(name="is_downloaded", type="smallint", options={"default" = 0})
     *
     * 0 = Not downloaded still
     * 1 = Downloaded on server
     * 5 = Wrong url
     * 2 = Blank html
     * code = Download error (404 or something else)
     */
    protected $isDownloaded;

    /**
     * @ORM\Column(name="downloaded_at", type="datetime", nullable=true, options={"default" = null})
     */
    protected $downloadedAt;

    public function markAsWrongUrl()
    {
        $this->isDownloaded = DownloadableInterface::STATUS_WRONG;
    }

    public function markAsBlankHtml()
    {
        $this->isDownloaded = DownloadableInterface::STATUS_BLANK_HTML;
    }

    public function markAsSuccess()
    {
        $this->isDownloaded = DownloadableInterface::STATUS_DOWNLOADED;
        $this->downloadedAt = new \DateTime();
    }

    public function markAsNotDownloaded()
    {
        $this->isDownloaded = DownloadableInterface::STATUS_NOT_DOWNLOADED;
        $this->downloadedAt = null;
    }


    /**
     * Get isDownloaded
     *
     * @return integer 
     */
    public function getIsDownloaded()
    {
        return $this->isDownloaded;
    }


    /**
     * Get downloadedAt
     *
     * @return \DateTime 
     */
    public function getDownloadedAt()
    {
        return $this->downloadedAt;
    }

    public function isSuccessDownloaded(): bool
    {
        return self::STATUS_DOWNLOADED === $this->isDownloaded;
    }

    public function isBlankHtml(): bool
    {
        return self::STATUS_BLANK_HTML === $this->isDownloaded;
    }
}
