import { Sequelize } from "sequelize";

const db: Sequelize = new Sequelize("auth_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: true,
});

export default db;
