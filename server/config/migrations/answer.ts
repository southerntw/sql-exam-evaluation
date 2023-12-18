import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("answer")
    .addColumn("answerId", "integer", (col) => col.primaryKey())
    .addColumn("answer", "varchar(500)")
    .addColumn("isCorrect", "boolean")
    .execute();
}
