import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("question")
    .addColumn("questionId", "integer", (col) => col.primaryKey())
    .addColumn("text", "varchar(500)", (col) => col.notNull())
    .addColumn("difficulty", "varchar(500)", (col) => col.notNull())
    .addColumn("correctAnswer", "varchar(500)", (col) => col.notNull())
    .addColumn("jsonAnswer", "varchar(500)")
    .execute();
}
