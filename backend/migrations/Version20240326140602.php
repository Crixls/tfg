<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240326140602 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product CHANGE size size INT NOT NULL, CHANGE color color VARCHAR(255) DEFAULT NULL, CHANGE deporte deporte VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE product CHANGE size size JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', CHANGE color color JSON DEFAULT NULL COMMENT \'(DC2Type:json)\', CHANGE deporte deporte JSON DEFAULT NULL COMMENT \'(DC2Type:json)\'');
    }
}
