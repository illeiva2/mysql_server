const express = require("express")
const router = express.Router()
const sequelize = require('../conection/connection');
const QueryTypes = require('sequelize');
// const Catalogo = require('../models/catalogo.js');
// const Categoria = require('../models/categorias.js');
// const Genero = require('../models/generos.js');
// const ActorActriz = require('../models/actricesyactores.js');


router.get('/', async (req, res) => {
    try {
        const catalogo = await sequelize.query('SELECT * FROM JSON_VIEW', { type: QueryTypes.SELECT });

        if (!catalogo.length) {
            res.status(404).json({ message: 'El catalogo esta vacio' });
            return;
        }

        res.status(200).json(catalogo.map(e => { return { ...e, poster: `${process.env.FILE_URL}${e.poster}` }; }));
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ocurrio un error al traer el catalogo' });
    }
});

// aun no probado
// router.get('/:id', async (req, res) => {
//     const catalogoId = req.params.id;
  
//     try {
//       const catalogo = await Catalogo.findByPk(catalogoId, {
//         include: [
//           { model: Categoria },
//           { model: Genero, through: 'GenerosMidCatalogo' },
//           { model: ActorActriz, through: 'RepartoMidCatalogo' },
//         ],
//       });
  
//       if (!catalogo) {
//         return res.status(404).json({ message: 'El elemento del catálogo no se encontró.' });
//       }
  
//       res.status(200).json({ catalogo });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error interno del servidor' });
//     }
//   });
  

// Obtener un catalogo por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    if (isNaN(Number(id))) {
        res.status(400).json({ message: 'El id es invalido, intente nuevamente' });
        return;
    }

    try {
        const consultaSQL = 'SELECT * FROM JSON_VIEW WHERE id = :id';

        const catalogo = await sequelize.query(consultaSQL, {
            type: QueryTypes.SELECT,
            replacements: { id: id },
        });

        if (!catalogo.length) {
            res.status(404).json({ message: 'El id no corresponde a un item del catalogo' });
            return;
        }

        res.status(200).json(catalogo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocurrido un error al traer el catalogo' });
    }
});

router.get('/nombre/:nombre', async (req, res) => {
    const { nombre } = req.params;

    try {
        const consultaSQL = 'SELECT * FROM JSON_VIEW WHERE nombre = :nombre';

        const catalogo = await sequelize.query(consultaSQL, {
            type: QueryTypes.SELECT,
            replacements: { nombre: nombre },
        });

        if (!catalogo.length) {
            res.status(404).json({ message: 'El nombre no corresponde a un item del catálogo' });
            return;
        }

        res.status(200).json(catalogo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocurrido un error al traer el catálogo por nombre' });
    }
});

router.get('/genero/:genero', async (req, res) => {
    const { genero } = req.params;

    try {
        const consultaSQL = 'SELECT * FROM JSON_VIEW WHERE genero = :genero';

        const catalogo = await sequelize.query(consultaSQL, {
            type: QueryTypes.SELECT,
            replacements: { genero: genero },
        });

        if (!catalogo.length) {
            res.status(404).json({ message: 'No se encontraron elementos con ese género en el catálogo' });
            return;
        }

        res.status(200).json(catalogo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ha ocurrido un error al traer el catálogo por género' });
    }
});

module.exports = router;