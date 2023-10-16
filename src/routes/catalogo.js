const express = require("express")
const router = express.Router()
const sequelize = require('../conection/connection');
const Catalogo = require('../models/catalogo.js');
const Categoria = require('../models/categorias.js');
const Genero = require('../models/generos.js');
const ActorActriz = require('../models/actricesyactores.js');
const { Op, QueryTypes } = require('sequelize');


// Ruta GET para obtener el catálogo de películas mediante la vista.

router.get('/', async (req, res) => {
    try {
        // Esta ruta utiliza una consulta SQL para obtener todos los registros de la vista JSON_VIEW en la base de datos. 
        const catalogo = await sequelize.query('SELECT * FROM JSON_VIEW', { type: QueryTypes.SELECT });

        if (!catalogo.length) {
            // Si el catálogo está vacío, se devuelve un mensaje de error 404. 
            res.status(404).json({ message: 'El catalogo esta vacio' });
            return;
        }
        // Si el catálogo contiene registros, se devuelve una respuesta exitosa 200 con los registros del catálogo. 
        res.status(200).json(catalogo);
    } catch (error) {
        // Cualquier error se registra en la consola para su posterior análisis.
        console.log(error);
        // Si ocurre algún error durante el proceso, se devuelve un mensaje de error 500. 
        res.status(500).json({ message: 'Ocurrio un error al traer el catalogo' });
    }
});

router.get('/titulo', async (req, res) => {
    const { title } = req.query;
    try {
      const catalogoItems = await Catalogo.findAll({
        where: {
          titulo: {
            [Op.like]: `%${title}%` 
          }
        },
        attributes: { exclude: ['idCategoria'] },
        include: [
          {
            model: Categoria,
            as: 'categorias'
          },
          {
            model: Genero,
            as: 'generos',
            through: { attributes: [] }
          },
          {
            model: ActorActriz,
            as: 'reparto',
            through: { attributes: [] }
          }
        ]
      });
  
      if (catalogoItems.length === 0) {
        return res.status(404).json({ message: 'No se encontraron elementos en el catálogo con el título proporcionado.' });
      }

      for (item of catalogoItems) {
      item.dataValues.categorias = item.categorias.nombre;

      const generoNombres = item.generos.map(genero => genero.nombre).join(', ');

      item.dataValues.generos = generoNombres;

      const repartoNombres = item.reparto.map(actor => actor.nombre).join(', ');

      item.dataValues.reparto = repartoNombres;
      }
    
      res.status(200).json({ catalogoItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
});

router.get('/genero', async (req, res) => {
    const { genre } = req.query;
  
    try {
      // Realiza la búsqueda en la base de datos
      const catalogo = await Catalogo.findAll({
          attributes: ['id'],
          include: [
              {
                  model: Genero,
                  as: 'generos',
                  where: {
                      nombre: {
                          [Op.like]: `%${genre}%`
                      }
                  },
                  attributes: [],
                  through: { attributes: [] }
              }
          ]
      });
  
      const catalogoGenero = await Catalogo.findAll(
          {
              attributes: { exclude: ['idCategoria'] },
              where: {
                  id: {
                      [Op.in]: catalogo.map(e => e.id)
                  }
              },
              include: [
                  {
                      model: Categoria,
                      as: 'categorias'
                  },
                  {
                      model: Genero,
                      as: 'generos',
                      through: { attributes: [] }
                  },
                  {
                      model: ActorActriz,
                      as: 'reparto',
                      through: { attributes: [] }
                  }
              ]
          }
      );
  
      if (catalogoGenero.length === 0) {
        return res.status(404).json({ message: 'No se encontraron elementos en el catálogo con ese género.' });
      }
  
      for (item of catalogoGenero) {
          item.dataValues.categorias = item.categorias.nombre;
    
          const generoNombres = item.generos.map(genero => genero.nombre).join(', ');
    
          item.dataValues.generos = generoNombres;
    
          const repartoNombres = item.reparto.map(actor => actor.nombre).join(', ');
    
          item.dataValues.reparto = repartoNombres;
          }
  
      res.status(200).json({ catalogoGenero });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const catalogo = await Catalogo.findByPk(Number(id), {
            attributes: { exclude: ['idCategoria'] },
            include: [
                {
                    model: Categoria,
                    as: 'categorias'
                },
                {
                    model: Genero,
                    as: 'generos',
                    through: { attributes: [] } 
                },
                {
                    model: ActorActriz,
                    as: 'reparto',
                    through: { attributes: [] } 

                }
            ]
        }
        );

        if (!catalogo) {
            return res.status(404).json({ message: 'El elemento del catálogo no se encontró.' });
        }

        catalogo.dataValues.categorias = catalogo.categorias.nombre;

        const generoNombres = catalogo.generos.map(genero => genero.nombre).join(', ');

        catalogo.dataValues.generos = generoNombres;

        const repartoNombres = catalogo.reparto.map(actor => actor.nombre).join(', ');

        catalogo.dataValues.reparto = repartoNombres;

        res.status(200).json({ catalogo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;