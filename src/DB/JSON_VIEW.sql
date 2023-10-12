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