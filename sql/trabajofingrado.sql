-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-05-2024 a las 20:52:57
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `trabajofingrado`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240318124000', '2024-03-18 13:40:07', 29),
('DoctrineMigrations\\Version20240319150852', '2024-03-19 16:08:55', 41),
('DoctrineMigrations\\Version20240319210105', '2024-03-19 22:01:12', 85),
('DoctrineMigrations\\Version20240320085211', '2024-03-20 09:52:17', 86),
('DoctrineMigrations\\Version20240326132717', '2024-03-26 14:30:17', 89),
('DoctrineMigrations\\Version20240326140602', '2024-03-26 15:06:08', 121),
('DoctrineMigrations\\Version20240326152452', '2024-03-26 16:25:17', 73),
('DoctrineMigrations\\Version20240328134755', '2024-03-28 14:48:01', 150);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorite`
--

CREATE TABLE `favorite` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `favorite`
--

INSERT INTO `favorite` (`id`, `user_id`, `product_id`) VALUES
(96, 19, 55),
(97, 3, 55),
(103, 3, 100),
(104, 3, 68),
(106, 3, 74),
(107, 3, 45),
(110, 3, 103),
(111, 3, 67),
(113, 88, 44),
(115, 88, 66),
(116, 88, 43),
(118, 88, 53),
(119, 88, 77),
(120, 88, 75),
(121, 88, 47);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `state` int(11) NOT NULL,
  `total` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_entity`
--

CREATE TABLE `order_entity` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `date` datetime NOT NULL,
  `state` int(11) NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `order_entity`
--

