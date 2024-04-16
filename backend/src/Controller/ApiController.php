<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use App\Entity\User;
use App\Entity\Product;
use Symfony\Component\Security\Core\User\UserInterface;



use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ApiController extends AbstractController
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    #[Route('/productstodos', name: 'app_get_products_todos', methods: ['GET'])]
    public function getProductsTotales(ProductRepository $productRepository, SerializerInterface $serializerInterface): Response
    {

        $cuentas = $productRepository->findAll();

        $cuentasConTotales = [];

        foreach ($cuentas as $cuenta) {
            $cuentasConTotales[] = [
                'id' => $cuenta->getId(),
                'name' => $cuenta->getName(),
                'description' => $cuenta->getDescription(),
                'image' => $cuenta->getContentUrl(), // Agregar la ruta base al nombre de la imagen
                'price' => $cuenta->getPrice(), 
                'size' => $cuenta->getSize(), 
                'brand' => $cuenta->getBrand(), 
                'category' => $cuenta->getCategory(), 
                'new' => $cuenta->getNew(), 
            ];
        }

        

        $data = $serializerInterface->serialize($cuentasConTotales, 'json');

        return new JsonResponse($data, 200, [
            'Content-Type' => 'application/json',
        ], true);
    }

    #[Route('/getallusers', name: 'app_get_users_todos', methods: ['GET'])]
    public function getUserInfo(UserRepository $userRepository, SerializerInterface $serializerInterface): Response
    {

        $cuentas = $userRepository->findAll();

        $cuentasConTotales = [];

        foreach ($cuentas as $cuenta) {
            $cuentasConTotales[] = [
                'id' => $cuenta->getId(),
                'username' => $cuenta->getUsername(),
                'roles' => $cuenta->getRoles(),
                'password' => $cuenta->getPassword(), // Agregar la ruta base al nombre de la imagen
                'email' => $cuenta->getEmail()
            ];
        }

        

        $data = $serializerInterface->serialize($cuentasConTotales, 'json');

        return new JsonResponse($data, 200, [
            'Content-Type' => 'application/json',
        ], true);
    }

    #[Route('/getallusers/{id}', name:'app_get_cuenta', methods: ['PUT'])]
    public function showCuenta(User $user, SerializerInterface $serializerInterface)
    {
       
        $response =  $serializerInterface->serialize([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'roles' => $user->getRoles(),
            'password' => $user->getPassword(), // Agregar la ruta base al nombre de la imagen
            'email' => $user->getEmail()
        ], 'json');

        return new JsonResponse($response, 200, [
            'Content-Type' => 'application/json',
        ], true);
    }

    // #[Route('/api/getuser', name: 'app_get_user_info', methods: ['GET'])]
    // public function getUser(SerializerInterface $serializerInterface, JWTTokenManagerInterface $jwtManagerInterface, TokenStorageInterface $tokenStorageInterface, UserRepository $userRepository): Response
    // {
    //     $decodedToken = $jwtManagerInterface->decode($tokenStorageInterface->getToken());
    //     // Obtener el username del usuario desde el token decodificado
    //     $username = $decodedToken['username'];
    //     // Buscar el usuario en la base de datos usando el username obtenido
    //     $user = $userRepository->findOneBy(['username' => $username]);
    //     // Devolver los datos del usuario en la respuesta HTTP
    //     $response =  $serializerInterface->serialize([
    //         'username' => $user->getUsername(),
    //         'id' => $user->getId(),
    //     ], 'json');
 
    //     return new JsonResponse($response, 200, [
    //         'Content-Type' => 'application/json',
    //     ], true);
    // }
    

    #[Route('/productsfinales', name: 'create_product', methods: ['POST'])]
    public function createProduct(Request $request): JsonResponse
    {
        // Obtener los datos del formulario directamente del objeto Request
        $data = $request->request->all();
    
        // Obtener el archivo enviado
        $imageFile = $request->files->get('imageFile');
    
        // Crear una nueva instancia de Product
        $product = new Product();
        $product->setName($data['name']);
        $product->setDescription($data['description']);
        $product->setPrice($data['price']);
        // Aquí puedes manejar el archivo, por ejemplo, guardarlo en el sistema de archivos
        // O configurar la propiedad del producto que corresponde al archivo, dependiendo de tu lógica de negocios
        $product->setImageFile($imageFile); 
        // Añadir lógica para configurar otras propiedades del producto según sea necesario
        $product->setSize(json_decode($data['size'], true)); // Si 'size' es un array, debes decodificarlo
        $product->setBrand($data['brand']);
        $product->setCategory($data['category']);
        $product->setNew($data['new']);
        $product->setColor(json_decode($data['color'], true)); // Si 'color' es un array, debes decodificarlo
        $product->setDeporte(json_decode($data['deporte'], true)); // Si 'deporte' es un array, debes decodificarlo
        
        // Guardar el producto en la base de datos
        $this->entityManager->persist($product);
        $this->entityManager->flush();
    
        // Devolver una respuesta JSON con los datos del producto creado
        return new JsonResponse(['id' => $product->getId()], 200);
    }



    #[Route('/productazo/{id}', name: 'edit_product', methods: ['PUT'])]
    public function editProduct(Request $request, $id): JsonResponse
    {
        // Obtener el producto existente por su ID
        $product = $this->entityManager->getRepository(Product::class)->find($id); 

        
        // Si no se encuentra el producto, devolver una respuesta 404
        if (!$product) {
            return new JsonResponse(['message' => 'Product not found'], 404);
        }

        // Obtener los datos enviados en la solicitud como JSON
        $requestData = json_decode($request->getContent(), true);

        // Actualizar las propiedades del producto con los datos recibidos en la solicitud
        // Solo actualizar si los campos están presentes en los datos enviados
        if (isset($requestData['name'])) {
            $product->setName($requestData['name']);
        }
        if (isset($requestData['description'])) {
            $product->setDescription($requestData['description']);
        }
        if (isset($requestData['price'])) {
            $product->setPrice($requestData['price']);
        }
        if (isset($requestData['size'])) {
            $product->setSize($requestData['size']);
        }
        if (isset($requestData['brand'])) {
            $product->setBrand($requestData['brand']);
        }
        if (isset($requestData['category'])) {
            $product->setCategory($requestData['category']);
        }
        if (isset($requestData['new'])) {
            $product->setNew($requestData['new']);
        }
        if (isset($requestData['color'])) {
            $product->setColor($requestData['color']);
        }
        if (isset($requestData['deporte'])) {
            $product->setDeporte($requestData['deporte']);
        }

        // Manejar el archivo de imagen, si se envió
        $imageFile = $request->files->get('imageFile');
        if ($imageFile) {
            $product->setImageFile($imageFile);
        }

        // Añadir lógica para configurar otras propiedades del producto según sea necesario

        // Guardar los cambios en la base de datos
        $this->entityManager->flush();

        // Devolver una respuesta JSON con los datos del producto actualizado
        return new JsonResponse(['message' => 'Product updated successfully'], 200);
    }

    


    
}
