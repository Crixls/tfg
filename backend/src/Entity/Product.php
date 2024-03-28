<?php

namespace App\Entity;

use Symfony\Component\HttpFoundation\File\File;
use App\Repository\ProductRepository;
use App\Controller\CreateImagePublicationController;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Entity\Product;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\OpenApi\Model;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use ApiPlatform\Metadata\Post; // Agregar esta línea
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;



#[ApiResource(
   
    operations: [
        new Get(),
        new GetCollection(),
        new Post(),
        new Put(),
        new Delete(),
        new Post(
            normalizationContext: ['groups' => ['product:read']], 
            name: 'productsImage',
            types: ['https://schema.org/Product'],
            uriTemplate: '/products/image', 
            controller: CreateImagePublicationController::class, 
            deserialize: false, 
            validationContext: ['groups' => ['Default', 'product_create']], 
            openapi: new Model\Operation(
                requestBody: new Model\RequestBody(
                    content: new \ArrayObject([
                        'multipart/form-data' => [
                            'schema' => [
                                'type' => 'object', 
                                'properties' => [
                                    'file' => [
                                        'type' => 'string', 
                                        'format' => 'binary'
                                    ]
                                ]
                            ]
                        ]
                    ])
                )
            )
        )
    ]
)]
#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $description = null;

    #[ORM\Column]
    private ?float $price = null;

    #[Vich\UploadableField(mapping: 'products', fileNameProperty: 'imageName', size:"imageSize")]
    #[Assert\NotNull(groups: ['product_create'])]
    private ?File $imageFile = null;


    #[ORM\Column(nullable: true)]
    private ?string $imageName = null;

    #[ORM\Column(nullable: true)]
    private ?string $imageSize = null;
    

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $size = [];

    #[ORM\Column(length: 255)]
    private ?string $brand = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $category = null;

    #[ORM\Column]
    private ?int $new = null;


    
    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups(['product:read'])]
    public ?string $contentUrl = null;

    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $color = [];


    #[ORM\Column(type: 'json', nullable: true)]
    private ?array $deporte = [];

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updateAt = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $path = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getSize(): ?array
    {
        return $this->size;
    }

    public function setSize(?array $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getCategory(): ?string
    {
        return $this->category;
    }

    public function setCategory(?string $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getNew(): ?int
    {
        return $this->new;
    }

    public function setNew(int $new): static
    {
        $this->new = $new;

        return $this;
    }

    public function getColor(): ?array
    {
        return $this->color;
    }

    public function setColor(?array $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getDeporte(): ?array
    {
        return $this->deporte;
    }

    public function setDeporte(?array $deporte): static
    {
        $this->deporte = $deporte;

        return $this;
    }

    public function setImageFile(?File $imageFile = null): void
    {
        $this->imageFile = $imageFile;

        if (null !== $imageFile) {
             // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
             $this->updatedAt = new \DateTimeImmutable();
        }
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function getUpdateAt(): ?\DateTimeImmutable
    {
        return $this->updateAt;
    }

    public function setUpdateAt(?\DateTimeImmutable $updateAt): static
    {
        $this->updateAt = $updateAt;

        return $this;
    }

    public function setImageSize(?int $imageSize): void
    {
        $this->imageSize = $imageSize;
    }

    public function getImageSize(): ?int
    {
        return $this->imageSize;
    }

    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function getPath(): ?string
    {
        return $this->path;
    }

    public function setPath(?string $path): static
    {
        $this->path = $path;

        return $this;
    }

    public function getContentUrl(): ?string
    {
        return $this->contentUrl;
    }

    public function setContentUrl(?string $contentUrl): void
    {
        $this->contentUrl = $contentUrl;
    }



   
}
