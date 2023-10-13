const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

(async () => {
    
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Root',
        database: 'trailerflix'
      });

    const jsonData = fs.readFileSync('./trailerflix_-_Clase_27.json', 'utf8');
    const data = JSON.parse(jsonData);

    try {

        await connection.beginTransaction();

        for (const item of data) { 

            let idCategoria;
            let sql = 'SELECT * FROM categorias WHERE LOWER(nombre) = ?';

            const [rows] = await connection.execute(sql, [item.categoria]);

            if (!rows.length) {
                const [res] = await connection.execute('INSERT INTO categorias (nombre) VALUES (?)', [item.categoria]);
                idCategoria = res.insertId;
                console.log('Categoria insertada', idCategoria);
            } else {
                idCategoria = rows[0].id;
                console.log('Categoria duplicada', idCategoria);
            }
            const id = item.id
            const poster = item.poster;
            const titulo = item.titulo;
            const resumen = item.resumen;
            const trailer = item.trailer === undefined ? null : item.trailer;
            const temporadas = item.temporadas;

            sql = 'INSERT INTO catalogo (id, poster, titulo, resumen, temporadas, idCategoria, trailer) VALUES (?, ?, ?, ?, ?, ?, ?)';

            const [res] = await connection.execute(sql, [id, poster, titulo, resumen, temporadas, idCategoria, trailer]);

            const idCatalogo = res.insertId;
            console.log('Contenido insertado', idCatalogo);

            const generos = item.genero.split(', ');
            for (const genero of generos) {
                sql = 'SELECT * FROM generos WHERE LOWER(nombre) = ?';
                const [rows] = await connection.execute(sql, [genero]);
                let idGenero;
                if (!rows.length) {
                    sql = 'INSERT INTO generos (nombre) VALUES (?)';
                    const [res] = await connection.execute(sql, [genero]);

                    idGenero = res.insertId;
                    console.log('Genero insertado', idGenero);
                } else {
                    idGenero = rows[0].id;
                    console.log('Genero insertado', idGenero);
                }
                sql = 'INSERT INTO generos_mid_catalogo (idCatalogo, idGenero) VALUES (?, ?)';
                await connection.execute(sql, [idCatalogo, idGenero]);
                console.log(`Genero ${idGenero} vinculado al catalogo ${idCatalogo}`);
            }

            const actores = item.reparto.split(', ');
            for (const actor of actores) {
                sql = 'SELECT * FROM actricesyactores WHERE LOWER(nombre) = ?';
                const [rows] = await connection.execute(sql, [actor.toLowerCase()]);
                let idAct;
                if (!rows.length) {
                    sql = 'INSERT INTO actricesyactores (nombre) VALUES (?)';
                    const [res] = await connection.execute(sql, [actor]);

                    idAct = res.insertId;
                    console.log('Actor insertado', idAct);
                } else {
                    idAct = rows[0].id;
                    console.log('Actor insertado', idAct);
                }
                sql = 'INSERT INTO reparto_mid_catalogo (idCatalogo, idAct) VALUES (?, ?)';
                await connection.execute(sql, [idCatalogo, idAct]);
                console.log(`Actor ${idAct} vinculado al contenido ${idCatalogo}`);
            }
        }

        await connection.commit();

        console.log('Transacción completada exitosamente.');
    } catch (error) {

        await connection.rollback();
        throw error;
    } finally {

        await connection.end();
    }
})();
