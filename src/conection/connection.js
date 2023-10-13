const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config({ path: '../../.env'});
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql'
});

module.exports = sequelize;