INSERT INTO `order_entity` (`id`, `user_id`, `date`, `state`, `total`) VALUES
(5, 3, '2024-04-10 21:33:25', 1, 1068),
(16, 19, '2024-03-29 12:01:29', 1, 84),
(140, 12, '2024-03-29 13:57:00', 0, 0),
(141, 53, '2024-04-15 18:02:43', 0, 0),
(142, 53, '2024-04-15 18:02:50', 0, 0),
(143, 54, '2024-04-15 18:40:08', 0, 0),
(145, 55, '2024-04-15 19:06:06', 0, 0),
(165, 3, '2024-04-26 06:23:23', 1, 65),
(166, 3, '2024-04-26 07:03:11', 1, 342),
(167, 64, '2024-05-01 10:32:11', 0, 0),
(168, 64, '2024-05-01 10:32:17', 0, 0),
(169, 3, '2024-05-08 10:50:20', 1, 483),
(170, 3, '2024-05-08 10:53:09', 1, 148),
(171, 3, '2024-05-08 10:53:11', 1, 749),
(172, 3, '2024-05-08 10:58:12', 1, 2289),
(173, 3, '2024-05-08 10:58:13', 1, 360),
(174, 19, '2024-05-17 00:00:00', 1, 1008),
(175, 3, '2024-05-16 00:00:00', 1, 98),
(176, 3, '2024-05-16 00:00:00', 1, 148),
(177, 3, '2024-05-16 00:00:00', 1, 180),
(178, 3, '2024-05-16 00:00:00', 1, 62),
(179, 3, '2024-05-16 00:00:00', 1, 592),
(181, 3, '2024-05-17 00:00:00', 1, 141),
(183, 3, '2024-05-17 00:00:00', 1, 166),
(184, 3, '2024-05-17 00:00:00', 1, 540),
(185, 3, '2024-05-17 00:00:00', 1, 444),
(186, 3, '2024-05-17 00:00:00', 1, 42),
(187, 3, '2024-05-17 00:00:00', 1, 118),
(188, 3, '2024-05-17 00:00:00', 1, 504),
(285, 19, '2024-05-18 00:00:00', 1, 450),
(286, 3, '2024-05-17 00:00:00', 1, 294),
(287, 3, '2024-05-17 00:00:00', 1, 785),
(289, 3, '2024-05-18 00:00:00', 1, 592),
(293, 19, '2024-05-18 17:14:53', 0, 0),
(297, 3, '2024-05-18 00:00:00', 1, 237),
(299, 3, '2024-05-18 00:00:00', 1, 972),
(301, 3, '2024-05-19 00:00:00', 1, 227),
(302, 3, '2024-05-19 00:00:00', 1, 42),
(303, 3, '2024-05-19 16:40:53', 0, 0),
(304, 88, '2024-05-19 00:00:00', 1, 374),
(305, 88, '2024-05-19 00:00:00', 1, 110),
(306, 88, '2024-05-19 00:00:00', 1, 241.44),
(307, 88, '2024-05-20 00:00:00', 1, 200),
(308, 88, '2024-05-20 00:00:00', 1, 324),
(309, 88, '2024-05-20 00:00:00', 1, 242.95),
(310, 88, '2024-05-20 00:00:00', 1, 422.85),
(311, 88, '2024-05-20 00:00:00', 1, 120),
(312, 88, '2024-05-20 00:00:00', 1, 294),
(313, 88, '2024-05-20 00:00:00', 1, 174),
(314, 88, '2024-05-20 00:00:00', 1, 492),
(315, 88, '2024-05-20 00:00:00', 1, 120),
(317, 88, '2024-05-20 00:00:00', 1, 170),
(318, 88, '2024-05-20 00:00:00', 1, 303),
(319, 88, '2024-05-20 00:00:00', 1, 64),
(320, 88, '2024-05-20 11:51:08', 0, 0),
(321, 88, '2024-05-20 11:51:24', 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_line`
--

CREATE TABLE `order_line` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `unit_price` double NOT NULL,
  `orderentity_id` int(11) DEFAULT NULL,
  `unit_size` int(11) DEFAULT NULL,
  `unit_color` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `order_line`
--

INSERT INTO `order_line` (`id`, `product_id`, `amount`, `unit_price`, `orderentity_id`, `unit_size`, `unit_color`) VALUES
(52, 42, 12, 59, 5, 36, 'azul'),
(56, 42, 34, 59, 165, 36, 'azul'),
(57, 43, 89, 74, 165, 40, 'blanco'),
(59, 44, 2, 97, 166, 40, 'azul'),
(61, 43, 2, 74, 166, 40, 'blanco'),
(64, 43, 2, 74, 170, 44, 'blanco'),
(71, 45, 1, 84, 16, 40, 'amarillo'),
(73, 43, 9, 74, 172, 44, 'blanco'),
(74, 55, 23, 52, 172, 42, 'rojo'),
(76, 102, 1, 89.95, 172, 16, 'naranja'),
(78, 45, 12, 84, 174, 39, 'amarillo'),
(79, 42, 6, 60, 173, 36, 'azul'),
(81, 44, 1, 98, 175, 48, 'rojo'),
(82, 43, 2, 74, 176, 40, 'blanco'),
(83, 51, 5, 36, 177, 32, 'negro'),
(84, 47, 1, 62, 178, 35, 'blanco'),
(85, 43, 8, 74, 179, 39, 'blanco'),
(88, 75, 3, 47.95, 181, 41, 'azul'),
(90, 51, 1, 36, 183, 33, 'negro'),
(91, 42, 2, 65, 183, 37, 'azul'),
(92, 45, 5, 84, 184, 40, 'amarillo'),
(93, 97, 1, 120.72, 184, 335, 'rosa'),
(96, 66, 2, 59, 187, 31, 'azul'),
(97, 45, 6, 84, 188, 40, 'amarillo'),
(98, 44, 3, 98, 286, 40, 'azul'),
(112, 103, 1, 119.95, 297, 40, 'blanco'),
(113, 99, 2, 59.95, 297, 35, 'blanco'),
(114, 51, 2, 36, 299, 33, 'negro'),
(115, 67, 6, 150, 299, 40, 'negro'),
(116, 74, 1, 59.99, 293, 41, 'verde'),
(117, 53, 2, 52, 293, 48, 'rojo'),
(118, 43, 1, 74, 293, 40, 'blanco'),
(120, 51, 1, 36, 301, 33, 'negro'),
(121, 99, 1, 59.95, 301, 35, 'dorado'),
(122, 106, 2, 66, 301, 47, 'blanco'),
(123, 95, 1, 42, 302, 40, 'azul'),
(124, 68, 2, 135, 304, 40, 'azul'),
(125, 53, 2, 52, 304, 40, 'azul'),
(126, 65, 1, 110, 305, 40, 'amarillo'),
(127, 97, 2, 120.72, 306, 38, 'azul'),
(128, 43, 2, 74, 307, 40, 'blanco'),
(131, 53, 1, 52, 307, 39, 'azul'),
(132, 53, 2, 52, 308, 40, 'rojo'),
(133, 65, 2, 110, 308, 40, 'amarillo'),
(134, 47, 2, 62, 309, 36, 'negro'),
(135, 70, 1, 64, 309, 36, 'azul'),
(136, 94, 1, 54.95, 309, 45, 'blanco'),
(137, 72, 1, 129, 310, 35, 'blanco'),
(138, 77, 1, 149.95, 310, 42, 'naranja'),
(139, 100, 2, 71.95, 310, 41, 'marrón'),
(140, 42, 2, 60, 311, 37, 'azul'),
(141, 44, 3, 98, 312, 39, 'azul'),
(142, 42, 1, 60, 313, 37, 'azul'),
(143, 47, 1, 62, 313, 36, 'blanco'),
(144, 53, 1, 52, 313, 41, 'azul'),
(145, 45, 1, 84, 314, 40, 'amarillo'),
(146, 67, 1, 150, 314, 40, 'negro'),
(147, 72, 2, 129, 314, 35, 'blanco'),
(148, 42, 2, 60, 315, 36, 'blanco'),
(151, 44, 1, 98, 317, 40, 'rojo'),
(152, 51, 2, 36, 317, 33, 'negro'),
(153, 73, 1, 49, 318, 40, 'amarillo'),
(154, 69, 1, 63, 318, 41, 'blanco'),
(155, 72, 1, 129, 318, 35, 'blanco'),
(156, 47, 1, 62, 318, 37, 'negro'),
(158, 70, 1, 64, 319, 37, 'azul');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `state` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `size` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`size`)),
  `brand` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `new` int(11) NOT NULL,
  `color` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`color`)),
  `deporte` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`deporte`)),
  `update_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  `image_name` varchar(255) DEFAULT NULL,
  `image_size` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`id`, `name`, `description`, `price`, `image`, `size`, `brand`, `category`, `new`, `color`, `deporte`, `update_at`, `image_name`, `image_size`, `path`) VALUES
