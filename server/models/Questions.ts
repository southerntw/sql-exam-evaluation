import Sequelize from "sequelize";
import db from "../config/Database";

const { DataTypes } = Sequelize;

const Questions = db.define("questions", {
  questionId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
  },
  difficulty: {
    type: DataTypes.STRING,
  },
  correctAnswer: {
    type: DataTypes.TEXT,
  },
});

export default Questions;
