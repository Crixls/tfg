# Despliegue de la aplicación STREET PULSE

## 1. Primer paso es instalar docker

- Actualizar los paquetes:

sudo apt update

- Instalar paquetes necesarios para que apt pueda usar un repositorio sobre HTTPS:

sudo apt install apt-transport-https ca-certificates curl software-properties-common

- Añadir la clave GPG del repositorio oficial de Docker:

curl -fsSL <https://download.docker.com/linux/ubuntu/gpg> | sudo apt-key add –

- Añadir el repositorio de Docker a las fuentes de APT:

sudo add-apt-repository “deb [arch=amd64] <https://download.docker.com/linux/ubuntu> $(lsb_release -cs) stable”

- Volver a actualizar los paquetes:

sudo apt update

- Instalar Docker:

sudo apt install docker-ce

- Comprobar la versión de Docker:

sudo docker –version

- Añadir el usuario al grupo de Docker:

sudo usermod -aG docker $USER

## 2. Segundo paso es instalar composer

- Actualizar los paquetes:

sudo apt update

- Instalar Curl:

sudo apt install curl

- Descargar e instalar Composer:

sudo curl -sS <https://getcomposer.org/installer> | sudo php – --install-dir=/usr/local/bin --filename=composer

- Instalar Composer:

sudo apt install composer

- Comprobar la versión de Composer:

composer –version

- Instalar Docker Compose:

sudo apt install docker-compose

- Clonar el repositorio del proyecto:

git clone <https://github.com/Crixls/tfg.git>

- Cambiar al directorio del proyecto:

cd tfg/

- Levantar los servicios con Docker Compose:

sudo docker-compose up --build
