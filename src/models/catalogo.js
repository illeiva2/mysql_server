const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');
const Categoria = require('./categorias');
const Genero = require('./generos');
const Actor = require('./actricesyactores');
const generos_mid_catalogo = require('./generos_mid_catalogo');
const reparto_mid_catalogo = require('./reparto_mid_catalogo');

  const Catalogo = sequelize.define('Catalogo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    poster: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resumen: {
      type: DataTypes.TEXT,
    },
    temporadas: {
      type: DataTypes.STRING(5),
    },
    idCategoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trailer: {
      type: DataTypes.STRING(255),
    }
  }, {
      timestamps: false,
      tableName: 'catalogo'
  });

  Categoria.hasMany(Catalogo, { foreignKey: 'idCategoria' });
  Catalogo.belongsTo(Categoria, { foreignKey: 'idCategoria', as: 'categorias' });
  
  Genero.belongsToMany(Catalogo, { through: generos_mid_catalogo, foreignKey: 'idGenero' });
  Catalogo.belongsToMany(Genero, { through: generos_mid_catalogo, foreignKey: 'idCatalogo', as: 'generos' });
  
  Actor.belongsToMany(Catalogo, { through: reparto_mid_catalogo, foreignKey: 'idAct' });
  Catalogo.belongsToMany(Actor, { through: reparto_mid_catalogo, foreignKey: 'idCatalogo', as: 'reparto' });
  
module.exports = Catalogo;