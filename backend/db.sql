DROP TABLE IF EXISTS `marcas`;

DROP TABLE IF EXISTS `lineas`;

DROP TABLE IF EXISTS `vehiculos`;

CREATE TABLE `marcas` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `descripcion` varchar(300) NOT NULL,
    `estado` ENUM('S', 'N') NOT NULL,
    CONSTRAINT `pk_id_marcas` PRIMARY KEY (`id`)
);

CREATE TABLE `lineas` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `descripcion` varchar(300) NOT NULL,
    `estado` ENUM('S', 'N') NOT NULL,
    `id_marca` int UNSIGNED NOT NULL,
    CONSTRAINT `pk_id_lineas` PRIMARY KEY (`id`)
);

ALTER TABLE
    `lineas`
ADD
    CONSTRAINT `fk_id_marca` FOREIGN KEY (`id_marca`) REFERENCES `marcas`(`id`);

CREATE TABLE `vehiculos` (
    `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` varchar(100) NOT NULL,
    `descripcion` varchar(300) NOT NULL,
    `numero_placa` varchar(10) NOT NULL,
    `id_linea` int UNSIGNED NOT NULL,
    `fecha_vencimiento_seguro` date NOT NULL,
    `fecha_vencimiento_tecnicomecanica` date NOT NULL,
    `modelo` varchar(60) NOT NULL,
    CONSTRAINT `pk_id_vehiculos` PRIMARY KEY (`id`)
);

ALTER TABLE
    `vehiculos`
ADD
    CONSTRAINT `fk_id_linea` FOREIGN KEY (`id_linea`) REFERENCES `lineas`(`id`);