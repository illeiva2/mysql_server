module.exports = (sequelize, DataTypes) => {
  const RepartoMidCatalogo = sequelize.define('RepartoMidCatalogo', {
    idCatalogo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idAct: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  });

  return RepartoMidCatalogo;
};