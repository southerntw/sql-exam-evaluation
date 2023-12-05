const Sequelize = require('sequelize');

const db = new Sequelize('auth_db', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    logging: true
});

module.exports = db;