(42, 'GEL-DEDICATE', 'zapatillas de running', 60, NULL, '[\"36\",\"37\",\"38\",\"39\",\"40\",\"42\",\"41\"]', 'asics', 'M', 1, '[\"blanco\",\"azul\"]', '[\"running\"]', NULL, '6622a25de3edd_e822bf7707644ea99aa75e6aed0017f0.webp', '84380', NULL),
(43, 'AIR MONARCH IV', 'Zapatillas de entrenamiento', 74, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'Nike', 'M', 1, '[\"blanco\"]', '[\"fitness\"]', NULL, '66239f4fa91c9_6063eb3821a14015960838faec17a22d.webp', '72596', NULL),
(44, '550 UNISEX', 'Zapatillas de entrenamiento', 98, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\"]', 'New Balance', 'H', 1, '[\"rojo\",\"azul\"]', '[\"baloncesto\"]', NULL, '6623a0eac13ef_3.webp', '104446', NULL),
(45, 'ULTRA MATCH FG/AG', ' Botas de fútbol con tacos', 84, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\"]', 'H', 'H', 0, '[\"amarillo\"]', '[\"futbol\"]', NULL, '6623a1884626e_a962e23d10f04e9b873c12943baf2b17.webp', '30600', NULL),
(47, 'OZMILLEN UNISEX', ' Zapatillas', 62, NULL, '[\"35\",\"36\",\"37\",\"38\",\"39\",\"40\"]', 'adidas', 'N', 0, '[\"blanco\",\"negro\"]', '[\"badminton\",\"fitness\",\"running\"]', NULL, '6623a5cbbcd48_6.webp', '85164', NULL),
(51, 'COURT BOROUGH RECRAFT UNISEX', 'Zapatillas', 36, NULL, '[\"32\",\"33\",\"34\",\"35\",\"36\",\"37\",\"38\",\"39\",\"40\"]', 'Nike', 'N', 0, '[\"negro\"]', '[\"futbol\",\"tenis\",\"baloncesto\"]', NULL, '6623b1dbc2e06_9.webp', '136492', NULL),
(53, 'GALAXY 6', 'Zapatillas de running', 52, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'adidas', 'M', 0, '[\"rojo\",\"azul\"]', '[\"running\"]', NULL, '6623b714a0458_d13d64855bdb4292a4a5356dd6e1e374.webp', '120190', NULL),
(55, 'COURT PERFORMANCE GS LOCKDOWN', ' Zapatillas de running estables', 52.55, NULL, '[\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"51\",\"52\"]', 'Under Armour', 'H', 0, '[\"rojo\"]', '[\"baloncesto\"]', NULL, '6623b9adccc92_14.webp', '35224', NULL),
(63, 'TRAE UNLIMITED 2 UNISEX', 'Zapatillas de baloncesto', 64, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'adidas', 'N', 0, '[\"negro\"]', '[\"baloncesto\"]', NULL, '663d075cb00a8_21.webp', '89342', NULL),
(65, 'KING PRO FG/AG', 'Botas de fútbol', 110, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'puma', 'M', 0, '[\"amarillo\",\"negro\"]', '[\"futbol\"]', NULL, '663d098657ddc_17.1.webp', '76206', NULL),
(66, 'JR LEGEND 10 ADADEMY FG/MG', 'Botas de fútbol de niños', 59, NULL, '[\"30\",\"31\",\"32\",\"33\",\"34\",\"35\"]', 'Nike', 'N', 1, '[\"azul\"]', '[\"futbol\"]', NULL, '663d0a69b0746_18.webp', '104858', NULL),
(67, 'CURRY', 'Zapatillas de baloncesto', 150, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'Under Armour', 'M', 0, '[\"negro\"]', '[\"baloncesto\"]', NULL, '663d0af01532d_19.webp', '204208', NULL),
(68, 'FLOW FUTR X ELITE', 'Zapatillas de baloncesto', 135, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'Under armour', 'M', 1, '[\"azul\"]', '[\"baloncesto\"]', NULL, '663d0baa35239_20.webp', '176994', NULL),
(69, 'FRONT COURT', 'Zapatillas de baloncesto', 63, NULL, '[\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\",\"51\",\"52\",\"53\",\"54\"]', 'adidas', 'H', 0, '[\"blanco\"]', '[\"baloncesto\"]', NULL, '663d0cede33e2_22.webp', '76884', NULL),
(70, 'GENETICS JR UNISEX', 'Zapatillas de baloncesto', 64, NULL, '[\"35\",\"36\",\"37\",\"38\",\"39\",\"40\"]', 'puma', 'N', 0, '[\"azul\"]', '[\"baloncesto\"]', NULL, '663d0dc869244_23.webp', '27948', NULL),
(72, 'JORDAN UNISEX', 'Zapatillas de baloncesto', 129, NULL, '[\"34\",\"35\",\"36\",\"37\",\"38\"]', 'jordan', 'N', 0, '[\"blanco\"]', '[\"baloncesto\"]', NULL, '663d0ebc77f75_24.webp', '70452', NULL),
(73, 'FLEX RUNNER 2 UNISEX', 'Zapatillas de running neutras', 49, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\"]', 'Nike', 'N', 0, '[\"amarillo\"]', '[\"running\"]', NULL, '663d0f5b578f8_25.1.webp', '69960', NULL),
(74, 'RETALIATE 2', 'Zapatillas de running', 59.99, NULL, '[\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"51\",\"52\"]', 'puma', 'H', 0, '[\"verde\"]', '[\"running\"]', NULL, '663d0fe131338_26.webp', '154450', NULL),
(75, 'NOVA COURT', 'Zapatillas de running ', 47.95, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'puma', 'H', 0, '[\"azul\"]', '[\"running\"]', NULL, '663d13c6706ce_27.webp', '128290', NULL),
(76, 'VOMERO 17', 'Zapatillas de running', 159.95, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\",\"51\",\"52\",\"53\",\"54\",\"55\"]', 'Nike', 'H', 0, '[\"rosa\"]', '[\"running\"]', NULL, '663d150dd6aa3_28.webp', '89536', NULL),
(77, 'NOOSA TRI 15', 'Zapatillas de competición', 149.95, NULL, '[\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\",\"51\",\"52\",\"53\",\"54\",\"55\"]', 'asics', 'N', 0, '[\"naranja\"]', '[\"running\"]', NULL, '663de0dd6be1e_29.webp', '143184', NULL),
(78, 'RETALIATE 2', 'Zapatillas de running estables', 38.95, NULL, '[\"24\",\"25\",\"26\",\"27\",\"28\",\"29\",\"30\",\"31\",\"32\",\"33\",\"34\",\"35\",\"36\",\"37\"]', 'puma', 'N', 0, '[\"azul\"]', '[\"running\"]', NULL, '663de60cb740a_30.webp', '139434', NULL),
(86, 'FLEX RUNNER 3 UNISEX', 'Zapatillas de competición', 37.95, NULL, '[\"34\",\"35\",\"36\",\"37\",\"38\"]', 'Nike', 'N', 0, '[\"azul\"]', '[\"fitness\",\"running\"]', NULL, '663df0cce073f_31.webp', '140918', NULL),
(93, 'NIKE REVOLUTION 7', 'Calzado para bebé e infantil', 37.97, NULL, '[\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\",\"25\",\"26\",\"27\",\"28\",\"29\"]', 'Nike', 'N', 0, '[\"blanco\"]', '[\"tenis\"]', NULL, '663e3cb429862_32.webp', '126896', NULL),
(94, 'FX III', 'Zapatillas deportivas', 54.95, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'champion', 'M', 0, '[\"blanco\"]', '[\"tenis\"]', NULL, '663e3d4172b53_34.webp', '83068', NULL),
(95, 'HYDRA FW23', 'Zapatillas de entrenamiento', 42, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'Munich', 'M', 0, '[\"azul\"]', '[\"tenis\",\"running\"]', NULL, '663e3dc8b2266_35.webp', '105664', NULL),
(96, 'TENSAUR SPORT 2.0', 'Zapatillas de entrenamiento', 34, NULL, '[\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\",\"25\",\"26\",\"27\",\"28\",\"29\"]', 'adidas', 'N', 1, '[\"blanco\"]', '[\"futbol\"]', NULL, '663e3e92db6ed_38.webp', '115042', NULL),
(97, 'GEL RESOLUTION', 'Zapatillas de tenis para todas las superficies', 120.72, NULL, '[\"335\",\"36\",\"37\",\"38\",\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\"]', 'asics', 'M', 1, '[\"rosa\",\"azul\"]', '[\"tenis\"]', NULL, '663e3f06b797b_39.1.webp', '181162', NULL),
(98, 'BARRICADE 13', 'Zapatillas de tenis para todas las superficies', 149.95, NULL, '[\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\",\"51\",\"52\",\"53\",\"54\",\"55\",\"56\"]', 'adidas', 'H', 0, '[\"blanco\"]', '[\"tenis\"]', NULL, '663e403e62e5b_40.webp', '94226', NULL),
(99, 'CARINA 2.0', 'Zapatillas deportivas urbanas', 59.95, NULL, '[\"35\",\"36\",\"37\",\"38\",\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\"]', 'puma', 'M', 0, '[\"dorado\",\"blanco\"]', '[\"fitness\"]', NULL, '663e411631a1c_41.webp', '60960', NULL),
(100, 'CA PRO CLASSIC UNISEX', 'Zapatillas de entrenamiento', 71.95, NULL, '[\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\",\"51\",\"52\",\"53\",\"54\"]', 'puma', 'H', 1, '[\"marr\\u00f3n\"]', '[\"fitness\"]', NULL, '663e42415dc9b_42.webp', '107574', NULL),
(101, 'KAPPA KICKOFF', 'Zapatillas de Deporte Interior Unisex', 24, NULL, '[\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\",\"25\",\"26\",\"27\",\"28\",\"29\"]', 'kappa', 'N', 0, '[\"blanco\"]', '[\"fitness\"]', NULL, '663e437f1f8fd_43.webp', '17244', NULL),
(102, 'REVOLT PRO 4.5 CLAY JUNIOR', 'Zapatillas de tenis para todas las superficies', 89.95, NULL, '[\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\",\"25\",\"26\",\"27\",\"28\",\"29\"]', 'head', 'N', 0, '[\"naranja\"]', '[\"tenis\"]', NULL, '663e479e448e2_44.webp', '103434', NULL),
(103, 'CLUB C 85 VINTAGE', 'Zapatillas de entrenamiento', 119.95, NULL, '[\"39\",\"40\",\"41\",\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"51\",\"52\"]', 'Reebok', 'M', 0, '[\"blanco\"]', '[\"fitn\"]', NULL, '663e4818673a8_45.webp', '85900', NULL),
(106, 'MASSANA', 'Zapatillas para hombre de la marca MUNICH', 66, NULL, '[\"42\",\"43\",\"44\",\"45\",\"46\",\"47\",\"48\",\"49\",\"50\",\"51\",\"52\",\"53\",\"54\"]', 'Munich', 'H', 0, '[\"blanco\"]', '[\"fitness\"]', NULL, '6640b11ecf8f9_36.webp', '107020', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `roles`, `password`, `email`) VALUES
(3, 'cristina', '[\"ROLE_ADMIN\",\"ROLE_USER\"]', '$2y$13$kTclMBa2MYAf9qcCeWCgueKMRcPI3vi3rva0K0FJAtntpsUwZjOvy', 'luquecristina299@gmail.com'),
(4, 'marcos', '[\"ROLE_USER\"]', '$2y$13$704VmjihC.GrzG9irG6ggeGi3HZrTfSXAYbkNaXJPdjQ/7WWHDy8a', 'marcos@sdf.com'),
(10, 'mirandaa', '[\"ROLE_USER\"]', '$2y$13$hyXgdVFjMsBWvWBK/Cw2O.LnmDG.QVj5FNGOfkWlhaz/xUzeciQXW', 'miranda@as.co'),
(12, 'margarita', '[\"ROLE_USER\"]', '$2y$13$IOgLlgJC4CM0ntfXZrzeb.50uXg/nV5/r10tYwFs1wu5joSPJnxm.', 'user@example.com'),
(13, 'mauricio', '[\"ROLE_USER\"]', '$2y$13$1UOAawazo7jJwTd1R7I8fe676D/NyQquENej6LFwMSzt5IaSMFljS', 'user@example.com'),
(15, 'macarena2', '[\"ROLE_USER\",\"ROLE_READER\"]', '$2y$13$O60HxCPDoocNBuP1ZyZPPuXwucgmdzpXrdLsxA3TsGOnjD7AV1lSe', 'macarena@gmail.com'),
(16, 'magnolia', '[]', '$2y$13$3Qb/j6SKLqbrML3qGF7bKe/FiQ.Yq18gREmykRmKY0h67CJ26pZ9O', 'magnolia@gmail.com'),
(17, 'frijolita', '[]', '$2y$13$C40/cA3s9e2SnDNRapawie2Vb.N4Bn6lm6CS/gQEOex/i3LIWN/TG', 'frijolita@frijo.com'),
(19, 'marquitos', '[]', '$2y$13$W1jNj.o0VMYpPfRpqwd5kuwYAIFW3GDbx/2lOaECF4bNAPtbArsCu', 'marquitos@gmail.com'),
(30, 'conchita', '[]', '$2y$13$8Y9li.We02BKFiwycoErjebh5bgQ3D7QZRTOGGFlgGO4UKllzcBMC', 'conchita@gmail.com'),
(53, 'paco', '[]', '$2y$13$xpv0hfUeQxUszk06RfClg.UeGFw.4WxBhyjhKQl445ehmK0p4vCz2', 'dfgd@sd.com'),
(54, 'juanitoo', '[\"ROLE_USER\"]', '$2y$13$FgyxhWxrswP72ZJFrOdQ3utzhJLkARffkSQGp0S1XGy6MzOiXWqTu', 'juanito2@gmail.com'),
(55, 'maximoduti', '[\"ROLE_USER\"]', '$2y$13$8bCkijWMC.lcsrL8wg/lve.B2IUI85m9RirR9R.LQOuLAKSVVKRIq', 'maximo@gmail.com'),
(63, 'lolazo', '[]', '$2y$13$98I/YHxJP6RgoDsa.vjBH.9Y9znz0A/4vf4xhURzihO4.FXGvtAVG', 'lalala@gmail.com'),
(64, 'galletitas', '[]', '$2y$13$jeS.i1nGwllXYmu3QseH.eqNbV5tbp4sncKAUR5Hh3EB2KoRb5WRC', 'galletitas@gmail.com'),
(65, 'palomita', '[]', '$2y$13$uIW3FCQgOjQ6UKWIrBj.zuCLQsR1RvX49bvJdwyfjmNPEWrN.poKO', 'palo@gmail.com'),
(67, 'julianitaa', '[\"ROLE_USER\"]', '$2y$13$UmB1z5RnHISh7X3m4NeYgungXYIobGl3mSh.y3wLisO/5Kx//aUXW', 'julianitaa@gmail.com'),
(77, 'maravillas', '[]', '$2y$13$mvzmhlD99atgOH3mdUbsrOMw6KatrHfSwVQ7wqXzhmmhNbv1LRixO', 'maravillas@gmail.com'),
(88, 'lucrecio', '[]', '$2y$13$DMoWvnYFiQZj0lfCsvs88OVRb0wWWaehaSZ99PJA30Edhtvggs3ce', 'lucrecio@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_68C58ED9A76ED395` (`user_id`),
  ADD KEY `IDX_68C58ED94584665A` (`product_id`);

--
-- Indices de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Indices de la tabla `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F5299398A76ED395` (`user_id`);

--
-- Indices de la tabla `order_entity`
--
ALTER TABLE `order_entity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_CDA754BDA76ED395` (`user_id`);

--
-- Indices de la tabla `order_line`
--
ALTER TABLE `order_line`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9CE58EE14584665A` (`product_id`),
  ADD KEY `IDX_9CE58EE14E1DDA8C` (`orderentity_id`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_C4EC16CEA76ED395` (`user_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_USERNAME` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `order_entity`
--
ALTER TABLE `order_entity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=322;

--
-- AUTO_INCREMENT de la tabla `order_line`
--
ALTER TABLE `order_line`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `FK_68C58ED94584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_68C58ED9A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_F5299398A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `order_entity`
--
ALTER TABLE `order_entity`
  ADD CONSTRAINT `FK_CDA754BDA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `order_line`
--
ALTER TABLE `order_line`
  ADD CONSTRAINT `FK_9CE58EE14584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_9CE58EE14E1DDA8C` FOREIGN KEY (`orderentity_id`) REFERENCES `order_entity` (`id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `FK_C4EC16CEA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
