<?php

namespace App\Entity;

use App\Repository\OrderLineRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: OrderLineRepository::class)]
class OrderLine
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;


    #[ORM\ManyToOne]
    private ?Product $product = null;

    #[ORM\Column]
    private ?int $amount = null;

    #[ORM\Column]
    private ?float $unit_price = null;

    #[ORM\ManyToOne]
    private ?OrderEntity $orderentity = null;

    public function getId(): ?int
    {
        return $this->id;
    }


    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

        return $this;
    }

    public function getAmount(): ?int
    {
        return $this->amount;
    }

    public function setAmount(int $amount): static
    {
        $this->amount = $amount;

        return $this;
    }

    public function getUnitPrice(): ?float
    {
        return $this->unit_price;
    }

    public function setUnitPrice(float $unit_price): static
    {
        $this->unit_price = $unit_price;

        return $this;
    }

    public function getOrderentity(): ?OrderEntity
    {
        return $this->orderentity;
    }

    public function setOrderentity(?OrderEntity $orderentity): static
    {
        $this->orderentity = $orderentity;

        return $this;
    }
}
