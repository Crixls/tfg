<?php

namespace App\Entity;

use App\Repository\OrderLineRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;


#[ApiResource]
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

    #[ORM\Column(nullable: true)]
    private ?int $unit_size = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $unit_color = null;

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

    public function getUnitSize(): ?int
    {
        return $this->unit_size;
    }

    public function setUnitSize(?int $unit_size): static
    {
        $this->unit_size = $unit_size;

        return $this;
    }

    public function getUnitColor(): ?string
    {
        return $this->unit_color;
    }

    public function setUnitColor(?string $unit_color): static
    {
        $this->unit_color = $unit_color;

        return $this;
    }
}
