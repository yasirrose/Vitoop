<?php
namespace App\Controller;

use App\Repository\RelResourceResourceRepository;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use App\Entity\RelResourceResource;

/**
 * @Route("api/rrr")
 */
class RelResourceResourceApiController extends ApiController
{
    /**
     * @Route("/{relID}/coefficient", name="edit_coefficient", methods={"POST"})
     * @ParamConverter("rel", class="App\Entity\RelResourceResource", options={"id" = "relID"})
     *
     * @return array
     */
    public function editCoefficient(
        RelResourceResource $rel,
        Request $request,
        SerializerInterface $serializer,
        RelResourceResourceRepository $relResourceResourceRepository
    ) {
        $coefficient = $serializer->deserialize($request->getContent(), 'array', 'json');
        $coefficient = $coefficient['value'];
        if ($coefficient < 0) {
            $response = array('success' => false, 'message' => 'Coefficient cannot be negative!');
        } else {
            $rel->setCoefficient($coefficient);
            $relResourceResourceRepository->add($rel);
            $relResourceResourceRepository->save();

            $response = array('success' => true, 'message' => 'Coefficient updated!');
        }

        return $this->getApiResponse($response);
    }
}
