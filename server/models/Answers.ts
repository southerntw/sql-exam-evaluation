import Sequelize from "sequelize";
import db from "../config/Database";

const { DataTypes } = Sequelize;

const Answers = db.define("answers", {
  answerId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  answer: {
    type: DataTypes.TEXT,
  },
  isCorrect: {
    type: DataTypes.BOOLEAN,
  },
});

export default Answers;
