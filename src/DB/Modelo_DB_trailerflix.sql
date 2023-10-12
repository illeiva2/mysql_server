CREATE DATABASE trailerflix CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE trailerflix;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE generos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE actricesyactores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE catalogo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  poster VARCHAR(255) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  resumen TEXT,
  temporadas VARCHAR(5),
  idCategoria INT NOT NULL,
  trailer VARCHAR(255),
  FOREIGN KEY (idCategoria) REFERENCES categorias(id)
);

CREATE TABLE generos_mid_catalogo (
  idCatalogo INT NOT NULL,
  idGenero INT NOT NULL,
  FOREIGN KEY (idCatalogo) REFERENCES catalogo(id),
  FOREIGN KEY (idGenero) REFERENCES generos(id)
);

CREATE TABLE reparto_mid_catalogo (
  idCatalogo INT NOT NULL,
  idAct INT NOT NULL,
  FOREIGN KEY (idCatalogo) REFERENCES catalogo(id),
  FOREIGN KEY (idAct) REFERENCES actricesyactores(id)
);