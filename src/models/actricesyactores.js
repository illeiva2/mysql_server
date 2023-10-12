module.exports = (sequelize, DataTypes) => {
  const ActorActriz = sequelize.define('ActorActriz', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  });

  return ActorActriz;
};