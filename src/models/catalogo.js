module.exports = (sequelize, DataTypes) => {
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
    },
  });

  Catalogo.associate = (models) => {
    Catalogo.belongsTo(models.Categoria, { foreignKey: 'idCategoria' });
    Catalogo.belongsToMany(models.Genero, { through: 'GenerosMidCatalogo', foreignKey: 'idCatalogo' });
    Catalogo.belongsToMany(models.ActorActriz, { through: 'RepartoMidCatalogo', foreignKey: 'idCatalogo' });
  };

  return Catalogo;
};
