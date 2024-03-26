<?php

namespace App\Controller;

use App\Entity\Product;
use App\Form\ProductType;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use App\Serializer\UploadedFileDenormalizer;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\String\Slugger\SluggerInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;

#[ApiResource]
#[Route('/product')]
class ProductController extends AbstractController
{
    #[Route('/', name: 'app_product_index', methods: ['GET'])]
    public function index(ProductRepository $productRepository): Response
    {
        return $this->render('product/index.html.twig', [
            'products' => $productRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_product_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager, SluggerInterface $slugger): Response
    {

        $product = new Product();
        $form = $this->createForm(ProductType::class, $product);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($product);
            $entityManager->flush();

            return $this->redirectToRoute('app_product_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('product/new.html.twig', [
            'product' => $product,
            'form' => $form,
        ]);
    }


    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product): Response
    {
        return $this->render('product/show.html.twig', [
            'product' => $product,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_product_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Product $product, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(ProductType::class, $product);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_product_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('product/edit.html.twig', [
            'product' => $product,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_product_delete', methods: ['POST'])]
    public function delete(Request $request, Product $product, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$product->getId(), $request->request->get('_token'))) {
            $entityManager->remove($product);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_product_index', [], Response::HTTP_SEE_OTHER);
    }

    
    // #[Route('/upload', name: 'upload', methods: ['POST'])]
    // public function upload(Request $request): JsonResponse
    // {
    //     // Verificar si se ha enviado un archivo
    //     $uploadedFile = $request->files->get('file');

    //     // Si no se ha enviado un archivo, devolver una respuesta de error
    //     if (!$uploadedFile) {
    //         return new JsonResponse(['error' => 'No se ha enviado ningún archivo'], JsonResponse::HTTP_BAD_REQUEST);
    //     }

    //     // Hacer algo con el archivo, por ejemplo, guardar en el sistema de archivos o en la base de datos
    //     // Aquí simplemente imprimimos el nombre del archivo y su tamaño
    //     $fileName = $uploadedFile->getClientOriginalName();
    //     $fileSize = $uploadedFile->getSize();

    //     // Ejemplo de lógica adicional: guardar el archivo en el sistema de archivos
    //     $destination = $this->getParameter('kernel.project_dir') . '/public/uploads';
    //     $uploadedFile->move($destination, $fileName);

    //     // Ejemplo de lógica adicional: guardar el archivo en la base de datos
    //     // Aquí puedes llamar a un servicio o hacer cualquier otra operación que necesites

    //     // Devolver una respuesta exitosa
    //     return new JsonResponse(['message' => 'Archivo subido correctamente', 'file_name' => $fileName, 'file_size' => $fileSize], JsonResponse::HTTP_OK);
    // }


  
}
