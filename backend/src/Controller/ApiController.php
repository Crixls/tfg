<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use App\Repository\UserRepository;
use App\Entity\User;


use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class ApiController extends AbstractController
{
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

    // #[Route('/getuserinfo', name: 'app_get_user_info', methods: ['POST'])]
    // public function getUserInfo(SerializerInterface $serializerInterface, JWTTokenManagerInterface $jwtManagerInterface, TokenStorageInterface $tokenStorageInterface, UserRepository $userRepository): Response
    // {
    //     $decodedToken = $jwtManagerInterface->decode($tokenStorageInterface->getToken());
        
    //     // Verificar si la clave 'username' existe en el token decodificado
    //     if (isset($decodedToken['username'])) {
    //         // Obtener el username del usuario desde el token decodificado
    //         $username = $decodedToken['username'];
    //         // Buscar el usuario en la base de datos usando el username obtenido
    //         $user = $userRepository->findOneBy(['username' => $username]);
    //         // Devolver los datos del usuario en la respuesta HTTP
    //         $response =  $serializerInterface->serialize([
    //             'username' => $user->getUsername(),
    //             'roles' => $user->getRoles(),
    //             'email' => $user->getEmail(),
    //             'password' => $user->getPassword(),
    //             'id' => $user->getId(),
    //             // 'decodedToken' => $decodedToken, // Añadir el token decodificado a la respuesta
    //         ], 'json');
            
    //         return new JsonResponse($response, 200, [
    //             'Content-Type' => 'application/json',
    //         ], true);
    //     } else {
    //         // Manejar el caso en el que la clave 'username' no existe en el token decodificado
    //         // Por ejemplo, devolver un error o una respuesta apropiada
    //         return new JsonResponse(['error' => 'Username not found in token'], 400);
    //     }
    // }
    

   
    

    
}
