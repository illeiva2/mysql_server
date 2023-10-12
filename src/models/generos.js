module.exports = (sequelize, DataTypes) => {
  const Genero = sequelize.define('Genero', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  });

  return Genero;
};