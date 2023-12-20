import { createPool } from "mysql2";
import { Kysely, MysqlDialect } from "kysely";

import { AnswersTable } from "../models/Answer";
import { GroupTable } from "../models/Group";
import { QuestionTable } from "../models/Question";
import { UserTable } from "../models/User";
import "dotenv/config";

interface Database {
  answer: AnswersTable;
  group: GroupTable;
  question: QuestionTable;
  user: UserTable;
}

const dialect = new MysqlDialect({
  pool: createPool({
    database: "exam",
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    connectionLimit: 10,
  }),
});

export const db = new Kysely<Database>({ dialect });
