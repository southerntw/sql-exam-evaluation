const Sequelize = require('sequelize');
const db = require('../config/Database.js')
const { DataTypes } = Sequelize;

const Questions = db.define('questions', {
    questionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: DataTypes.TEXT
    },
    difficulty: {
        type: DataTypes.STRING
    },
    correctAnswer: {
        type: DataTypes.TEXT // TODO: Requires correction
    }
});

module.exports = Questions;