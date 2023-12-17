import Sequelize from "sequelize";
import db from "../config/Database";

const { DataTypes } = Sequelize;

const Groups = db.define("groups", {
  groupId: {
    type: DataTypes.CHAR,
    primaryKey: true,
  },
});

export default Groups;
