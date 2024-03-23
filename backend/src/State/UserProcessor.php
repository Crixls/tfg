<?php
// api/src/State/UserProcessor.php

namespace App\State;

use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

/**
 * @implements ProcessorInterface<User, User|void>
 */
final class UserProcessor implements ProcessorInterface
{
    private $userPasswordHasher;

    public function __construct(
        #[Autowire(service: 'api_platform.doctrine.orm.state.persist_processor')]
        private ProcessorInterface $persistProcessor,
        #[Autowire(service: 'api_platform.doctrine.orm.state.remove_processor')]
        private ProcessorInterface $removeProcessor,
        UserPasswordHasherInterface $userPasswordHasher,
    )
    {
        $this->userPasswordHasher = $userPasswordHasher;
    }

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User|null
    {
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }
        $plainPassword = $data->getPassword();
        $hashedPasword = $this->userPasswordHasher->hashPassword(
            $data,
            $plainPassword
        );
        $data->setPassword($hashedPasword);
        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);

        return $result;
    }

}



// <?php
// // api/src/State/UserPasswordHasher.php

// namespace App\State;

// use ApiPlatform\Metadata\Operation;
// use ApiPlatform\State\ProcessorInterface;
// use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
// use App\Entity\User;


// /**
//  * @implements ProcessorInterface<User, User|void>
//  */
// final readonly class UserPasswordHasher implements ProcessorInterface
// {
//     public function __construct(
//         private ProcessorInterface $processor,
//         private UserPasswordHasherInterface $passwordHasher
//     )
//     {
//     }

//     /**
//      * @param User $data
//      */
//     public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User|null
//     {
//         if (!$data->getPlainPassword()) {
//             return $this->processor->process($data, $operation, $uriVariables, $context);
//         }

//         $hashedPassword = $this->passwordHasher->hashPassword(
//             $data,
//             $data->getPlainPassword()
//         );
//         $data->setPassword($hashedPassword);
//         $data->eraseCredentials();

//         return $this->processor->process($data, $operation, $uriVariables, $context);
//     }
// }