const Sequelize = require('sequelize');
const db = require('../config/Database.js')
const { DataTypes } = Sequelize;

const Groups = db.define('groups', {
    groupId: {
        type: DataTypes.CHAR,
        primaryKey: true
    }
});

module.exports = Groups;