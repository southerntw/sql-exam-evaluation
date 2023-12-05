const Sequelize = require('sequelize');
const db = require('../config/Database.js')
const { DataTypes } = Sequelize;

const Answers = db.define('answers', {
    answerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    answer: {
        type: DataTypes.TEXT // TODO: Requires correction
    },
    isCorrect: {
        type: DataTypes.BOOLEAN
    }
});

module.exports = Answers;