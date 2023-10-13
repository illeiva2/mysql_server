const fs = require('fs');
const sequelize = require('../conection/connection');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const mysql = require('mysql2/promise');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',    // Cambia esto al host de tu base de datos
    user: 'tu_usuario',   // Cambia esto a tu nombre de usuario
    password: 'tu_contraseña',  // Cambia esto a tu contraseña
  });

  const databaseName = 'nombre_de_tu_db'; // Cambia esto al nombre de tu base de datos

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    console.log('Base de datos creada o ya existe.');

    // Lee el archivo SQL de estructura
    const createSchemaSQL = fs.readFileSync('ruta/al/archivo_estructura.sql', 'utf8');

    // Ejecuta las consultas SQL para crear la estructura
    await connection.query(createSchemaSQL);

    // Lee el archivo SQL de datos
    const populateDataSQL = fs.readFileSync('ruta/al/archivo_datos.sql', 'utf8');

    // Ejecuta las consultas SQL para poblar la base de datos
    await connection.query(populateDataSQL);

    console.log('Base de datos poblada exitosamente.');
  } catch (err) {
    console.error('Error al crear o poblar la base de datos:', err);
  } finally {
    // Cierra la conexión
    connection.end();
  }
}

// Llama a la función asincrónica
createDatabase();

// sequelize.query("SHOW TABLES LIKE 'catalogo'")
//     .then(([results]) => {
//         if (results.length > 0) {
//             // La tabla ya existe, no es necesario crearla
//             console.log('La tabla ya existe en la base de datos.');
//         } else {
//             // La tabla no existe, ejecutar el script de creación
//             sequelize.query(createDBScript)
//                 .then(() => {
//                     console.log('Base de datos creada con éxito');
//                     return sequelize.query(populateDBScript);
//                 })
//                 .then(() => {
//                     console.log('Base de datos poblada con éxito');
//                 })
//                 .catch((error) => {
//                     console.error('Error al crear la base de datos', error);
//                 });
//         }
//     })
//     .catch((error) => {
//         console.error('Error al verificar la existencia de la tabla', error);
//     });