const Sequelize = require('sequelize');
const db = require('../config/Database.js')
const { DataTypes } = Sequelize;

const Users = db.define('users',{
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    score: {
        type: DataTypes.INTEGER
    },
    refresh_token:{
        type: DataTypes.TEXT
    }
},
{
    freezeTableName:true
});

module.exports = Users