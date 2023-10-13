const { DataTypes } = require('sequelize');
const sequelize = require('../conection/connection');

const reparto_mid_catalogo = sequelize.define('reparto_mid_catalogo', {
    idAct: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'actricesyactores',
            key: 'id' 
        }
    },
    idCatalogo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'catalogo', 
            key: 'id' 
        }
    }
}, {
    timestamps: false,
    tableName: 'reparto_mid_catalogo'
});

module.exports = reparto_mid_catalogo;