<?php
namespace App\Service;

use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\String\Slugger\SluggerInterface;

class FileUploader
{
    public function __construct(
        private string $targetDirectory,
        private SluggerInterface $slugger,
    ) {
    }

    public function upload(UploadedFile $image): string
    {
        $originalImagename = pathinfo($image->getClientOriginalName(), PATHINFO_FILENAME);
        $safeImagename = $this->slugger->slug($originalImagename);
        $imageName = $safeImagename.'-'.uniqid().'.'.$image->guessExtension();

        try {
            $image->move($this->getTargetDirectory(), $imageName);
        } catch (FileException $e) {
            echo 'Error durante la subida del archivo: ' . $e->getMessage();
        }

        return $imageName;
    }

    public function getTargetDirectory(): string
    {
        return $this->targetDirectory;
    }
}

?>