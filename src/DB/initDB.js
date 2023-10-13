const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') });
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const mysql = require('mysql2/promise');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
  });

  const databaseName = DB_NAME;

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`);
    await connection.query(`USE ${databaseName}`);
    console.log('Base de datos creada o ya existe.');
    const checkViewQuery = "SELECT COUNT(*) AS count FROM information_schema.views WHERE table_name = 'JSON_VIEW'";

    const [viewResults] = await connection.query(checkViewQuery);
    const viewCount = viewResults[0].count;
    if (viewCount === 0) {
      // Lee el archivo SQL de estructura
      const createSchemaSQL = fs.readFileSync(path.join(__dirname, 'createDB.sql'), 'utf8');
      const queries = createSchemaSQL.split(';').map(query => query.trim());
      for (const query of queries) {
        if (query) {
          try {
            await connection.query(query);
            console.log('Consulta ejecutada con éxito:', query);
          } catch (error) {
            console.error('Error al ejecutar la consulta:', query, error);
          }
        }
      }
    }

    const checkDataQuery = "SELECT COUNT(*) AS count FROM catalogo";
    const [results] = await connection.query(checkDataQuery);
    const rowCount = results[0].count;

    if (rowCount > 0) {
      console.log("La base de datos ya está poblada. No es necesario realizar la población.");
      return
    } else {
      const populateDataSQL = fs.readFileSync(path.join(__dirname, 'populateDB.sql'), 'utf8');
      const querie = populateDataSQL.split(';').map(query => query.trim());
      for (const query of querie) {
        if (query) {
          try {
            await connection.query(query);
            console.log('Consulta ejecutada con éxito:', query);
          } catch (error) {
            console.error('Error al ejecutar la consulta:', query, error);
          }
        }
      }
    }


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