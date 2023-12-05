const Sequelize = require('sequelize');
const db = require('../config/Database.js')
const Answers = require('./Answers'); 
const Groups = require('./Groups');
const Users = require('./Users');
const Questions = require('./Questions');

Users.hasMany(Answers);
Answers.belongsTo(Users);

Questions.hasMany(Answers);
Answers.belongsTo(Questions);

Groups.hasMany(Questions);
Questions.belongsTo(Groups);

(async () => {
    await db.sync({ force: false });
})();

module.exports = { Answers, Groups, Users, Questions }