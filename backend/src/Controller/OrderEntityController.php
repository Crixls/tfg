<?php

namespace App\Controller;

use App\Entity\OrderEntity;
use App\Form\OrderEntityType;
use App\Repository\OrderEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/order/entity')]
class OrderEntityController extends AbstractController
{
    #[Route('/', name: 'app_order_entity_index', methods: ['GET'])]
    public function index(OrderEntityRepository $orderEntityRepository): Response
    {
        return $this->render('order_entity/index.html.twig', [
            'order_entities' => $orderEntityRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_order_entity_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $orderEntity = new OrderEntity();
        $form = $this->createForm(OrderEntityType::class, $orderEntity);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($orderEntity);
            $entityManager->flush();

            return $this->redirectToRoute('app_order_entity_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('order_entity/new.html.twig', [
            'order_entity' => $orderEntity,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_order_entity_show', methods: ['GET'])]
    public function show(OrderEntity $orderEntity): Response
    {
        return $this->render('order_entity/show.html.twig', [
            'order_entity' => $orderEntity,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_order_entity_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, OrderEntity $orderEntity, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(OrderEntityType::class, $orderEntity);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_order_entity_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('order_entity/edit.html.twig', [
            'order_entity' => $orderEntity,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_order_entity_delete', methods: ['POST'])]
    public function delete(Request $request, OrderEntity $orderEntity, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$orderEntity->getId(), $request->request->get('_token'))) {
            $entityManager->remove($orderEntity);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_order_entity_index', [], Response::HTTP_SEE_OTHER);
    }
}
