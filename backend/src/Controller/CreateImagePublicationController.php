<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

use App\Entity\Product;
use Symfony\Component\Routing\Attribute\Route;
use ApiPlatform\Metadata\Post;

#[AsController]
class CreateImagePublicationController extends AbstractController
{
    public function __invoke(Request $request): Product
    {
        $uploadedFile = $request->files->get('imageFile');
        if (!$uploadedFile) {
            throw new BadRequestHttpException('"imageFile" is required');
        }

        $productObject = new Product();
        $productObject->setName($request->request->get('name'));
        $productObject->setDescription($request->request->get('description'));
        $productObject->setPrice($request->request->get('price'));
        $productObject->setImageFile($request->files->get('imageFile'));
        $productObject->setSize($request->request->get('size'));
        $productObject->setBrand($request->request->get('brand'));
        $productObject->setNew($request->request->get('new'));
        $productObject->setCategory($request->request->get('category'));
        $productObject->setColor($request->request->get('color'));
        $productObject->setDeporte($request->request->get('deporte'));
        $productObject->setUpdateAt(new \DateTimeImmutable());

        return $productObject;
    }
}

