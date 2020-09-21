<?php
namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

class Test
{
    protected $id;

    protected $testvar1;

    protected $testvar2;

    public function __toString()
    {
        return '___testObject___';
    }

    public function __construct()
    {
        $this->id = '42';
        $this->testvar1 = 'TEST_STRING_1';
        $this->testvar2 = '1234567890';
        $this->tags = new ArrayCollection();
    }

    /**
     * @return the $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return the $testvar1
     */
    public function getTestvar1()
    {
        return $this->testvar1;
    }

    /**
     * @return the $testvar2
     */
    public function getTestvar2()
    {
        return $this->testvar2;
    }

    /**
     * @param field_type $id
     */
    public function setId($id)
    {
        $this->id = $id;
    }

    /**
     * @param string $testvar1
     */
    public function setTestvar1($testvar1)
    {
        $this->testvar1 = $testvar1;
    }

    /**
     * @param string $testvar2
     */
    public function setTestvar2($testvar2)
    {
        $this->testvar2 = $testvar2;
    }

    protected $tags;

    public function addTag($tag)
    {
        $this->tags[] = $tag;
    }

    public function getTags()
    {
        return $this->tags;
    }
}