<?php

namespace App\DTO\Links;

use Symfony\Component\Validator\Constraints as Assert;

class SendLinksDTO
{
    /**
     * @Assert\NotBlank()
     * @Assert\Email()
     */
    public $email;

    /**
     * @Assert\NotBlank()
     */
    public $emailSubject;

    public $textBody;

    public $resourceIds;

    /**
     * @return mixed
     */
    public function getResourceIds()
    {
        return explode(',', $this->resourceIds);
    }
}
