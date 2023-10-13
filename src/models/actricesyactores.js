const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');
const Actores = sequelize.define('actores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false,
  tableName: 'actricesyactores'
});

module.exports = Actores;