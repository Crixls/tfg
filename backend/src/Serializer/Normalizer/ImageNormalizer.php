<?php

namespace App\Serializer\Normalizer;

use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class ImageNormalizer implements NormalizerInterface
{
    public function __construct(
        #[Autowire(service: 'serializer.normalizer.object')]
        private NormalizerInterface $normalizer,
        private StorageInterface $storage
    ) {
    }

    public function normalize($product, ?string $format = null, array $context = []): array
    {
        $product->setPath($this->storage->resolveUri($product,'imageFile'));
        $data = $this->normalizer->normalize($product, $format, $context);

        // TODO: add, edit, or delete some data

        return $data;
    }

    public function supportsNormalization($data, ?string $format = null, array $context = []): bool
    {
        // TODO: return $data instanceof Object
    }

    public function getSupportedTypes(?string $format): array
    {
        // TODO: return [Object::class => true];
    }
}
