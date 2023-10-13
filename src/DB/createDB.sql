
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

CREATE VIEW JSON_VIEW AS
SELECT
    c.id AS id,
    c.poster,
    c.titulo,
    categorias.nombre AS categoria,
    (
        SELECT GROUP_CONCAT(DISTINCT g.nombre SEPARATOR ', ')
        FROM generos g
        JOIN generos_mid_catalogo gmc ON g.id = gmc.idGenero
        WHERE gmc.idCatalogo = c.id
    ) AS genero,
    c.resumen,
    c.temporadas,
    (
        SELECT GROUP_CONCAT(DISTINCT a.nombre SEPARATOR ', ')
        FROM actricesyactores a
        JOIN reparto_mid_catalogo rmc ON a.id = rmc.idAct
        WHERE rmc.idCatalogo = c.id
    ) AS reparto,
    c.trailer
FROM
    catalogo c
JOIN categorias on categorias.id = c.idCategoria
GROUP BY
    c.id, c.poster, c.titulo, categoria, c.resumen;