import Sequelize from "sequelize";
import db from "../config/Database";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "student",
    },
    score: {
      type: DataTypes.INTEGER,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezeTableName: true,
  },
);

export default Users;
