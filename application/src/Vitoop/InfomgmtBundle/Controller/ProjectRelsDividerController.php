<?php
namespace Vitoop\InfomgmtBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Vitoop\InfomgmtBundle\DTO\Resource\DividerDTO;
use Vitoop\InfomgmtBundle\Entity\ProjectRelsDivider;
use JMS\Serializer\DeserializationContext;
use Vitoop\InfomgmtBundle\Entity\Project;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Vitoop\InfomgmtBundle\Repository\ProjectRelsDividerRepository;
use Vitoop\InfomgmtBundle\Response\Json\ErrorResponse;
use Vitoop\InfomgmtBundle\Service\ProjectDividerChanger;

/**
 * @Route("api/project/{projectID}/divider")
 * @ParamConverter("project", class="Vitoop\InfomgmtBundle\Entity\Project", options={"id" = "projectID"})
 */
class ProjectRelsDividerController extends ApiController
{
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var ProjectRelsDividerRepository
     */
    private $projectRelsDividerRepository;

    /**
     * ProjectRelsDividerController constructor.
     * @param ValidatorInterface $validator
     * @param ProjectRelsDividerRepository $projectRelsDividerRepository
     */
    public function __construct(
        ValidatorInterface $validator,
        ProjectRelsDividerRepository $projectRelsDividerRepository
    ) {
        $this->validator = $validator;
        $this->projectRelsDividerRepository = $projectRelsDividerRepository;
    }

    /**
     * @Route("", name="get_dividers", methods={"GET"})
     *
     * @return array
     */
    public function getDividers(Project $project, ProjectRelsDividerRepository $dividerRepository)
    {
        if (!$project->getProjectData()->availableForReading($this->get('vitoop.vitoop_security')->getUser())) {
            throw new AccessDeniedHttpException;
        }
        $dividers = $dividerRepository->findProjectDividerDTO($project->getProjectData()->getId());

        $divResult = [];
        /**
         * @var DividerDTO $divider
         */
        foreach ($dividers as $divider) {
            $divResult[(string)$divider->coefficient] = $divider;
        }

        return $this->getApiResponse($divResult);
    }

    /**
     * @Route("", name="add_or_edit_divider", methods={"POST"})
     *
     * @return array
     */
    public function addOrEditDivider(Project $project, Request $request, ProjectDividerChanger $projectDividerChanger)
    {
        if (!$project->getProjectData()->availableForWriting($this->get('vitoop.vitoop_security')->getUser())) {
            throw new AccessDeniedHttpException;
        }

        /**
         * @var DividerDTO $dto
         */
        $dto = $this->getDTOFromRequest($request, DividerDTO::class);
        $dto->projectDataId = $project->getProjectData()->getId();

        $dividerOrigin = $this->projectRelsDividerRepository->findOneBy(
            array('projectData' => $project->getProjectData(), 'coefficient' => $dto->coefficient)
        );
        if ($dividerOrigin) {
            $dto->id = $dividerOrigin->getId();
        }

        $projectDividerChanger->removeDividerWithoutRelatedRecords(
            $project->getId(),
            $dto->projectDataId,
            $dto->coefficient
        );
        $errors = $this->validator->validate($dto);
        if (count($errors) > 0) {
            return $this->getApiResponse(ErrorResponse::createFromValidator($errors), 400);
        }

        if (null === $dividerOrigin) {
            $dividerOrigin = ProjectRelsDivider::create($project->getProjectData(), $dto);
        } else {
            $oldCoeff = $dividerOrigin->getCoefficient();
            $dividerOrigin->updateFromDTO($dto);
            $projectDividerChanger->changeRelatedCoefficients($project->getId(), $oldCoeff, $dto->coefficient);
        }
        $this->projectRelsDividerRepository->save($dividerOrigin);

        return $this->getApiResponse(['success' => true, 'message' => 'Divider updated!']);
    }
}
