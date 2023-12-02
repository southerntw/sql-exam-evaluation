const Sequelize = require('sequelize');
const db = require('../config/Database.js')

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement = true,
        primaryKey = true
    }
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
    group: {
        type: DataTypes.INTEGER
    },
    score: {
        type: DataTypes.INTEGER
    }
    refresh_token:{
        type: DataTypes.TEXT
    }
},
{
    freezeTableName:true
});

const Groups = db.define('groups', {
    groupId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});

const Questions = db.define('questions', {
    questionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    groupId: {
        type: DataTypes.INTEGER
    },
    text: {
        type: DataTypes.TEXT
    },
    difficulty: {
        type: DataTypes.STRING
    },
    creatorId: {
        type: DataTypes.INTEGER
    },
    correctAnswer: {
        type: DataTypes.TEXT // TODO: Requires correction
    }
});

const Answers = db.define('answers', {
    answerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER
    },
    groupId: {
        type: DataTypes.INTEGER
    },
    questionId: {
        type: DataTypes.INTEGER
    },
    answer: {
        type: DataTypes.TEXT // TODO: Requires correction
    },
    isCorrect: {
        type: DataTypes.BOOLEAN
    }
});

(async () => {
    await db.sync();
})();

module.exports = Users