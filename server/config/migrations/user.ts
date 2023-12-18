import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("userId", "integer", (col) => col.primaryKey())
    .addColumn("name", "varchar(500)", (col) => col.notNull())
    .addColumn("email", "varchar(500)", (col) => col.notNull())
    .addColumn("password", "varchar(500)", (col) => col.notNull())
    .addColumn("role", "varchar(500)", (col) => col.defaultTo("user").notNull())
    .addColumn("score", "integer")
    .addColumn("refresh_token", "varchar(500)")
    .execute();
}
