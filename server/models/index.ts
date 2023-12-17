import Sequelize from "sequelize";
import db from "../config/Database";

import Answers from "./Answers";
import Groups from "./Groups";
import Users from "./Users";
import Questions from "./Questions";

Users.hasMany(Answers);
Answers.belongsTo(Users);

Questions.hasMany(Answers);
Answers.belongsTo(Questions);

Groups.hasMany(Questions);
Questions.belongsTo(Groups);

(async () => {
  await db.sync({ force: false });
})();

export { Answers, Groups, Users, Questions };
