<?php

namespace App\Pagination;

use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\AdapterInterface;
use Pagerfanta\Adapter\DoctrineORMAdapter;

abstract class DoctrineORMAdapterDecorator implements AdapterInterface
{
    protected $adapter;

    public function __construct(DoctrineORMAdapter $adapter)
    {
        $this->adapter = $adapter;
    }

    /**
     * Returns the query
     *
     * @return Query @api
     */
    public function getQuery()
    {

        return $this->adapter->getQuery();
    }

    /**
     * Returns whether the query joins a collection.
     *
     * @return Boolean Whether the query joins a collection.
     */
    public function getFetchJoinCollection()
    {

        return $this->adapter->getFetchJoinCollection();
    }

    /**
     * {@inheritdoc}
     */
    public function getNbResults()
    {

        return $this->adapter->getNbResults();
    }

    /**
     * {@inheritdoc}
     */
    public function getSlice($offset, $length)
    {

        return $this->adapter->getSlice($offset, $length);
    }
} 
