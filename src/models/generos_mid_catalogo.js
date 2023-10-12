module.exports = (sequelize, DataTypes) => {
  const GenerosMidCatalogo = sequelize.define('GenerosMidCatalogo', {
    idCatalogo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idGenero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  });

  return GenerosMidCatalogo;
};
