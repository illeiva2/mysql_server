const createDatabase = require("./DB/initDB");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env')});
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const sequelize = require("./conection/connection");
const catalogo = require("./routes/catalogo");
const categorias = require("./routes/categorias");

createDatabase()
    .then(() => {

        const server = express();

        // Middlewares
        server.use(express.json());

        // Rutas a Catalogo
        server.use("/catalogo", catalogo);

        // Rutas a Categorias
        server.use("/categorias", categorias);

        // Control de rutas inexistentes
        server.use('*', (req, res) => {
            res.status(404).send({ error: `La URL indicada no existe en este servidor` });
        });

        // Manejo de errores
        server.use((err, req, res, next) => {
            console.log(err);
            res.send(err);
        });

        // Método oyente de solicitudes
        sequelize.authenticate().then(() => {
            sequelize.sync({ force: false }).then(() => {
                server.listen(process.env.PORT, process.env.HOST, () => {
                    console.log(`El servidor está escuchando en: http://${process.env.HOST}:${process.env.PORT}`);
                });
            }).catch(() => {
                console.log("Hubo un problema con la sincronización con la base de datos.");
            });
        }).catch(() => {
            console.log(process.env.HOST);
        });
    })
    .catch((error) => {
        console.error("Error al inicializar la base de datos:", error);
    });