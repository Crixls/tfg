<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;

class PutImageController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/products/{id}', name: 'put_image_product', methods: ['PUT'])]
    public function __invoke(Request $request, $id): JsonResponse
    {
        // Buscar el producto por su ID
        $product = $this->entityManager->getRepository(Product::class)->find($id);

        // Si no se encuentra el producto, lanzar una excepción 404
        if (!$product) {
            throw new NotFoundHttpException('Producto no encontrado');
        }

        // Actualizar los campos del producto con los datos recibidos en la solicitud
        $product->setName($request->request->get('name'));
        $product->setDescription($request->request->get('description'));
        $product->setPrice($request->request->get('price'));
        $product->setSize($request->request->get('size'));
        $product->setBrand($request->request->get('brand'));
        $product->setNew($request->request->get('new'));
        $product->setCategory($request->request->get('category'));
        $product->setColor($request->request->get('color'));
        $product->setDeporte($request->request->get('deporte'));
        $product->setUpdatedAt(new \DateTimeImmutable());

        // Si se proporciona una imagen, actualizarla
        $uploadedFile = $request->files->get('imageFile');
        if ($uploadedFile) {
            $product->setImageFile($uploadedFile);
        }

        // Persistir los cambios en la base de datos
        $this->entityManager->flush();

        return new JsonResponse("Producto actualizado correctamente", JsonResponse::HTTP_OK);
    }
}
