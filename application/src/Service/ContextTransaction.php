<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class ContextTransaction
{
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * ContextTransaction constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @inheritdoc
     */
    public function run(callable $function, array $params)
    {
        $this->entityManager->beginTransaction();
        try {
            $result = call_user_func_array($function, $params);
            $this->entityManager->commit();

            return $result ?: true;
        } catch (\Exception $ex) {
            $this->entityManager->rollback();
            throw $ex;
        }
    }
}
