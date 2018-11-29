-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 29-11-2018 a las 17:43:07
-- Versión del servidor: 10.1.31-MariaDB
-- Versión de PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id8008593_comanda`
--
CREATE DATABASE IF NOT EXISTS `id8008593_comanda` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id8008593_comanda`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `codigo` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `cliente` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'sin cliente',
  `estado` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'libre'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`codigo`, `cliente`, `estado`) VALUES
('E2NYU', 'sin cliente', 'libre'),
('TH67P', 'sin cliente', 'libre'),
('TQ45B', 'sin cliente', 'libre'),
('WWE12', 'sin cliente', 'libre'),
('YBX71', 'sin cliente', 'libre');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `codigo` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `nombre_cliente` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `apellido_cliente` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `mesa` varchar(5) COLLATE utf8_unicode_ci NOT NULL,
  `pedido` varchar(5000) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `terminado_cocinero` tinyint(1) NOT NULL DEFAULT '0',
  `terminado_bartender` tinyint(1) NOT NULL DEFAULT '0',
  `terminado_cervecero` tinyint(1) NOT NULL DEFAULT '0',
  `tiempo` int(11) NOT NULL,
  `correo` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `correo` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `nombre` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `clave` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `tipo` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `codigo_mesa` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mesa` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`correo`, `nombre`, `apellido`, `clave`, `tipo`, `codigo_mesa`, `mesa`) VALUES
('bartender@correo.com', 'Florencia', 'Petruzzi', '444', 'bartender', NULL, NULL),
('cervecero@correo.com', 'Facundo', 'Vega', '555', 'cervecero', NULL, NULL),
('cliente@correo.com', 'Micaela', 'Quinteros', '666', 'cliente', NULL, NULL),
('cliente2@correo.com', 'Maria', 'Morales', '777', 'cliente', NULL, NULL),
('cocinero@correo.com', 'Camila', 'Morales', '333', 'cocinero', NULL, NULL),
('mozo@correo.com', 'Pedro', 'Iglesias', '222', 'mozo', NULL, NULL),
('socio@correo.com', 'Miguel', 'Sanchez', '111', 'socio', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
