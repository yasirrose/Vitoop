<?php

namespace App\Service;

use PhpImap\IncomingMailAttachment;
use PhpImap\Mailbox;
use PhpImap\Exceptions\ConnectionException;
use App\Exception\Email\ConnectionException as AppConnectionException;

class EmailReceiver
{
    const EXPORT_FILE_NAME = 'vitoop_export.json';

    /**
     * @var string
     */
    private $mailUrl;

    /**
     * @var string
     */
    private $mailUser;

    /**
     * @var string
     */
    private $mailPassword;

    public function __construct(string $mailUrl, string $mailUser, string $mailPassword)
    {
        $this->mailUrl = $mailUrl;
        $this->mailUser = $mailUser;
        $this->mailPassword = $mailPassword;
    }

    public function getImportMails(): array
    {
        $mailContents = [];
        if (empty($this->mailUrl)) {
            throw new AppConnectionException("Empty Email config. Please set email settings into .env");
        }

        $mailbox = new Mailbox($this->mailUrl, $this->mailUser, $this->mailPassword);
        try {
            // Get all emails (messages)
            // PHP.net imap_search criteria: http://php.net/manual/en/function.imap-search.php
            $mailsIds = $mailbox->searchMailbox('UNSEEN');
        } catch(ConnectionException $ex) {
            throw new AppConnectionException("IMAP connection failed: " . $ex->getMessage());
        }

        foreach ($mailsIds as $mailsId) {
            $mail = $mailbox->getMail($mailsId);
            if (!$mail->hasAttachments()) {
                continue;
            }
            $attachments = $mail->getAttachments();
            /** @var IncomingMailAttachment $attachment */
            foreach ($attachments as $attachment) {
                if (self::EXPORT_FILE_NAME === $attachment->name) {
                    $mailContents[] = $attachment->getContents();
                }
            }
        }

        return $mailContents;
    }
}
